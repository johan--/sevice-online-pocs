import {Component, OnInit} from '@angular/core';
import {GambitRoutesGenerator} from '../gambit-routing.module';
import {GambitApiService} from '../services/gambit-api.service';
import {PageData} from '../../shared/pagination/pagination.component';
import {PagePartnerInfo} from '../model/PagePartnerInfo';
import {PartnerInfo} from '../model/PartnerInfo';
import {PartnerStatistic} from '../model/PartnerStatistic';
import {PageManageShopInfo} from '../model/PageManageShopInfo';


@Component({
  selector: 'partners-management',
  templateUrl: './partners-management.component.html',
  styleUrls: ['./partners-management.component.scss']
})
export class PartnersManagementComponent implements OnInit {

  gambitRoutes = GambitRoutesGenerator;

  pageData: PageData = {
    totalPages: 0,
    numberOfElements: 0,
    size: 20,
    totalElements: 0,
    number: 0
  };

  page = 0;
  size = 20;
  sort = 'name';
  search = '';

  list: PartnerInfo[];
  registeredShopCount: 0;
  shopsList: PageManageShopInfo;

  stats: { [partnerId: number]: PartnerStatistic } = {};

  loadingList = false;
  listError = null;

  loadingStats = false;
  statsError = null;

  pageSubscription = null;

  constructor(private api: GambitApiService) {
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.loadingList = true;
    this.listError = null;
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    this.pageSubscription = this.api.getPartners(this.page, this.size, this.sort, this.search)
      .subscribe((data: PagePartnerInfo) => {
        this.loadingList = false;
        console.log('loaded partners', data);
        this.pageData = new PageData(data);
        this.list = data.content;
        if (this.list.length) {
          this.loadStatistics();
        }
      }, error => {
        this.loadingList = false;
        this.listError = error;
      });
  }

  loadStatistics() {
    this.stats = {};
    if (!this.list.length) {
      return;
    }
    this.loadingStats = true;
    this.statsError = null;
    this.api.getPartnerStatistics(this.list.map(info => info.id)).subscribe((stats: PartnerStatistic[]) => {
      this.loadingStats = false;
      stats.forEach(stat => {
        this.stats[stat.partnerId] = stat;
      });
    }, error => {
      this.statsError = error;
      this.loadingStats = false;
    });

  }

  onNavigatePage(page: number) {
    console.log('navigate page', page);
    this.page = page;
    this.loadPage();
  }
}
