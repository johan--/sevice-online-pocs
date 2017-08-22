import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GambitRoutesGenerator } from '../gambit-routing.module';
import { PageData } from '../../shared/pagination/pagination.component';
import { GambitApiService } from '../services/gambit-api.service';
import { ManageShopInfo } from '../model/ManageShopInfo';
import { PageManageShopInfo } from '../model/PageManageShopInfo';

@Component({
  selector: 'shop-management',
  templateUrl: './shop-management.component.html',
  styleUrls: ['./shop-management.component.scss']
})
export class ShopManagementComponent implements OnInit {

  gambitRoutes = GambitRoutesGenerator;

  pageData: PageData = {
    totalPages: 0,
    numberOfElements: 0,
    size: 20,
    totalElements: 0,
    number: 0
  };

  page = 0;
  size = 10;
  sort = 'address';
  search = '';

  partnerId: string;
  shopId: string;

  list: ManageShopInfo[];
  loadingList = false;
  listError = null;
  pageSubscription = null;


  constructor(private route: ActivatedRoute,
              private api: GambitApiService) {

  }

  ngOnInit() {
    this.partnerId = this.gambitRoutes.findPartnerId(this.route) || '0';
    this.route.params.subscribe(params => {
      this.shopId = params['shopId'];
      this.loadPage();
    });
  }

  loadPage() {
    this.loadingList = true;
    this.listError = null;
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    this.pageSubscription = this.api.getShopsFromPartnerId(this.partnerId, this.page, this.size, this.sort)
      .subscribe((data: PageManageShopInfo) => {
        this.loadingList = false;
        console.log('loaded shops', data);
        this.pageData = new PageData(data);
        this.list = data.content;

      }, error => {
        this.loadingList = false;
        this.listError = error;
        console.error('error', error);
      });
  }

  onNavigatePage(page: number) {
    this.page = page;
    this.loadPage();
  }

}
