import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GambitRoutingModule } from './gambit-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { VisitorsMapComponent } from './visitors-map/visitors-map.component';
import { GambitApiService } from './services/gambit-api.service';
import { PartnersManagementComponent } from './partners-management/partners-management.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRowComponent } from './form-row/form-row.component';
import { OffersManagementComponent } from './offers-management/offers-management.component';
import { OfferEditComponent } from './offer-edit/offer-edit.component';
import { VouchersManagementComponent } from './vouchers-management/vouchers-management.component';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard.component';
import { ChartDataService } from './services/chart-data.service';
import { AdminGuard } from './services/admin.guard';
import { ShopManagementComponent } from './shop-management/shop-management.component';
import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { PartnerSettingComponent } from './partner-setting/partner-setting.component';


@NgModule({
  imports: [
    CommonModule,
    GambitRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminDashboardComponent,
    VisitorsMapComponent,
    PartnersManagementComponent,
    PartnerEditComponent,
    FormRowComponent,
    OffersManagementComponent,
    OfferEditComponent,
    VouchersManagementComponent,
    PartnerDashboardComponent,
    ShopManagementComponent,
    ShopEditComponent,
    PartnerSettingComponent
  ],
  providers: [
    GambitApiService,
    ChartDataService,
    AdminGuard
  ],
})
export class GambitModule {
}
