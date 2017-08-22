import {Directive, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';

declare const $;

export interface DateRange {
  start: Date,
  end: Date
}

@Directive({
  selector: '[daterangepicker]'
})
export class DaterangepickerDirective {

  @Output() onRangeSelected = new EventEmitter<DateRange>();

  constructor(private elementRef: ElementRef) {
    console.log('construct daterangepicker', elementRef);
  }

  @Input('daterangepicker') set options(options: any) {
    $(this.elementRef.nativeElement)
      .daterangepicker(options, (start, end, label) => {
        this.onRangeSelected.next({start: start.toDate(), end: end.toDate()});
        if (this.elementRef.nativeElement.tagName !== 'input') {
          this.updateElement(start, end, options);
        }

      });
    if (options.startDate && options.endDate && this.elementRef.nativeElement.tagName !== 'input') {
      this.updateElement(moment(options.startDate), moment(options.endDate), options);
    }
  }

  private updateElement(start, end, options) {
    const format = options.locale && options.locale.format ? options.locale.format : moment.localeData().longDateFormat('L');
    const value = start.format(format) + ' - ' + end.format(format);
    const el = $(this.elementRef.nativeElement);
    const content = $('.date', el);
    if (content.length) {
      content.text(value);
    } else {
      el.text(value);
    }
  }

}
