import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GambitRoutesGenerator } from '../gambit-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from '../model/offer';
import { getErrors } from '../../shared/form-helper';
import { RegisterOfferRequest } from '../model/RegisterOfferRequest';
import { GambitApiService } from '../services/gambit-api.service';
import { error } from 'util';



@Component({
  selector: 'offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.scss']
})
export class OfferEditComponent implements OnInit {

  gambitRoutes = GambitRoutesGenerator;

  offerId: string;

  offerTitle: string;
  offerForm: FormGroup;

  errors: { [name: string]: Array<string> } = {};

  errorMessages: { [name: string]: any } = {};

  globalError: string = null;

  loading = false;

  partnerId: string;

  back: boolean;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private api: GambitApiService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.offerId = this.route.snapshot.params['offerId'];
      this.route.snapshot.data['title'] = this.offerId === 'add' ? 'Add offer' : 'Edit offer';
      this.partnerId = this.gambitRoutes.findPartnerId(this.route) || '0';

      this.createForm();

      if (this.partnerId && this.partnerId !== 'add' && this.offerId && this.offerId !== 'add') {
        this.loading = true;
        this.globalError = null;
        this.api.getOfferFromPartner(this.partnerId, this.offerId).subscribe(offer => {
          this.loading = true;
          console.log('loaded offer', offer);
          this.offerTitle = offer.title;
          this.offerForm.patchValue(offer);
        }, error => {
          this.loading = false;
          this.globalError = error;
        });
      }

    });
  }

  createForm() {
    this.offerForm = this.fb.group({
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

    this.offerForm.patchValue(new Offer());

    this.offerForm.valueChanges.subscribe(() => {
      this.errors = getErrors(this.offerForm, this.errorMessages);
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
    this.globalError = null;
    const postData: RegisterOfferRequest = {
      provider: this.offerForm.value.provider,
      description: this.offerForm.value.description,
      image: this.offerForm.value.image,
      requiredPoints: this.offerForm.value.requiredPoints,
      status: this.offerForm.value.status,
      title: this.offerForm.value.title
    };

    this.loading = true;
    if (this.offerId !== 'add') {
      this.api.updateOffer(this.partnerId, this.offerId, postData).subscribe(result => {
        this.loading = false;
        this.offerForm.reset();
        console.log('this.offerForm', this.offerForm);
        this.offerForm.patchValue(result);
      }, error => {
        this.loading = false;
        console.log('error', error);
        this.globalError = error;
      });
    } else {
      this.api.registerOfferByPartner(postData, this.partnerId).subscribe(result => {
        this.loading = false;
        this.router.navigate([this.gambitRoutes.offer(result.id.toString(), this.partnerId)]);

      }, error => {
        this.loading = false;
        console.log('error', error);
        this.globalError = error;
      })
    }

  }

  submitAndCloseForm() {
    console.log('submitAndCloseForm');
    this.globalError = null;
    const postData: RegisterOfferRequest = {
      provider: this.offerForm.value.provider,
      description: this.offerForm.value.description,
      image: this.offerForm.value.image,
      requiredPoints: this.offerForm.value.requiredPoints,
      status: this.offerForm.value.status,
      title: this.offerForm.value.title
    };

    this.loading = true;
    console.log('postData', postData);

    if (this.offerId !== 'add') {
      this.api.updateOffer(this.partnerId, this.offerId, postData).subscribe(result => {
        this.loading = false;
        this.router.navigate([this.gambitRoutes.offers(this.partnerId)]);
      }, error => {
        console.log('error', error);
        this.globalError = error;
      });
    } else {
      this.api.registerOfferByPartner(postData, this.partnerId).subscribe(result => {
        this.loading = false;
        this.router.navigate([this.gambitRoutes.offers(this.partnerId)]);
      }, error => {
        console.log('postData', postData);
        this.loading = false;
        console.log('error', error);
        this.globalError = error;
      });


    }

  }

}
