import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '../model/Group';
import {LocalStorageService} from 'angular-2-local-storage';
import {PersistenceApiService} from '../services/persistence-api.service';

@Component({
  selector: 'group-selection',
  templateUrl: './group-selection.component.html',
  styleUrls: ['./group-selection.component.scss']
})
export class GroupSelectionComponent implements OnInit {

  storageGroupKey = 'currentSelectedGroup';

  currentGroup: Group = null;

  groups: Group[] = [];

  @Output() groupChanged = new EventEmitter<Group>();

  loadingGroups = false;
  loadingGroupsFailed: string = null;

  constructor(
    private api: PersistenceApiService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {

    this.loadingGroups = true;
    const savedTreeGroupId = this.localStorage.get(this.storageGroupKey);
    const userId = 'current';
    this.api.getGroupsByUserId(userId).subscribe(groups => {
      if (savedTreeGroupId && groups && groups.length) {
        this.currentGroup = groups.find(group => group.id === savedTreeGroupId) || this.currentGroup;
      }
      if (!this.currentGroup && groups && groups.length) {
        this.currentGroup = groups[0];
      }
      console.log('groups', groups);
      this.groups = groups;
      this.loadingGroups = false;

      if (!this.groups) {
        this.loadingGroupsFailed = 'No groups found';
      }

      this.groupChanged.next(this.currentGroup);

    }, (error) => {
      this.loadingGroups = false;
      this.loadingGroupsFailed = error.toString();

    });

  }

  selectGroup(group: Group) {
    if (this.currentGroup !== group) {
      this.currentGroup = group;
      this.localStorage.set(this.storageGroupKey, group.id);
      this.groupChanged.next(group);
    }

  }
}
