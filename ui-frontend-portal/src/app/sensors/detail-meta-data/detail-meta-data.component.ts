import {Component, OnInit, Input} from '@angular/core';
import {MonitoredNodeTree} from '../model/MonitoredNodeTree';

@Component({
  selector: 'detail-meta-data',
  templateUrl: './detail-meta-data.component.html',
  styleUrls: ['./detail-meta-data.component.scss']
})
export class DetailMetaDataComponent implements OnInit {

  node: MonitoredNodeTree;

  imageUrl: string;

  metadata: any;

  displayMetadata = false;

  constructor() { }

  ngOnInit() {
  }

  @Input() set focusNode(node: MonitoredNodeTree) {
    this.node = node;

    this.imageUrl = null;
    if (node && node.metadata) {
      this.metadata = null;
      try {
        this.metadata = JSON.parse(node.metadata);
        console.log('parsed metadata', this.metadata);
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
}
