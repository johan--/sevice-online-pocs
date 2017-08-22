import { Component, OnInit } from '@angular/core';
import {ChartDataService} from '../services/chart-data.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  providers = {
    vouchersRedeemed: null,
    devicesRegistered: null,
    vouchersBought: null,
    devicesOnline: null
  };

  today = {
    vouchersRedeemed: 0,
    devicesRegistered: 0,
    vouchersBought: 0,
    devicesOnline: 0
  };



  constructor(
    private chartData: ChartDataService
  ) { }

  ngOnInit() {
    this.createProvider('vouchersRedeemed', 'redeemed');
    this.createProvider('devicesRegistered', 'devices');
    this.createProvider('vouchersBought', 'bought');
    this.createProvider('devicesOnline', 'users');
  }

  createProvider(entity: string, label: string) {
    this.providers[entity] = this.chartData.getDataProvider(entity, 10, label);
    this.providers[entity].getData().subscribe(response => {
      const dataBar = response.dataSets[0].data;
      this.today[entity] = dataBar.length ? dataBar[dataBar.length - 1] : 0;
    });
  }


}
