import { Component, OnInit } from '@angular/core';
import {
  DateTimeRange,
  DateTimeRangePickerOptionsStruct
} from "../../shared/date-time-range-picker/date-time-range-picker.model";
import * as moment from 'moment';

@Component({
  selector: 'time-planning',
  templateUrl: './time-planning.component.html',
  styleUrls: ['./time-planning.component.scss']
})
export class TimePlanningComponent implements OnInit {

  pickerOptions: DateTimeRangePickerOptionsStruct = {
    startDate: moment('2017-01-01 00:00'),
    endDate: moment('2017-05-12 00:00'),
    maxDate: moment('2017-08-10 00:00'),
    minDate: moment('2017-03-23 00:00'),
    ranges: {
      'Last 24h': [moment().subtract(24, 'hours'), moment()],
      'Last 48h': [moment().subtract(48, 'hours'), moment()],
      'Last 7 days': [moment().subtract(7, 'days'), moment()],
      'Last 30 days': [moment().subtract(30, 'days'), moment()]
    }
  };

  pickerOptions2: DateTimeRangePickerOptionsStruct = {
    startDate: moment('2017-01-01 00:00'),
    singleDatePicker: true,
    withTime: false,
    modal: false,
    popup: true
  };

  constructor() { }

  ngOnInit() {
  }

  rangeChanged(range: DateTimeRange) {
    console.log('rangeChanged', range);
  }
  rangeChanged2(range: DateTimeRange) {
    console.log('rangeChanged2', range);
  }

}
