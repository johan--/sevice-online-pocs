import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { unitOfTime } from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  constructor(private translate: TranslateService) {

  }

  transform(value: any, format: 'human' | 'dhm' | unitOfTime.Base = 'human'): any {
    const d = moment.duration(value);
    if (format === 'human') {
      return d.humanize();
    } else if (format === 'dhm') {
      return this.translate.instant('pipes.duration.dayHourMinute', {
        days: Math.floor(d.asDays()),
        hours: d.hours(),
        minutes: d.minutes()
      });
    } else {
      return Math.round(d.as(format));
    }
  }

}

