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
      provider: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      title: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      image: ['',
        [
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      description: ['',
        [
          Validators.required
        ]
      ],
      requiredPoints: ['',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      status: [
        '', Validators.required
      ]
    });

    this.errorMessages = {
      provider: {
        required: 'The provider is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      title: {
        required: 'The title is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      image: {
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      description: {
        required: 'Please provide a description'
      },
      requiredPoints: {
        required: 'The points are required',
        pattern: 'Please use only digits'
      },
      status: {
        required: 'The status is required',
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
      provider: this.profileForm.value.provider,
      description: this.profileForm.value.description,
      image: this.profileForm.value.image,
      requiredPoints: this.profileForm.value.requiredPoints,
      status: this.profileForm.value.status,
      title: this.profileForm.value.title
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
