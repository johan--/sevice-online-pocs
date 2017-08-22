import { Injectable } from '@angular/core';
import { MonitoredNodeTree } from '../model/MonitoredNodeTree';

@Injectable()
export class NodeInfoService {

  constructor() { }

  getIconForNode(node: MonitoredNodeTree) {
    if (node && node.dataStream) {
      return 'fa-bar-chart'
    }
    if (!node || !node.tags) {
      return '';
    }
    const tagIconMapping = {
      room_icon: 'fa-building'
    };
    const tag = node.tags.find(t => tagIconMapping[t.icon]);
    return tag ? tagIconMapping[tag.icon] : '';
  }
}
