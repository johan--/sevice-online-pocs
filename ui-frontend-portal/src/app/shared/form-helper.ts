import {FormGroup} from '@angular/forms';

export function getErrors(form: FormGroup, errorMessages: {[formName: string]: {[error: string]: string}}) {
  const unknown = 'Unknown error';
  const errors = {};
  for (const formName of Object.keys(form.controls)) {
    const control = form.get(formName);

    if (control.dirty && !control.valid) {
      errors[formName] = [];
      if (errorMessages[formName]) {
        for (const error in control.errors) {
          if (!control.errors.hasOwnProperty(error)) {
            continue;
          }
          errors[formName].push(errorMessages[formName][error] || unknown);
        }
      } else {
        errors[formName].push(unknown);
      }

    } else {
      errors[formName] = null;
    }
  }
  return errors;
}
