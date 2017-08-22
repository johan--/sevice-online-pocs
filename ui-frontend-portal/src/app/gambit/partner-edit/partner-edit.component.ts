import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GambitRoutesGenerator} from '../gambit-routing.module';
import {getErrors} from '../../shared/form-helper';
import {GambitApiService} from '../services/gambit-api.service';
import {RegisterPartnerRequest} from '../model/RegisterPartnerRequest';
import {PartnerInfo} from '../model/PartnerInfo';
import {ImInfo} from '../model/ImInfo';
import {DOCUMENT} from '@angular/platform-browser';
import {Partner} from '../model/partner';
import {BreadcrumbsComponent} from '../../shared/breadcrumbs/breadcrumbs.component';
import {BreadcrumbsService} from '../../shared/breadcrumbs/breadcrumbs.service';
import {Location} from '@angular/common';

/**
 * A reactive form to create or modify partners.
 * See: https://angular.io/docs/ts/latest/guide/reactive-forms.html
 */
@Component({
  selector: 'partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss']
})
export class PartnerEditComponent implements OnInit {

  gambitRoutes = GambitRoutesGenerator;

  partnerId: string;

  partnerForm: FormGroup;

  errors: { [name: string]: Array<string> } = {};

  errorMessages: { [name: string]: any } = {};

  globalError: string = null;

  loading = false;

  imInfo: ImInfo = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private api: GambitApiService,
              private breadcrumbsService: BreadcrumbsService,
              private location: Location,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.partnerId = this.gambitRoutes.findPartnerId(this.route);
      this.route.snapshot.data['title'] = this.partnerId === 'add' ? 'Add partner' : 'Edit partner';

      this.createForm();

      if (this.partnerId !== 'add') {
        this.loading = true;
        this.globalError = null;
        this.api.getPartner(this.partnerId).subscribe(partner => {
          this.loading = false;
          this.partnerForm.patchValue(partner);
        }, error => {
          this.loading = false;
          this.globalError = error;
        });
      }

    });

    this.api.getImInfo().subscribe(imInfo => {
      this.imInfo = imInfo;
    });

  }

  createForm() {
    this.partnerForm = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      imLoginName: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[-a-zA-Z0-9_]*$/)
        ]
      ],
      imId: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[-a-zA-Z0-9_]*$/)
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
          Validators.pattern(/^[0-9]{4}$/)
        ]

      ],
      status: [
        '', Validators.required
      ]
    });

    this.errorMessages = {
      name: {
        required: 'The name is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Not more than 255 characters allowed',
      },
      imLoginName: {
        required: 'The username is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Not more than 255 characters allowed',
        pattern: 'Please use only characters and digits'
      },
      imId: {
        required: 'The IM user id  is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Not more than 255 characters allowed'
      },
      email: {
        required: 'The E-Mail address is required',
        email: 'The current E-Mail is not valid'
      },
      voucherRedemptionPin: {
        pattern: 'The secret code contains 4 digits'
      }
    };

    this.partnerForm.patchValue(new Partner());

    this.partnerForm.valueChanges.subscribe(() => {
      this.errors = getErrors(this.partnerForm, this.errorMessages);
    });

  }

  submitEvent(event: string) {
    console.log('event', event);
    switch (event) {
      case 'save': this.submitForm(); break;
      case 'saveAndClose': this.submitAndCloseForm(); break;
    }
  }

  submitForm() {
    console.log('data', this.partnerForm.value);
    this.globalError = null;
    const postData: PartnerInfo = {
      email: this.partnerForm.value.email,
      imId: this.partnerForm.value.imId,
      imLoginName: this.partnerForm.value.imLoginName,
      name: this.partnerForm.value.name,
      status: this.partnerForm.value.status,
      voucherRedemptionPin: this.partnerForm.value.voucherRedemptionPin,
    };
    console.log('postData', postData);

    this.loading = true;
    if (this.partnerId !== 'add') {
      this.api.updatePartner(this.partnerId, postData).subscribe(result => {
        this.loading = false;
        console.log('result', result);
        this.partnerForm.reset();
        this.partnerForm.patchValue(result);

      }, error => {
        this.loading = false;
        console.log('error', error);
        this.globalError = error;
      });

    } else {
      this.api.registerPartner(postData).subscribe(result => {
        this.loading = false;
        console.log('result', result);
        this.router.navigate([this.gambitRoutes.partner(result.id.toString())]);

      }, error => {
        this.loading = false;
        console.log('error', error);
        this.globalError = error;
      });

    }


  }
  submitAndCloseForm() {
    console.log('submitAndCloseForm');
    this.globalError = null;
    const postData: PartnerInfo = {
      email: this.partnerForm.value.email,
      imId: this.partnerForm.value.imId,
      imLoginName: this.partnerForm.value.imLoginName,
      name: this.partnerForm.value.name,
      status: this.partnerForm.value.status,
      voucherRedemptionPin: this.partnerForm.value.voucherRedemptionPin,
    };

    this.loading = true;
    console.log('postData', postData);

    if (this.partnerId !== 'add') {
      this.api.updatePartner(this.partnerId, postData).subscribe(result => {
        this.loading = false;
        console.log('partner post', result);
        this.router.navigate([this.gambitRoutes.partners()]);
      }, error => {
        console.log('error', error);
        this.globalError = error;
      });
    } else {
      console.log('event else');
      this.api.registerPartner(postData).subscribe(result => {
        this.loading = false;
        console.log('partner post', result);
        this.router.navigate([this.gambitRoutes.partners()]);
      }, error => {
        console.log('postData', postData);
        this.loading = false;
        console.log('error', error);
        this.globalError = error;
      });


    }

  }

  getRegistrationUrl(): string {
    if (!this.imInfo) {
      return '';
    }
    return this.imInfo.registrationUrl + '&path=' + encodeURIComponent(this.document.location.origin);

  }

}
