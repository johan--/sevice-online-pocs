import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {MonitoredNodeTree} from '../model/MonitoredNodeTree';

@Component({
  selector: 'detail-image',
  templateUrl: './detail-image.component.html',
  styleUrls: ['./detail-image.component.scss']
})
export class DetailImageComponent implements OnInit {

  metadata: any = null;

  imageUrl: string = null;

  loading = false;

  constructor() { }

  ngOnInit() {
  }

  @Input() set focusNode(node: MonitoredNodeTree) {
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
        this.loading = true;
        this.imageUrl = this.metadata.webcamUrl;
      }
    } else {
      this.imageUrl = null;
    }

  }

  imageLoaded() {
    this.loading = false;
  }

}
