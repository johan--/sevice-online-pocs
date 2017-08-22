import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MonitoredNodeTree } from '../model/MonitoredNodeTree';
import { TreeComponent } from 'angular-tree-component';
import { Group } from '../model/Group';
import { Tag } from '../model/Tag';
import { UserAuthService } from '../../auth/user-auth.service';
import { PersistenceApiService } from '../services/persistence-api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { NodeInfoService } from '../services/node-info.service';
import { ITreeModel, ITreeNode } from 'angular-tree-component/dist/defs/api';

@Component({
  selector: 'master-nodes-tree',
  templateUrl: './master-nodes-tree.component.html',
  styleUrls: ['./master-nodes-tree.component.scss']
})
export class MasterNodesTreeComponent implements OnInit, OnDestroy {

  @Output() onFocusNodeChanged = new EventEmitter<MonitoredNodeTree>();
  @Output() onNodes = new EventEmitter<MonitoredNodeTree[]>();
  @ViewChild(TreeComponent) tree: TreeComponent;

  currentGroup: Group = null;
  currentTag: Tag = null;
  private nodes: MonitoredNodeTree[] = [];

  treeOptions = {};

  loadingNodes = false;
  loadingNodesFailed: string = null;

  constructor(private authService: UserAuthService,
              private api: PersistenceApiService,
              private router: Router,
              private localStorage: LocalStorageService,
              private nodeInfo: NodeInfoService) {

  }

  ngOnInit() {

  }


  ngOnDestroy(): void {
    if (this.tree) {
      this.saveTreeState(this.tree.treeModel);
    }
  }

  saveTreeState(treeModel: ITreeModel) {
    if (!this.currentGroup || !this.tree) {
      return;
    }
    const state = {expanded: {}, active: null};
    this.forEveryNode(treeModel.roots, node => {
      if (node.isExpanded) {
        state.expanded[node.id] = true;
      }
      if (node.isActive) {
        state.active = node.id;
      }
    });

    this.localStorage.set('treeState_' + this.currentGroup.id, state);

    console.log('tree state', state);

  }

  restoreTreeState() {
    if (!this.currentGroup || !this.tree) {
      return;
    }
    const state = this.localStorage.get('treeState_' + this.currentGroup.id) as any;
    if (!state || !state.expanded) {
      return;
    }
    console.log('restore state', state);

    this.forEveryNode(this.tree.treeModel.roots, node => {
      if (state.expanded[node.id]) {
        node.expand();
      }
      if (state.active === node.id) {
        // node.toggleActivated(false);
      }
    });

  }

  forEveryNode(nodes: ITreeNode[], fn: (node: ITreeNode) => void) {
    nodes.forEach(node => {
      fn(node);
      if (node.children) {
        this.forEveryNode(node.children, fn);
      }
    });
  }

  selectGroup(group: Group) {
    this.currentGroup = group;
    this.loadNodes();
  }

  activateNode(node: ITreeNode) {
    console.log('activate node', node);
    this.onFocusNodeChanged.next(node.data);

  }

  loadNodes() {
    this.nodes = [];
    if (!this.currentGroup) {
      return;
    }
    this.loadingNodes = true;
    this.api.getGroupNodes(this.currentGroup.id).subscribe(nodes => {
      console.log('nodes', nodes);
      this.nodes = nodes as MonitoredNodeTree[];
      this.onNodes.next(this.nodes);
      this.loadingNodes = false;
    }, (error) => {
      this.loadingNodes = false;
      this.loadingNodesFailed = error.toString();
    });
  }

  openNodeInfo(node: MonitoredNodeTree) {
    this.router.navigate(['sensors', 'details', node.id]);

  }

  getIconForNode(node) {
    return this.nodeInfo.getIconForNode(node);
  }

  findNodesByTag(nodes: MonitoredNodeTree[], tagId: string): MonitoredNodeTree[] {
    const result = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.tags && node.tags.find(tag => tag.id === tagId)) {
        result.push(node);
      }
      if (node.children) {
        result.push(...this.findNodesByTag(node.children, tagId));
      }
    }
    return result;
  }

  getNodes(): MonitoredNodeTree[] {
    if (this.currentTag) {
      return this.findNodesByTag(this.nodes, this.currentTag.id);
    }
    return this.nodes;
  }

}
