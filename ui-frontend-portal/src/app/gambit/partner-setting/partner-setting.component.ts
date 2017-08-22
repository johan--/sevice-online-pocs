import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GambitRoutesGenerator} from '../gambit-routing.module';
import {getErrors} from '../../shared/form-helper';
import {GambitApiService} from '../services/gambit-api.service';
import {PartnerInfo} from '../model/PartnerInfo';

@Component({
  selector: 'partner-setting',
  templateUrl: './partner-setting.component.html',
  styleUrls: ['./partner-setting.component.scss']
})
export class PartnerSettingComponent implements OnInit {

  gambitRoutes = GambitRoutesGenerator;

  partnerId: string;

  partnerSettingForm: FormGroup;

  errors: {[name: string]: Array<string>} = {};

  errorMessages: {[name: string]: any} = {};

  globalError: string = null;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private api: GambitApiService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.createForm();
      this.loading = true;
      this.globalError = null;
      this.api.getPartnerSetting().subscribe(setting => {
        this.loading = false;
        console.log('loaded setting', setting);
        this.partnerSettingForm.patchValue(setting);
      }, error => {
        this.loading = false;
        this.globalError = error;
      });


    });
  }

  createForm() {
      this.partnerSettingForm = this.fb.group({
        name: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255)
          ]
        ],
        email: ['',
          [
            Validators.required,
            Validators.email
          ]
        ],
        voucherRedemptionPin: ['',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{4}$/)
          ]

        ]
      });

      this.errorMessages = {
        name: {
          required: 'The name is required',
          minlength: 'Please provide at least 3 characters',
          maxlength: 'Not more than 255 characters allowed',
        },
        email: {
          required: 'The E-Mail address is required',
          email: 'The current E-Mail is not valid'
        },
        voucherRedemptionPin: {
          required: 'The secret code is required',
          pattern: 'The secret code contains 4 digits'
        }
      };

      this.partnerSettingForm.valueChanges.subscribe(() => {
        this.errors = getErrors(this.partnerSettingForm, this.errorMessages);
      });


    }

  submitForm() {
    this.globalError = null;
    const postData: PartnerInfo = {
      email: this.partnerSettingForm.value.email,
      name: this.partnerSettingForm.value.name,
      voucherRedemptionPin: this.partnerSettingForm.value.voucherRedemptionPin,
    };

    this.loading = true;

    this.api.updatePartnerSetting(postData).subscribe(result => {
      this.loading = false;
      this.partnerSettingForm.reset();
      this.partnerSettingForm.patchValue(result);

    }, error => {
      this.loading = false;
      console.log('error', error);
      this.globalError = error;
    });





  }


}
