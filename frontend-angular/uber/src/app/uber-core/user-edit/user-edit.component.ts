import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { getErrors } from '../../shared/form-helper';
import {ProfileSetting} from '../model/ProfileSetting';
import { error } from 'util';
import {RegisterProfileRequest} from "../model/RegisterProfileRequest";

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  errors: { [name: string]: Array<string> } = {};

  errorMessages: { [name: string]: any } = {};

  globalError: string = null;

  profileForm: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }


  createForm(){
    this.profileForm = this.fb.group({

      fullName: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      jobTitle: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      country: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      city: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      mobilePhone: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
    });



    this.errorMessages = {
      fullName: {
        required: 'The provider is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      jobTitle: {
        required: 'The title is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      city: {
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      country: {
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      mobilePhone: {
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      }
    };

    this.profileForm.patchValue(new ProfileSetting());

    this.profileForm.valueChanges.subscribe(() => {
      this.errors = getErrors(this.profileForm, this.errorMessages);
    });

  }

  submitForm() {
    this.globalError = null;
    const postData: RegisterProfileRequest = {
      fullName: this.profileForm.value.fullName,
      jobTitle: this.profileForm.value.jobTitle,
      userCity: this.profileForm.value.city,
      userCountry: this.profileForm.value.country,
      mobilePhone: this.profileForm.value.mobilePhone

    };

    console.log('postData', postData);

    /*this.loading = true;

    this.api.updatePartnerSetting(postData).subscribe(result => {
      this.loading = false;
      this.profileForm.reset();
      this.profileForm.patchValue(result);

    }, error => {
      this.loading = false;
      console.log('error', error);
      this.globalError = error;
    });*/

  }


}
