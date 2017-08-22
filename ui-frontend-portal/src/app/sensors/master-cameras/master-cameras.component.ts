import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {MonitoredNode} from '../model/MonitoredNode';
import {FloodMonDataService} from '../services/flood-mon-data.service';
import {MonitoredNodeTree} from '../model/MonitoredNodeTree';

interface CameraNode {
  node: MonitoredNode;
  level: number;
  critical: boolean;
}

@Component({
  selector: 'master-cameras',
  templateUrl: './master-cameras.component.html',
  styleUrls: ['./master-cameras.component.scss']
})
export class MasterCamerasComponent implements OnInit {

  @Output() onFocusNodeChanged = new EventEmitter<MonitoredNodeTree>();
  @Output() onNodes = new EventEmitter<MonitoredNodeTree[]>();

  nodes: MonitoredNodeTree[] = [];

  cameras: CameraNode[] = [];

  focusCam: CameraNode = null;

  constructor(private floodMonDataService: FloodMonDataService) {
  }

  ngOnInit() {
    this.floodMonDataService.getCameras().subscribe(cameras => {
      let index = 0;

      cameras.forEach(cam => {
        const node = {
          id: ++index,
          type: 'CAMERA',
          name: cam.name,
          lat: cam.lat,
          lng: cam.lng,
          metadata: JSON.stringify({
            floodLevel: cam.currentLevel,
            floodLevelChange: cam.changeLevel,
            critical: cam.currentLevel >= 7,
            webcamUrl: cam.img,
            webcamAttribution: cam.attribution
          }),
          dataStream: null,
          children: [],
          parentId: 0
        };

        const sensorNode = {
          id: 1000 + index,
          type: 'SENSOR',
          name: 'Water level',
          lat: 0,
          lng: 0,
          metadata: null,
          dataStream: {
            id: 2000 + index,
            lat: 0,
            lng: 0,
            streamId: cam.dataStreamId ? cam.dataStreamId : 'test' + index,
            unit: 'm'
          },
          parentId: index
        };

        node.children.push(sensorNode);

        this.nodes.push(node);

        this.cameras.push({
          node: node,
          level: cam.currentLevel,
          critical: cam.currentLevel >= 7
        });
      });

      this.onNodes.next(this.nodes);
      console.log('cameras', this.cameras);

    });
  }

  getCameraNodes() {
    return this.cameras;
  }

  selectCamera(cam: CameraNode) {
    console.log('activate cam', cam);
    this.focusCam = cam;
    this.onFocusNodeChanged.next(cam.node);

  }

}
