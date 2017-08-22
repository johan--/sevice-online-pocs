import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStream } from '../model/DataStream';
import { MonitoredNodeTree } from '../model/MonitoredNodeTree';
import { Observable } from 'rxjs/Observable';
import { UnitPipe } from '../../shared/pipes/unit.pipe';
import { Router } from '@angular/router';
import { PersistenceApiService } from '../services/persistence-api.service';
import { DateRange } from '../../shared/directives/daterangepicker.directive';
import * as moment from 'moment';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/empty';
import { customToolTip } from '../../shared/base-chart/base-chart.component';
import { WeatherStation } from '../model/WeatherStation';
import { WeatherReading } from '../model/WeatherReading';

interface StreamChartData {
  stream: DataStream,
  node: MonitoredNodeTree,
  dataAvailable: boolean,
  data: any,
  labels: Array<string>,
  options: any,
  colors: Array<any>,
  legend: boolean,
  type: string,
  loading: boolean,
  error: string
  lastValue: number
}


@Component({
  selector: 'detail-graphs',
  templateUrl: './detail-graphs.component.html',
  styleUrls: ['./detail-graphs.component.scss']
})
export class DetailGraphsComponent implements OnInit, OnDestroy {
  @Output() onDatesChanged = new EventEmitter<DateRange>();

  dates: DateRange = {
    start: new Date(),
    end: new Date()
  };

  autoRefreshEnabled = false;

  autoRefreshInterval = null;

  node: MonitoredNodeTree;

  @Input() streamProvider: any = 'api';

  private _weatherStation: WeatherStation;

  streams: StreamChartData[] = [];
  streamData = {};

  timeAxis = {
    type: 'time',
    time: {
      min: null,
      max: null,
      displayFormats: {
        month: 'MMM YYYY',
        week: '||',
        day: 'MMM D',
        hour: 'MMM D, HH:mm',
        minute: 'HH:mm',
        second: 'HH:mm:ss',
        millisecond: 'mm:ss [ms]'
      },
      tooltipFormat: 'MMM D HH:mm:ss',
    },
    barThickness: 5
  };

  defaultLineChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [this.timeAxis],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    tooltips: {
      enabled: false,
      custom: customToolTip,
      intersect: false
    },
    spanGaps: false
  };

  defaultBarChartOptions: any = {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [this.timeAxis],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    tooltips: {
      enabled: false,
      custom: customToolTip,
      intersect: false
    }
  };


  pickerOptions: any = {
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 5,
    autoApply: true,
    startDate: this.dates.start,
    endDate: this.dates.end,
    locale: {
      format: 'll HH:mm'
    },
    ranges: {
      'Last 24h': [moment().subtract(24, 'hours'), moment()],
      'Last 48h': [moment().subtract(48, 'hours'), moment()],
      'Last 7 days': [moment().subtract(7, 'days'), moment()],
      'Last 30 days': [moment().subtract(30, 'days'), moment()]
    }
  };

  dataObservable = null;

  constructor(private api: PersistenceApiService,
              private router: Router,
              private unitPipe: UnitPipe) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.autoRefreshEnabled) {
      this.toggleAutoRefresh();
    }
  }

  @Input() set startDate(date: Date) {
    this.dates.start = date;
    this.timeAxis.time.min = date;
    this.pickerOptions.startDate = date;
    this.dataChanged();
  }

  @Input() set endDate(date: Date) {
    this.dates.end = date;
    this.timeAxis.time.max = date;
    this.pickerOptions.endDate = date;
    this.dataChanged();
  }

  @Input() set focusNode(node: MonitoredNodeTree) {
    this.node = node;
    this.dataChanged();
  }

  @Input() set weatherStation(weatherStation: WeatherStation) {
    this._weatherStation = weatherStation;
    this.dataChanged();
  }

  doRefresh() {
    this.dataChanged();
  }

  toggleAutoRefresh() {
    if (this.autoRefreshEnabled) {
      this.autoRefreshEnabled = false;
      clearInterval(this.autoRefreshInterval);
    } else {
      this.autoRefreshEnabled = true;
      this.autoRefreshInterval = setInterval(this.doRefresh.bind(this), 10000);
      this.doRefresh();
    }
  }

  dateRangeSelected(range: DateRange) {
    this.startDate = range.start;
    this.endDate = range.end;
    this.onDatesChanged.next(this.dates);
    this.dataChanged();
  }

  dataChanged() {
    this.resetStreams();
    const observables = [];
    if (this.node) {
      observables.push(this.loadStreamsOfNode(this.node));
    }
    if (this._weatherStation) {
      observables.push(this.loadWeatherData());
    }
    if (this.dataObservable) {
      this.dataObservable.unsubscribe();
    }
    if (observables.length === 0) {
      return;
    }
    this.dataObservable = Observable.forkJoin(...observables)
      .catch(e => {
        console.error('loading data failed', e);
        return e;
      })
      .subscribe(results => {
        console.log('all data loaded');
      });
  }

  setStreamDataLoadingError(streamId: string, err: any) {
    const s = this.streams.find(stream => stream.stream.streamId === streamId);
    s.loading = false;
    s.error = err.toString();
  }

  populateWeatherStreamFromReadings(key: string, entries: WeatherReading[]) {
    const stream = this.streams.find(s => s.stream.streamId === this._weatherStation.name + key);
    if (stream.type === 'line') {
      stream.data = [{
        data: entries.map(e => {
          const entry = {x: new Date(e.timestamp), y: this.unitPipe.transform(e[key], stream.stream.unit)};
          if (e[key] !== undefined) {
            stream.lastValue = entry.y;
          }
          return entry;
        }),
        label: stream.stream.unit,
        pointRadius: 0
      }];

      console.log('stream', stream.data, stream.lastValue);
      stream.options = this.defaultLineChartOptions;
    }
    stream.loading = false;
    stream.dataAvailable = true;
  }

  populateWeatherData(entries: WeatherReading[]) {
    this.populateWeatherStreamFromReadings('temperature', entries);
    this.populateWeatherStreamFromReadings('amountPrecipitation', entries);
    this.populateWeatherStreamFromReadings('reducedAirPressure', entries);
    this.populateWeatherStreamFromReadings('windForce', entries);
  }

  loadWeatherDataFromApi(): Observable<any> {
    return this.api.getWeatherReadings(this._weatherStation.id, this.dates.start, this.dates.end).map(entries => {
      this.populateWeatherData(entries);
      return null;
    }).catch((err) => {
      this.setStreamDataLoadingError(this._weatherStation.name + 'temperature', err);
      this.setStreamDataLoadingError(this._weatherStation.name + 'amountPrecipitation', err);
      this.setStreamDataLoadingError(this._weatherStation.name + 'reducedAirPressure', err);
      this.setStreamDataLoadingError(this._weatherStation.name + 'windForce', err);
      return err;
    });
  }

  addWeatherStationStream(name: string, key: string, unit: string, type: string = 'line'): StreamChartData {
    const stream: StreamChartData = {
      stream: {streamId: this._weatherStation.name + key, unit: this.unitPipe.transformUnit(unit)},
      node: {name: name},
      dataAvailable: false,
      data: [],
      labels: [],
      options: this.defaultLineChartOptions,
      colors: [],
      legend: false,
      type: type,
      loading: true,
      error: null,
      lastValue: null
    };
    return stream;
  }

  loadWeatherData(): Observable<any> {
    if (this._weatherStation) {
      this.streams.push(this.addWeatherStationStream('Temperature', 'temperature', '°C'));
      this.streams.push(this.addWeatherStationStream('Precipitation', 'amountPrecipitation', 'mm'));
      this.streams.push(this.addWeatherStationStream('Air Pressure', 'reducedAirPressure', 'hPa'));
      this.streams.push(this.addWeatherStationStream('Wind Force', 'windForce', 'knots'));

      return this.loadWeatherDataFromApi();
    }

    return Observable.empty();
  }

  openNodeInfo(node: MonitoredNodeTree) {
    this.router.navigate(['sensors', 'details', node.id]);
  }

  resetStreams() {
    this.streams = [];
  }

  findNodeOfStream(streamId: string, node: MonitoredNodeTree): MonitoredNodeTree {
    if (node.dataStream && node.dataStream.streamId === streamId) {
      return node;
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const n = node.children[i];
        const nf = this.findNodeOfStream(streamId, n);
        if (nf) {
          return nf;
        }
      }
    }
    return null;
  }

  getStreamsOfNode(node: MonitoredNodeTree): DataStream[] {
    const result = [];
    if (node.dataStream) {
      result.push(node.dataStream);
    }
    if (node.children) {
      node.children.forEach(child => {
        result.push(...this.getStreamsOfNode(child));
      });
    }
    return result;
  }

  getUniqueStreams(node: MonitoredNodeTree) {
    const streams = this.getStreamsOfNode(node);
    for (let i = 0; i < streams.length; i++) {
      const stream = streams[i];
      if (streams.slice(0, i).find(s => stream.streamId === s.streamId)) {
        streams.splice(i, 1);
        i--;
      }
    }
    return streams;
  }

  loadStreamFromApi(streamId: string): Observable<any> {
    return this.api.getStreamData(streamId, this.dates.start, this.dates.end).map(entries => {
      this.populateStreamData(streamId, entries);
      return this.streamData[streamId] = entries;
    }).catch((err) => {
      const s = this.streams.find(stream => stream.stream.streamId === streamId);
      s.loading = false;
      s.error = err.toString();
      return err;
    });
  }

  loadStreamsOfNode(node: MonitoredNodeTree) {
    const streams = this.getUniqueStreams(node);
    streams.forEach(stream => {
        this.streams.push({
            stream: stream,
            node: this.findNodeOfStream(stream.streamId, node),
            dataAvailable: false,
            data: [],
            labels: [],
            options: this.defaultLineChartOptions,
            colors: [],
            legend: false,
            type: 'line',
            loading: true,
            error: null,
            lastValue: null
          }
        );
      }
    );

    if (this.streamProvider === 'api') {
      const observables = this.streams.map(stream => this.loadStreamFromApi(stream.stream.streamId));
      return Observable.forkJoin(...observables)

    } else if (this.streamProvider instanceof Function) {
      const observables = this.streams.map(stream => this.loadStreamFromProvider(stream.stream.streamId));
      return Observable.forkJoin(...observables);

    } else {
      throw new Error('unknown streamProvider');
    }
  }

  getBarChartColor(data: number, metaData: any): string {
    for (const key in metaData.chartColorRules) {
      if (!metaData.chartColorRules.hasOwnProperty(key)) {
        continue;
      }
      const rule = metaData.chartColorRules[key];
      let matched = true;
      for (const cond in rule) {
        if (!rule.hasOwnProperty(cond)) {
          continue;
        }
        if (cond === 'lt' && !(data < rule[cond])
          || cond === 'lte' && !(data <= rule[cond])
          || cond === 'gt' && !(data > rule[cond])
          || cond === 'gte' && !(data >= rule[cond])
          || cond === 'eq' && !(data === rule[cond])) {
          matched = false;
        }
      }
      if (matched) {
        return key;
      }
    }
    return undefined;
  };

  getBarParams(recordsData: any[], paramsRecord: string): any[] {
    return recordsData.map(entry => entry[paramsRecord]);
  };

  loadStreamFromProvider(streamId: string): Observable<any> {
    return this.streamProvider(streamId, this.dates.start, this.dates.end).map(entries => {
      this.populateStreamData(streamId, entries);
      return this.streamData[streamId] = entries;
    }).catch((err) => {
      this.setStreamDataLoadingError(streamId, err);
      return err;
    });
  }

  getDetailedBarDataSet(streamId, entries, graphSettings): any {
    const s = this.streams.find(stream => stream.stream.streamId === streamId);

    if (entries) {
      return entries.data.map(e => {
        const data = this.unitPipe.transform(e.value, s.stream.unit);
        const label = moment(new Date(e.ts));

        let color = undefined;
        if (graphSettings) {
          color = this.getBarChartColor(data, graphSettings);
        }
        return {label: label, data: data, color: color};
      });
    }
    return [];
  };

  getMetaDataOfNode(node: MonitoredNodeTree) {
    if (!node || !node.metadata) {
      return {};
    }
    try {
      return JSON.parse(node.metadata);
    } catch (e) {
      console.error('failed to parse metaData of node', e);
      return {};
    }
  }

  populateStreamData(streamId, entries) {
    const s = this.streams.find(stream => stream.stream.streamId === streamId);
    const nodeMetaData = this.getMetaDataOfNode(s.node);
    if (nodeMetaData.graphSettings && nodeMetaData.graphSettings.chartType) {
      s.type = nodeMetaData.graphSettings.chartType;
    }
    s.loading = false;
    s.stream.unit = this.unitPipe.transformUnit(s.stream.unit);

    if (s.type === 'line') {
      s.data = [{
        data: entries.data.map(e => {
          return {x: new Date(e.ts), y: this.unitPipe.transform(e.value, s.stream.unit)}
        }),
        label: s.stream.unit,
        pointRadius: 0
      }];
      s.lastValue = s.data[0].data.length ? s.data[0].data[s.data[0].data.length - 1].y : null;
      s.options = this.defaultLineChartOptions;
    }
    if (s.type === 'bar') {
      const dataBar = this.getDetailedBarDataSet(streamId, entries, nodeMetaData.graphSettings);
      s.data = [{
        data: this.getBarParams(dataBar, 'data'),
        label: s.stream.unit,
      }];
      s.lastValue = s.data[0].data.length ? s.data[0].data[s.data[0].data.length - 1] : null;
      s.colors = [{
        backgroundColor: this.getBarParams(dataBar, 'color')
      }];
      s.labels = this.getBarParams(dataBar, 'label');
      s.options = this.defaultBarChartOptions;
    }

    s.dataAvailable = true;
  }

  public chartClicked(e: any): void {
    console.log('chart click', e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
