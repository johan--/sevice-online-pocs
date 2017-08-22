import {Injectable} from '@angular/core';
import {BaseChartDataProvider, ChartDataInfo} from '../../shared/base-chart/base-chart.component';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {StatisticsResponse} from '../model/StatisticsResponse';
import {GambitApiService} from './gambit-api.service';


export class GambitChartDataProvider extends BaseChartDataProvider {
  constructor(type: string,
              private data: Observable<StatisticsResponse>,
              private label: string) {
    super(type);
  }


  generateBarLabels(startAt: number, endAt: number, aggregation: string): any[] {
    const labels = [];
    const aggregationValue: number = (aggregation === 'daily') ? (86400 * 1000) : null;
    moment.locale('de');
    if (aggregationValue) {
      for (let i = startAt; i <= endAt; i += aggregationValue) {
        labels.push(moment(i).format('ll'));
      }
    } else {
      return []
    }
    return labels;
  };


  getData(): Observable<ChartDataInfo> {

    return this.data.map(stat => {
      const dataBar = stat.values;
      const labels = this.generateBarLabels(stat.startAt, stat.endAt, stat.aggregation);
      return {
        dataSets: [{data: dataBar, label: 'Voucher'}],
        labels: labels

      };
    });

  }
}

@Injectable()
export class ChartDataService {

  constructor(private api: GambitApiService) {

  }

  // TODO getDataProv by (aggregation)

  getDataProvider(entity: string,
                  days: number,
                  label: string): GambitChartDataProvider {

    const aggregation = {
      'daily': {
        value: 86400 * 1000,
        name: 'daily'
      }
    };
    const end = Math.floor(new Date().getTime() / aggregation.daily.value) * aggregation.daily.value;
    const start = end - aggregation.daily.value * days;
    const stats = this.api.getStatisticsResponse(entity, aggregation.daily.name, start, end)
      .publishReplay(1).refCount();
    return new GambitChartDataProvider('bar', stats, label)
  }

}
