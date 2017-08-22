import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GambitRoutesGenerator} from '../gambit-routing.module';
import {PageData} from '../../shared/pagination/pagination.component';
import {ManageOfferInfo} from '../model/ManageOfferInfo';
import {GambitApiService} from '../services/gambit-api.service';
import {OfferStatistic} from '../model/OfferStatistic';

@Component({
  selector: 'offers-management',
  templateUrl: './offers-management.component.html',
  styleUrls: ['./offers-management.component.scss']
})
export class OffersManagementComponent implements OnInit {

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
  sort = 'title';
  search = '';

  partnerId: string;
  offerId: string;

  list: ManageOfferInfo[];
  stats: { [partnerId: number]: OfferStatistic } = {};
  loadingList = false;
  listError = null;
  pageSubscription = null;
  statsError = null;
  loadingStats = false;


  constructor(private route: ActivatedRoute,
              private api: GambitApiService) {
  }

  ngOnInit() {
    this.partnerId = this.gambitRoutes.findPartnerId(this.route) || '0';
    this.loadPage();
  }

  loadPage() {
    this.loadingList = true;
    this.listError = null;
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    this.pageSubscription = this.api.getOffersFromPartnerId(this.partnerId, this.page, this.size, this.sort)
      .subscribe((data: ManageOfferInfo) => {
        this.loadingList = false;
        console.log('loaded offers', data);
        this.pageData = new PageData(data);
        this.list = data.content;
        if (this.list.length) {
          this.loadOffersStatistics();
        }
      }, error => {
        this.loadingList = false;
        this.listError = error;
        console.error('error', error);
      });
  }

  loadOffersStatistics() {
    this.loadingList = true;
    this.statsError = null;
    this.api.getOffersStatistics(this.partnerId, this.list.map(info => info.id))
      .subscribe((stats: OfferStatistic[]) => {
        this.loadingStats = false;
        stats.forEach(stat => {
          this.stats[stat.offerId] = stat
        });
      }, error => {
        console.error('error', error);
        this.statsError = error;
        this.loadingStats = false;
      });

  }

  onNavigatePage(page: number) {
    this.page = page;
    this.loadPage();
  }

}
