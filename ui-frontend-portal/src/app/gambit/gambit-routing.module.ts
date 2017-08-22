import {Injector, NgModule, ReflectiveInjector} from '@angular/core';
import {Routes, RouterModule, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {PartnersManagementComponent} from './partners-management/partners-management.component';
import {PartnerEditComponent} from './partner-edit/partner-edit.component';
import {OutletComponent} from '../shared/outlet/outlet.component';
import {OffersManagementComponent} from './offers-management/offers-management.component';
import {VouchersManagementComponent} from './vouchers-management/vouchers-management.component';
import {OfferEditComponent} from './offer-edit/offer-edit.component';
import {Constants} from '../../constants';
import {PartnerDashboardComponent} from './partner-dashboard/partner-dashboard.component';
import {AdminGuard} from './services/admin.guard';
import {ShopManagementComponent} from './shop-management/shop-management.component';
import {ShopEditComponent} from './shop-edit/shop-edit.component';
import {PartnerSettingComponent} from './partner-setting/partner-setting.component';
import {GambitApiService} from './services/gambit-api.service';
import {BreadcrumbsService} from '../shared/breadcrumbs/breadcrumbs.service';

export function getPartnerNodeTitle(route: ActivatedRouteSnapshot, data: any, pInjector: Injector) {
  console.log('getPartnerNodeTitle', route);

  if (route.params['partnerId'] !== 'add') {
    const injector = ReflectiveInjector.resolveAndCreate([GambitApiService], pInjector);
    const gambitApi = injector.get(GambitApiService);
    const breadcrumbService = injector.get(BreadcrumbsService);
    if (route.params['partnerId'] !== breadcrumbService.data['partnerId']) {
      breadcrumbService.data['partnerId'] = route.params['partnerId'];
      gambitApi.getPartner(route.params['partnerId']).subscribe(partner => {
        breadcrumbService.data['partnerName'] = partner.name;
        breadcrumbService.update();
      });
    }
    if (data['partnerName']) {
      return data['partnerName'];
    }
  }

  return route.params['partnerId'] !== 'add' ? 'Partner ' + route.params['partnerId'] : null;
}

export const GambitRoutesGenerator = {
  partners: function () {
    return Constants.routing.gambitPartners;
  },
  partner: function (partnerId: string) {
    return Constants.routing.gambitPartners + '/' + partnerId;
  },
  offers: function (partnerId: string = null) {
    if (partnerId && partnerId !== '0') {
      return Constants.routing.gambitPartners + '/' + partnerId + '/offers';
    } else {
      return Constants.routing.gambitOffers;
    }
  },
  offer: function (offerId: string, partnerId: string = null) {
    if (partnerId && partnerId !== '0') {
      return Constants.routing.gambitPartners + '/' + partnerId + '/offers/' + offerId;
    } else {
      return Constants.routing.gambitOffers + '/' + offerId;
    }
  },
  shops: function (partnerId: string = null) {
    if (partnerId && partnerId !== '0') {
      return Constants.routing.gambitPartners + '/' + partnerId + '/shops/';
    } else {
      return Constants.routing.gambitShops;
    }

  },

  shop: function (shopId: string, partnerId: string = null) {
    if (partnerId && partnerId !== '0') {
      return Constants.routing.gambitPartners + '/' + partnerId + '/shops/' + shopId;
    } else {
      return Constants.routing.gambitShops + '/' + shopId;
    }
  },

  vouchers: function (offerId: string, partnerId: string = null) {
    if (partnerId && partnerId !== '0') {
      return Constants.routing.gambitPartners + '/' + partnerId + '/offers/' + offerId + '/vouchers';
    } else {
      return Constants.routing.gambitOffers + '/' + offerId + '/vouchers';
    }
  },
  findPartnerId: function (route: ActivatedRoute) {
    for (let r = route; r != null; r = r.parent) {
      if (r.snapshot && r.snapshot.params && r.snapshot.params['partnerId']) {
        return r.snapshot.params['partnerId'];
      }
    }
    return null;
  }
};


const offersRoutes = [
  {
    path: '',
    component: OffersManagementComponent,
    data: {
      title: 'Overview'
    }
  },
  {
    path: ':offerId',
    component: OfferEditComponent,
    data: {
      title: 'Offer'
    }
  },
  {
    path: ':offerId/vouchers',
    component: VouchersManagementComponent,
    data: {
      title: 'Vouchers'
    }
  }
];
const shopsRoutes = [
  {
    path: '',
    component: ShopManagementComponent,
    data: {
      title: 'Overview'
    }
  },
  {
    path: ':shopId',
    component: ShopEditComponent,
    data: {
      title: 'Shop'
    }
  },
];
export const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'partner/dashboard',
    component: PartnerDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'partners',
    component: OutletComponent,
    data: {
      title: 'Partners Management'
    },
    children: [
      {
        path: '',
        component: PartnersManagementComponent,
        data: {
          title: 'Overview'
        }
      },
      {
        path: ':partnerId',
        component: OutletComponent,
        data: {
          title: getPartnerNodeTitle
        },
        children: [
          {
            path: '',
            component: PartnerEditComponent,
            data: {
              title: 'Partner'
            }
          },
          {
            path: 'offers',
            component: OutletComponent,
            children: offersRoutes,
            data: {
              title: 'Offers'
            }
          },
          {
            path: 'shops',
            component: OutletComponent,
            children: shopsRoutes,
            data: {
              title: 'Shops'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'offers',
    component: OutletComponent,
    data: {
      title: 'Offer Management'
    },
    children: offersRoutes
  },
  {
    path: 'partner-setting',
    component: PartnerSettingComponent,
    data: {
      title: 'Settings'
    }
  },
  {
    path: 'shops',
    component: OutletComponent,
    data: {
      title: 'Shops Management'
    },
    children: shopsRoutes
  },
  {
    path: '',
    redirectTo: 'admin/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GambitRoutingModule {
}
