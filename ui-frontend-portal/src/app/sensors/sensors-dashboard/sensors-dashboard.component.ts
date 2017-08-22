import {Component, OnInit} from '@angular/core';
import {MonitoredNodeTree} from '../model/MonitoredNodeTree';
import {DashboardContextService} from '../services/dashboard-context.service';
import {DateRange} from '../../shared/directives/daterangepicker.directive';
import {WeatherStation} from '../model/WeatherStation';

@Component({
  selector: 'sensors-dashboard',
  templateUrl: './sensors-dashboard.component.html',
  styleUrls: ['./sensors-dashboard.component.scss']
})
export class SensorsDashboardComponent implements OnInit {

  focusNode: MonitoredNodeTree;

  nodes: MonitoredNodeTree[];

  weatherStation: WeatherStation;

  constructor(public dashboardContext: DashboardContextService) {
  }

  ngOnInit() {
  }

  setFocusNode(data: MonitoredNodeTree) {
    this.focusNode = data;
    console.log('setFocusNode', data);
  }

  setNodes(nodes: MonitoredNodeTree[]) {
    this.nodes = nodes;
  }

  setDateRange(dates: DateRange) {
    console.log('setDateRange main', dates);
    this.dashboardContext.startDate = dates.start;
    this.dashboardContext.endDate = dates.end;
  }

  setWeatherStation(weatherStation: WeatherStation) {
    this.weatherStation = weatherStation;
  }

}
