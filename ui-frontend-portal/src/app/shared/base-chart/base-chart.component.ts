import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

export interface ChartDataInfo {
  dataSets: Array<any>;
  labels: String[];
}

export interface ChartDataProvider {
  getData(): Observable<ChartDataInfo>;
  getType(): string;
  getOptions(): any;
}

export abstract class BaseChartDataProvider implements ChartDataProvider {

  defaultLineChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        type: 'time',
        time: {
          displayFormats: {
            month: 'MMM YYYY',
            week: '||',
            day: 'MMM D',
            hour: 'MMM D, HH:mm',
            minute: 'HH:mm',
            second: 'HH:mm:ss',
            millisecond: 'mm:ss [ms]'
          },
          tooltipFormat: 'HH:mm:ss',
        }
      }],
      yAxes: [{display: false}]
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
      intersect: false,
      custom: customToolTip
    }
  };

  defaultBarChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,

        barPercentage: 0.6
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
      intersect: false,
      custom: customToolTip
    }
  };

  constructor(private type: string) {
  }

  abstract getData(): Observable<ChartDataInfo>;

  getType(): string {
    return this.type;
  }

  getOptions(): any {
    if (this.type === 'bar') {
      return this.defaultBarChartOptions;
    }
    if (this.type === 'line') {
      return this.defaultLineChartOptions;
    }
  }

}

class RandomChartDataProvider extends BaseChartDataProvider {
  constructor(type: string,
              private count: number = 10,
              private label: string) {
    super(type);
  }

  getData(): Observable<ChartDataInfo> {
    const now = Math.floor(new Date().getTime() / 60000) * 60000;
    const count = this.count;
    const type = this.getType();

    const series = {
      label: this.label,
      data: []
    };
    const dataSets = [series];
    const labels = [];

    for (let i = 0; i < count; i++) {
      if (type === 'bar') {
        labels.push(moment(now + i * 60000).format('HH:mm'));
        series.data.push(Math.floor(Math.random() * 10));

      } else {
        series.data.push({
          x: now + i * 60000,
          y: Math.floor(Math.random() * 10)
        });
      }

    }
    return Observable.of({
      dataSets: dataSets,
      labels: labels
    });
  }
}

interface ChartData {
  dataAvailable: boolean,
  labels: any[],
  dataSets: any,
  options: any,
  colors: any[],
  legend: boolean,
  type: string,
  loading: boolean,
  error: string
}

declare const document;

export function customToolTip(tooltip) {
  // Source: https://github.com/chartjs/Chart.js/blob/v2.5.0/samples/tooltips/line-customTooltips.html
  // body[0].lines[0]
  // title[0]
  // labelColors[0].backgroundColor .borderColor


  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';
    document.body.appendChild(tooltipEl);
  }
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }
  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }
  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(getBody);
    let innerHtml = '<thead>';
    titleLines.forEach(function (title) {
      innerHtml += '<tr><th>' + title + '</th></tr>';
    });
    innerHtml += '</thead><tbody>';
    bodyLines.forEach(function (body, i) {
      const colors = tooltip.labelColors[i];
      let style = 'background:' + colors.backgroundColor;
      style += '; border-color:' + colors.borderColor;
      style += '; border-width: 2px';
      const span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
      innerHtml += '<tr><td>' + span + body + '</td></tr>';
    });
    innerHtml += '</tbody>';
    const tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }
  const position = this._chart.canvas.getBoundingClientRect();

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = position.left + tooltip.caretX + 'px';
  tooltipEl.style.top = position.top + tooltip.caretY + 'px';
  tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
}

@Component({
  selector: 'base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss']
})
export class BaseChartComponent implements OnInit {

  @Input() label: string;

  @Input() type = 'bar';

  @Input() generateRandom = 10;

  @Input() provider: ChartDataProvider;

  chartData: ChartData = {
    dataAvailable: false,
    labels: [],
    dataSets: [],
    options: null,
    colors: [{
      backgroundColor: 'rgba(255,255,255,.55)',
      borderColor: 'rgba(255,255,255,.45)'
    }],
    legend: false,
    type: 'line',
    loading: true,
    error: null
  };


  constructor() {
  }

  ngOnInit() {

    if (!this.provider) {
      this.provider = new RandomChartDataProvider(this.type, this.generateRandom, this.label);
    }

    this.chartData.type = this.provider.getType();
    this.chartData.options = this.provider.getOptions();
    this.provider.getData().subscribe(data => {
      this.chartData.dataSets = data.dataSets;
      this.chartData.labels = data.labels;
      this.chartData.dataAvailable = true;
      console.log('chart data', data);
    })
  }

  chartClicked(e: any): void {
    console.log('chart click', e);
  }

  chartHovered(e: any): void {
  }


}
