import { Component, OnInit } from '@angular/core';
import {MonitoredNodeTree} from '../model/MonitoredNodeTree';
import {DashboardContextService} from '../services/dashboard-context.service';
import {DateRange} from '../../shared/directives/daterangepicker.directive';
import {FloodMonDataService} from '../services/flood-mon-data.service';

@Component({
  selector: 'flood-mon-details',
  templateUrl: './flood-mon-details.component.html',
  styleUrls: ['./flood-mon-details.component.scss']
})
export class FloodMonDetailsComponent implements OnInit {

  focusNode: MonitoredNodeTree;

  nodes: MonitoredNodeTree[];

  floodMonDataProvider;

  constructor(
    public dashboardContext: DashboardContextService,
    private floodMonDataService: FloodMonDataService
  ) {
    this.floodMonDataProvider = floodMonDataService.getDataService();
  }

  ngOnInit() {

  }

  setDateRange(dates: DateRange) {
    console.log('setDateRange main', dates);
    this.dashboardContext.startDate = dates.start;
    this.dashboardContext.endDate = dates.end;
  }

  setFocusNode(data: MonitoredNodeTree) {
    this.focusNode = data;
    console.log('setFocusNode', data);
  }

  setNodes(nodes: MonitoredNodeTree[]) {
    this.nodes = nodes;
  }
}
