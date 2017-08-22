import { Component, OnInit } from '@angular/core';
import { DateRange } from '../../shared/directives/daterangepicker.directive';
import { MonitoredNodeTree } from '../model/MonitoredNodeTree';
import { Params, ActivatedRoute } from '@angular/router';
import { PersistenceApiService } from '../services/persistence-api.service';
import { DashboardContextService } from '../services/dashboard-context.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss']
})
export class NodeDetailsComponent implements OnInit {

  node: MonitoredNodeTree;
  metadata: any = null;

  imageUrl: string = null;

  constructor(private route: ActivatedRoute,
              private api: PersistenceApiService,
              public dashboardContext: DashboardContextService) {
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.api.getNodeById(+params['nodeId'])).subscribe(node => this.initNode(node));
  }

  initNode(node: MonitoredNodeTree) {
    this.node = node;
    if (node.metadata) {
      try {
        this.metadata = JSON.parse(node.metadata);
      } catch (e) {
        console.error('failed to parse node metadata of node', node);
      }
    }

    if (this.metadata && this.metadata.webcamUrl) {
      this.imageUrl = this.metadata.webcamUrl;
    }

  }

  setDateRange(dates: DateRange) {
    console.log('setDateRange details', dates);
    this.dashboardContext.startDate = dates.start;
    this.dashboardContext.endDate = dates.end;
  }

}
