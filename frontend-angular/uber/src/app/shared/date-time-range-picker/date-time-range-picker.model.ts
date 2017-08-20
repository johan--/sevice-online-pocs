import { Moment } from 'moment';

export interface DateTimeRange {
  start: Moment;
  end: Moment;
}

export interface DateTimeRangePickerOptionsStruct {
  timeMinuteStep?: number;
  withTime?: boolean;
  startDate?: Moment;
  endDate?: Moment;
  minDate?: Moment;
  maxDate?: Moment;
  singleDatePicker?: boolean;
  inputFormat?: string;
  displayFormat?: string;
  dateInput?: boolean;
  inline?: boolean;
  popup?: boolean;
  modal?: boolean;
  ranges?: {
    [key: string]: [Moment, Moment]
  };
}
