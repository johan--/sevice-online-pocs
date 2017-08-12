import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { getErrors } from '../../shared/form-helper';
import {ProfileSetting} from '../model/ProfileSetting';
import { error } from 'util';
import {ServiceEditRequest} from "../model/ServiceEditRequest";

@Component({
  selector: 'service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {

  errors: { [name: string]: Array<string> } = {};

  errorMessages: { [name: string]: any } = {};

  globalError: string = null;

  serviceForm: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }


  createForm(){
    this.serviceForm = this.fb.group({

      serviceTitle: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      serviceCategory: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      serviceDescription: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      serviceCountry: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      serviceCity: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      serviceStreet: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      serviceContact: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
    });



    this.errorMessages = {
      serviceTitle: {
        required: 'The provider is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      serviceCategory: {
        required: 'The title is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      serviceDescription: {
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      serviceCountry: {
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      serviceCity: {
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      }
    };

    this.serviceForm.patchValue(new ProfileSetting());

    this.serviceForm.valueChanges.subscribe(() => {
      this.errors = getErrors(this.serviceForm, this.errorMessages);
    });

  }

  submitForm() {
    this.globalError = null;
    const postData: ServiceEditRequest = {
      serviceTitle: this.serviceForm.value.serviceTitle,
      serviceCategory: this.serviceForm.value.serviceCategory,
      serviceDescription: this.serviceForm.value.serviceDescription,
      serviceCountry: this.serviceForm.value.serviceCountry,
      serviceCity: this.serviceForm.value.serviceCity,
      serviceStreet: this.serviceForm.value.serviceStreet,
      serviceContact: this.serviceForm.value.serviceContact

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
