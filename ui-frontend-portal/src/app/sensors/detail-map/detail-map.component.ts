import { Component, OnInit, Input } from '@angular/core';
import { MonitoredNodeTree } from '../model/MonitoredNodeTree';
import { SettingsService } from '../../auth/settings.service';

interface Marker {
  id: string;
  lat: number;
  lng: number;
  title?: string;
  label?: string;
  icon?: string;
}

@Component({
  selector: 'detail-map',
  templateUrl: './detail-map.component.html',
  styleUrls: ['./detail-map.component.scss']
})
export class DetailMapComponent implements OnInit {

  allNodes: MonitoredNodeTree[];

  markers: Marker[] = [];

  // google maps zoom level
  @Input() zoom = 1;

  // initial center position for the map
  @Input() lat = 51.673858;
  @Input() lng = 7.815982;

  @Input() markAllNodes = false;

  metadata: any = null;

  imageUrl: string = null;

  @Input() image = false;

  constructor(private settings: SettingsService) {
    this.zoom = this.settings.map.initialZoom;
  }

  @Input() set nodes(nodes: MonitoredNodeTree[]) {
    this.allNodes = nodes;

    if (this.markAllNodes && this.allNodes) {
      console.log('mark all nodes', this.allNodes);
      this.setChildMarkers(this.allNodes);
    }

  }

  @Input() set focusNode(node: MonitoredNodeTree) {
    console.log('focus node:', node);
    this.setMainMarker(node);

    if (node && node.metadata && this.image) {
      this.metadata = null;
      try {
        this.metadata = JSON.parse(node.metadata);
      } catch (e) {
        console.error('failed to parse node metadata of node', node);
      }
      if (this.metadata && this.metadata.webcamUrl) {
        this.imageUrl = this.metadata.webcamUrl;
      }
    } else {
      this.imageUrl = null;
    }
  }

  ngOnInit() {
  }

  resetMarkers() {
    this.markers = [];
    if (this.markAllNodes && this.allNodes) {
      console.log('mark all nodes', this.allNodes);
      this.setChildMarkers(this.allNodes);
    }
  }

  getLocationsOfNodeOrParent(node: MonitoredNodeTree) {
    if (node && node.lat && node.lng) {
      return {lat: node.lat, lng: node.lng};
    }
    if (!this.allNodes) {
      return null;
    }
    let locationNode = node;
    let result = null;
    while (locationNode = this.getNodeById(locationNode.parentId, this.allNodes)) {
      if (locationNode.lat && locationNode.lng) {
        result = {lat: locationNode.lat, lng: locationNode.lng};
      }
    }
    return result;
  }

  getNodeById(id: number, nodes: MonitoredNodeTree[]) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const result = this.getNodeById(id, node.children);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  setMainMarker(node: MonitoredNodeTree) {
    this.resetMarkers();
    if (!node) {
      return;
    }
    console.log('find location');
    const location = this.getLocationsOfNodeOrParent(node);
    console.log('location', location);
    const childLocationNodes = this.getChildLocationNodes(node);
    if (childLocationNodes) {
      this.setChildMarkers(childLocationNodes.nodes.filter(n => n !== node));
      this.zoom = this.settings.map.nodeZoom;
      this.lat = childLocationNodes.lat;
      this.lng = childLocationNodes.lng;
    }
    if (!location) {
      return;
    }
    const mainMarker = {
      id: 'main',
      lat: 0,
      lng: 0,
      title: ''
    };
    this.markers.push(mainMarker);

    mainMarker.lat = location.lat;
    mainMarker.lng = location.lng;
    mainMarker.title = node.name;

    this.zoom = this.settings.map.nodeZoom;
    this.lat = location.lat;
    this.lng = location.lng;

  }

  setChildMarkers(nodes: MonitoredNodeTree[]) {

    nodes.forEach(node => {
      const marker = {
        id: node.id.toString(),
        lat: node.lat,
        lng: node.lng,
        title: node.name,
        icon: '/assets/img/pin_blue.png'
      };

      this.markers.push(marker);
    });

  }

  getChildLocationNodes(node: MonitoredNodeTree) {
    if (!node) {
      return null;
    }
    let lats = 0, lngs = 0, count = 0;
    const nodes = [];
    const checkNode = (n: MonitoredNodeTree) => {
      if (n.lat && n.lng) {
        lats += n.lat;
        lngs += n.lng;
        count++;
        nodes.push(n);
      }
      if (n.children) {
        n.children.forEach(checkNode);
      }
    };
    checkNode(node);
    if (count) {
      return {lat: lats / count, lng: lngs / count, nodes: nodes};
    } else {
      return null;
    }
  }

  clickedMarker(marker: Marker, index: number) {
    console.log(`clicked the marker: ${marker.title || index}`)
  }

  onCenterChanged(event) {
    // console.log('moved to ' + event.lat + ',' + event.lng);
  }


}
