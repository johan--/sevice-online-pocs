import {Component, OnInit, Input} from '@angular/core';
import {ChartDataProvider} from '../base-chart/base-chart.component';

interface ChartData {
  dataAvailable: boolean,
  labels: any[],
  data: any,
  options: any,
  colors: any[],
  legend: boolean,
  type: string,
  loading: boolean,
  error: string
}

@Component({
  selector: 'historic-count',
  templateUrl: './historic-count.component.html',
  styleUrls: ['./historic-count.component.scss']
})
export class HistoricCountComponent implements OnInit {

  @Input() label: string;

  @Input() description: string;

  @Input() unit: string;

  @Input() count: number;


  @Input() generateRandom: number;

  /*https://github.com/angular/angular-cli/issues/2034*/

  @Input() provider = <ChartDataProvider>null;

  @Input() type = 'bar';

  constructor() {
  }

  ngOnInit() {

  }

}
