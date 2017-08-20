import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[dateTimeRangeValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateTimeRangeValidatorDirective, multi: true}]
})
export class DateTimeRangeValidatorDirective implements Validator {

  /**
   * Provide an array of valid date formats
   */
  @Input() dateTimeRangeValidator: string[];

  constructor() {
  }

  validate(c: AbstractControl): ValidationErrors | any {
    const value = c.value;
    if (typeof(value) !== 'string') {
      return null;
    }
    if (value === '') {
      return {'required': true};
    }

    const m = moment(value, this.dateTimeRangeValidator);
    if (m.isValid()) {
      return null;
    } else {
      return 'invalid';
    }

  }

}
