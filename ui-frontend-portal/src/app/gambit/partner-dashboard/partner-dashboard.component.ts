import { Component, OnInit } from '@angular/core';
import {ChartDataService, GambitChartDataProvider} from '../services/chart-data.service';

@Component({
  selector: 'partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.scss']
})
export class PartnerDashboardComponent implements OnInit {

  providers = {
    vouchersRedeemed: null,
    vouchersBought: null

  };

  today = {
    vouchersRedeemed: 0,
    vouchersBought: 0

  };



  constructor(
    private chartData: ChartDataService
  ) { }

  ngOnInit() {
    this.createProvider('vouchersRedeemed', 'redeemed');
    this.createProvider('vouchersBought', 'bought');

  }

  createProvider(entity: string, label: string) {
    this.providers[entity] = this.chartData.getDataProvider(entity, 10, label);
    this.providers[entity].getData().subscribe(response => {
      const dataBar = response.dataSets[0].data;
      this.today[entity] = dataBar.length ? dataBar[dataBar.length - 1] : 0;
    });
  }

}
