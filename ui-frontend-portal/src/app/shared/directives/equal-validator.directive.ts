import {Directive, Input} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[equalValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true}]
})
export class EqualValidatorDirective implements Validator {

  @Input() equalValidator;

  constructor() {
  }

  validate(c: AbstractControl): {[p: string]: any} {
    const value = c.value;
    const other = c.root.get(this.equalValidator);
    const otherValue = other ? other.value : null;

    if (value && otherValue && value !== otherValue) {
      return {
        validateEqual: false
      };
    }
    if (value && otherValue && other && other.errors && typeof(other.errors['validateEqual']) !== 'undefined') {
      delete other.errors['validateEqual'];
      if (!Object.keys(other.errors).length) {
        other.setErrors(null);
      }
    }
    return null;
  }
}
