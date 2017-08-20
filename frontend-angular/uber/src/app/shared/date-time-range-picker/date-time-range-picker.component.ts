import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import * as moment from 'moment';
import {Moment} from 'moment';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import {DateTimeRange, DateTimeRangePickerOptionsStruct} from './date-time-range-picker.model';
import {NgModel} from '@angular/forms';

export const validInputDateTimeFormats = [
  'YYYY-MM-DD HH:mm'
];
export const validInputDateFormats = [
  'YYYY-MM-DD'
];
export const validDisplayDateTimeFormats = [
  'll HH:mm'
];
export const validDisplayDateFormats = [
  'll'
];

export class DateTimeRangePickerOptions implements DateTimeRangePickerOptionsStruct {
  timeMinuteStep = 1;
  withTime = true;
  startDate = moment().subtract(7, 'days');
  endDate = moment();
  minDate = null;
  maxDate = null;
  singleDatePicker = false;
  inputFormat = null;
  displayFormat = '';
  dateInput = true;
  inline = false;
  popup = false;
  modal = false;
  ranges = null;
}

function toNgbTime(time: NgbTimeStruct): NgbTime {
  if (!time) {
    return null;
  }
  return new NgbTime(time.hour, time.minute, time.second);
}

function dateToNgbDate(date: Date | Moment): NgbDate {
  if (!date) {
    return null;
  }
  date = moment(date);
  return NgbDate.from({year: date.year(), month: date.month() + 1, day: date.date()});
}

function dateToNgbTime(date: Date | Moment): NgbTime {
  if (!date) {
    return null;
  }
  date = moment(date);
  return new NgbTime(date.hour(), date.minute(), 0);
}

function toMoment(date: NgbDate, time?: NgbTime) {
  if (!date && !time) {
    return null;
  }
  if (date && time) {
    return moment({y: date.year, M: date.month - 1, d: date.day, h: time.hour, m: time.minute, s: 0});
  } else {
    return moment({y: date.year, M: date.month - 1, d: date.day, h: 0, m: 0, s: 0});
  }
}

@Component({
  selector: 'date-time-range-picker',
  templateUrl: './date-time-range-picker.component.html',
  styleUrls: ['./date-time-range-picker.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DateTimeRangePickerComponent implements OnInit {

  @ViewChild('picker') picker: TemplateRef<any>;

  @Output() rangeChange = new EventEmitter<DateTimeRange>();

  /**
   * Emitted when the apply button was pressed in popup mode.
   * Or when the cancel button was pressed, then it will contain null.
   */
  @Output() apply = new EventEmitter<DateTimeRange>();

  _options: DateTimeRangePickerOptions = new DateTimeRangePickerOptions();

  isRange = true;

  fromDate: NgbDate;
  toDate: NgbDate;

  fromTime: NgbTime;
  toTime: NgbTime;

  hoveredFromDate: NgbDate;
  hoveredToDate: NgbDate;

  minDate: NgbDate = null;
  maxDate: NgbDate = null;

  ranges: { label: string, range: [Moment, Moment] }[] = null;

  duration = 0;

  constructor() {
    this.isRange = !this._options.singleDatePicker;
    this.fromDate = dateToNgbDate(this._options.startDate);
    this.fromTime = dateToNgbTime(this._options.startDate);
    this.toDate = dateToNgbDate(this._options.endDate);
    this.toTime = dateToNgbTime(this._options.endDate);

    this.minDate = dateToNgbDate(this._options.minDate);
    this.maxDate = dateToNgbDate(this._options.maxDate);

    if (!this._options.inputFormat) {
      this._options.inputFormat = this.getInputFormats()[0];
    }
    if (!this._options.displayFormat) {
      this._options.displayFormat = this.getDisplayFormats()[0];
    }
    this.updateDuration();
  }

  ngOnInit() {
  }

  @Input()
  set options(opt: DateTimeRangePickerOptionsStruct) {
    Object.assign(this._options, opt);

    if (opt.singleDatePicker !== undefined) {
      this.isRange = !this._options.singleDatePicker;
    }
    if (opt.startDate !== undefined) {
      this.fromDate = dateToNgbDate(this._options.startDate);
      this.fromTime = dateToNgbTime(this._options.startDate);
      this.updateDuration();
    }
    if (opt.endDate !== undefined) {
      this.toDate = dateToNgbDate(this._options.endDate);
      this.toTime = dateToNgbTime(this._options.endDate);
      this.updateDuration();
    }
    if (opt.minDate !== undefined) {
      this.minDate = dateToNgbDate(this._options.minDate);
    }
    if (opt.maxDate !== undefined) {
      this.maxDate = dateToNgbDate(this._options.maxDate);
    }
    if (opt.withTime !== undefined && !opt.inputFormat) {
      this._options.inputFormat = this.getInputFormats()[0];
    }
    if (opt.withTime !== undefined && !opt.displayFormat) {
      this._options.displayFormat = this.getDisplayFormats()[0];
    }
    if (opt.ranges !== undefined) {
      this.updateRanges();
    }
  }

  get options() {
    return this._options;
  }

  onDateHover(date: NgbDateStruct, type: string) {
    if (type === 'from') {
      this.hoveredFromDate = NgbDate.from(date);
    }
    if (type === 'to') {
      this.hoveredToDate = NgbDate.from(date);
    }
  }

  private updateDuration() {
    const start = this.getFromAsMoment();
    const end = this.getToAsMoment();
    if (start && end) {
      this.duration = end.diff(start);
    }
  }

  private propagateChange() {
    const change: DateTimeRange = {
      start: this.getFromAsMoment(),
      end: this.getToAsMoment()
    };
    this.updateDuration();
    this.rangeChange.next(change);

  }

  updateFromTime(time: NgbTimeStruct) {
    this.fromTime = toNgbTime(time);

    if (this.fromDate.equals(this.toDate)
      && (this.fromTime.hour > this.toTime.hour || this.fromTime.hour === this.toTime.hour
        && this.fromTime.minute > this.toTime.minute)) {
      this.toTime = this.fromTime;
    }
    this.propagateChange();
  }

  updateToTime(time: NgbTimeStruct) {
    this.toTime = toNgbTime(time);
    if (this.fromDate.equals(this.toDate)
      && (this.fromTime.hour > this.toTime.hour || this.fromTime.hour === this.toTime.hour
        && this.fromTime.minute > this.toTime.minute)) {
      this.fromTime = this.toTime;
    }
    this.propagateChange();
  }

  updateFromDate(date: NgbDateStruct) {
    const dt = NgbDate.from(date);
    if (dt.equals(this.fromDate)) {
      return;
    }
    this.fromDate = dt;
    if (this.toDate && this.fromDate.after(this.toDate)) {
      this.toDate = this.fromDate;
    }
    this.propagateChange();
  }

  updateToDate(date: NgbDateStruct) {
    const dt = NgbDate.from(date);
    if (dt.equals(this.toDate)) {
      return;
    }
    this.toDate = dt;
    if (this.fromDate && this.toDate.before(this.fromDate)) {
      this.fromDate = this.toDate;
    }
    this.propagateChange();
  }

  getInputFormats() {
    return this._options.withTime ? validInputDateTimeFormats : validInputDateFormats;
  }

  getDisplayFormats() {
    return this._options.withTime ? validDisplayDateTimeFormats : validDisplayDateFormats;
  }

  updateFromInput(date: string) {
    const m = moment(date, this.getInputFormats());
    if (!m.isValid()) {
      return;
    }
    this.updateFromDate({year: m.year(), month: m.month() + 1, day: m.date()});
    if (this._options.withTime) {
      this.updateFromTime({hour: m.hour(), minute: m.minute(), second: 0});
    }
  }

  updateToInput(date: string) {
    const m = moment(date, this.getInputFormats());
    if (!m.isValid()) {
      return;
    }
    this.updateToDate({year: m.year(), month: m.month() + 1, day: m.date()});
    if (this._options.withTime) {
      this.updateToTime({hour: m.hour(), minute: m.minute(), second: 0});
    }
  }

  isHovered(date: NgbDateStruct, type: string) {
    const dt = NgbDate.from(date);
    return type === 'to' && dt.equals(this.hoveredToDate) || type === 'from'
      && dt.equals(this.hoveredFromDate);
  }

  isInside(date: NgbDateStruct) {
    if (!this.isRange) {
      return false;
    }
    const dt = NgbDate.from(date);
    return dt.after(this.fromDate) && dt.before(this.toDate);
  }

  isDisabled(date: NgbDateStruct) {
    const dt = NgbDate.from(date);
    if (this.minDate && dt.before(this.minDate)) {
      return true;
    }
    if (this.maxDate && dt.after(this.maxDate)) {
      return true;
    }
    return false;
  }

  isFrom(date: NgbDateStruct) {
    const dt = NgbDate.from(date);
    return dt.equals(this.fromDate);
  }

  isTo(date: NgbDateStruct) {
    const dt = NgbDate.from(date);
    return dt.equals(this.toDate);
  }

  getFromAsMoment(): Moment {
    return toMoment(this.fromDate, this.fromTime);
  }

  getToAsMoment(): Moment {
    return toMoment(this.toDate, this.toTime);
  }

  fromAsInputText() {
    return this.getFromAsMoment().format(this._options.inputFormat);
  }

  toAsInputText() {
    return this.getToAsMoment().format(this._options.inputFormat);
  }

  fromAsDisplayText() {
    return this.getFromAsMoment().format(this._options.displayFormat);
  }

  toAsDisplayText() {
    return this.getToAsMoment().format(this._options.displayFormat);
  }

  asDisplayText() {
    if (this.isRange) {
      return this.fromAsDisplayText() + ' - ' + this.toAsDisplayText();
    } else {
      return this.fromAsDisplayText();
    }
  }

  onEnter(model: NgModel) {
    if (this._options.popup && model.valid) {
      this.onApply();
    }
  }

  onApply() {
    const change: DateTimeRange = {
      start: this.getFromAsMoment(),
      end: this.getToAsMoment()
    };
    console.log('onApply', change);
    this._options.startDate = change.start;
    this._options.endDate = change.end;
    this.apply.next(change);
  }

  onCancel() {
    this.apply.next(null);

    if (this._options.startDate !== undefined) {
      this.fromDate = dateToNgbDate(this._options.startDate);
      this.fromTime = dateToNgbTime(this._options.startDate);
    }
    if (this._options.endDate !== undefined) {
      this.toDate = dateToNgbDate(this._options.endDate);
      this.toTime = dateToNgbTime(this._options.endDate);
    }
    this.updateDuration();
  }

  setRange(range: [Moment, Moment]) {

    this.updateFromDate(dateToNgbDate(range[0]));
    this.updateFromTime(dateToNgbTime(range[0]));
    this.updateToDate(dateToNgbDate(range[1]));
    this.updateToTime(dateToNgbTime(range[1]));

  }

  updateRanges() {
    this.ranges = null;
    if (this._options.ranges) {
      this.ranges = Object.keys(this._options.ranges).map(rangeKey => {
        return {
          label: rangeKey,
          range: this._options.ranges[rangeKey],
        };
      });
    }
  }

}
