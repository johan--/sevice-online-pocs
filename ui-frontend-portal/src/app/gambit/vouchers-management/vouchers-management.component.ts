import {Component, OnInit} from '@angular/core';
import {GambitRoutesGenerator} from '../gambit-routing.module';
import {ActivatedRoute} from '@angular/router';
import {PageData} from '../../shared/pagination/pagination.component';
import {VoucherInfo} from '../model/VoucherInfo';
import {GambitApiService} from '../services/gambit-api.service';
import {VoucherRedeemedRequest} from '../model/VoucherRedeemedRequest';

@Component({
  selector: 'vouchers-management',
  templateUrl: './vouchers-management.component.html',
  styleUrls: ['./vouchers-management.component.scss']
})
export class VouchersManagementComponent implements OnInit {

  gambitRoutes = GambitRoutesGenerator;

  partnerId: string;
  partnerSecretCode: string;

  offerId: string;

  isRedeemed: VoucherRedeemedRequest = {
    redeemed: true
  }

  pageData: PageData = {
    totalPages: 0,
    numberOfElements: 0,
    size: 20,
    totalElements: 0,
    number: 0
  };

  page = 0;
  size = 20;
  sort = 'boughtAt';
  search = '';

  list: VoucherInfo[];
  loadingList = false;
  listError = null;
  pageSubscription = null;
  globalError: string = null;

  constructor(private route: ActivatedRoute,
              private api: GambitApiService) {
  }

  ngOnInit() {
    this.partnerId = this.gambitRoutes.findPartnerId(this.route) || '0';
    this.route.params.subscribe(params => {
      this.offerId = params['offerId'];
      this.loadPage();

    });

  }

  loadPage() {
    this.loadingList = true;
    this.listError = true;

    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    this.pageSubscription = this.api.getVouchers(this.partnerId, this.page, this.size, this.sort, this.offerId)
      .subscribe((data: VoucherInfo) => {
        this.loadingList = false;
        console.log('loaded vouchers', data);
        this.pageData = new PageData(data);
        this.list = data.content;
      }, error => {
        console.error('error', error);
        this.loadingList = false;
        this.listError = error;
      });

  }


  redeemVoucher(voucherCode: String) {
      this.api.redeemVoucher(voucherCode, this.partnerId, this.isRedeemed).subscribe(voucher => {
         this.loadPage();
      }, error => {
        this.globalError = error;
      });
  };

  onNavigatePage(page: number) {
    this.page = page;
    this.loadPage();
  }

}

