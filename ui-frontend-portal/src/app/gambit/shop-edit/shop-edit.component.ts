import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GambitRoutesGenerator } from '../gambit-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { getErrors } from '../../shared/form-helper';
import { GambitApiService } from '../services/gambit-api.service';
import { error } from 'util';
import { Shop } from '../model/shop';
import { RegisterShopRequest } from '../model/RegisterShopRequest';
import {Location} from '@angular/common';

@Component({
  selector: 'shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.scss']
})
export class ShopEditComponent implements OnInit {

  gambitRoutes = GambitRoutesGenerator;

  shopId: string;

  shopForm: FormGroup;

  errors: { [name: string]: Array<string> } = {};

  errorMessages: { [name: string]: any } = {};

  globalError: string = null;

  loading = false;

  partnerId: string;
  event: string;
  pageSubscription = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private api: GambitApiService,
              private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shopId = params['shopId'];
      this.route.snapshot.data['title'] = this.shopId === 'add' ? 'Add shop' : 'Edit shop';
      this.partnerId = this.gambitRoutes.findPartnerId(this.route) || '0';

      this.createForm();

      if (this.partnerId && this.partnerId !== 'add' && this.shopId && this.shopId !== 'add') {
        this.loading = true;
        this.globalError = null;
        this.api.getShopFromPartnerById(this.partnerId, this.shopId).subscribe(shop => {
          this.loading = true;
          console.log('loaded shop', shop);
          this.shopForm.patchValue(shop);
        }, error => {
          this.loading = false;
          this.globalError = error;
        });
      }

    });

  }

  createForm() {
    this.shopForm = this.fb.group({
      provider: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      address: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      latitude: ['',
        [

          Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)
        ]
      ],

      longitude: ['',
        [

          Validators.pattern(/^[-+]?[0-9]{1,7}(\.[0-9]+)?$/)
        ]
      ],

      status: [
        '', Validators.required
      ]

    });

    this.errorMessages = {
      provider: {
        required: 'The Name is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },
      address: {
        required: 'The address of the shop is required',
        minlength: 'Please provide at least 3 characters',
        maxlength: 'Please do not use more than 255 characters'
      },

      latitude: {
        pattern: 'Please enter a valid latitude format'
      },
      longitude: {
        pattern: 'Please enter a valid longitude format'
      }
    };

    this.shopForm.patchValue(new Shop());

    this.shopForm.valueChanges.subscribe(() => {
      this.errors = getErrors(this.shopForm, this.errorMessages);
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
    console.log('submitForm');
    this.globalError = null;
    const postData: RegisterShopRequest = {
      address: this.shopForm.value.address,
      latitude: this.shopForm.value.latitude,
      longitude: this.shopForm.value.longitude,
      provider: this.shopForm.value.provider,
      status: this.shopForm.value.status
    };

    this.loading = true;
    console.log('postData', postData);

    if (this.shopId !== 'add') {
      this.api.updateShop(this.partnerId, this.shopId, postData).subscribe(result => {
        this.loading = false;
        this.shopForm.reset();
        this.shopForm.patchValue(result);
      }, error => {
        console.log('error', error);
        this.globalError = error;
      });
    } else {
      this.api.registerShopByPartner(postData, this.partnerId).subscribe(result => {
        this.loading = false;
          this.router.navigate([this.gambitRoutes.shop(result.id.toString(), this.partnerId)])
      }, error => {
        console.log('postData', postData);
        this.loading = false;
        console.log('error', error);
        this.globalError = error;
      });


    }

  }

  submitAndCloseForm() {
    console.log('submitAndCloseForm');
    this.globalError = null;
    const postData: RegisterShopRequest = {
      address: this.shopForm.value.address,
      latitude: this.shopForm.value.latitude,
      longitude: this.shopForm.value.longitude,
      provider: this.shopForm.value.provider,
      status: this.shopForm.value.status
    };

    this.loading = true;
    console.log('postData', postData);

    if (this.shopId !== 'add') {
      this.api.updateShop(this.partnerId, this.shopId, postData).subscribe(result => {
        this.loading = false;
        this.router.navigate([this.gambitRoutes.shops(this.partnerId)]);
      }, error => {
        console.log('error', error);
        this.globalError = error;
      });
    } else {
      console.log('event else');
      this.api.registerShopByPartner(postData, this.partnerId).subscribe(result => {
        this.loading = false;
        this.router.navigate([this.gambitRoutes.shops(this.partnerId)]);
      }, error => {
        console.log('postData', postData);
        this.loading = false;
        console.log('error', error);
        this.globalError = error;
      });


    }

  }


}
