import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalLayoutComponent } from './external-layout/external-layout.component';
import { InternalLayoutComponent } from './internal-layout/internal-layout.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { DaterangepickerDirective } from './directives/daterangepicker.directive';
import { UnitPipe } from './pipes/unit.pipe';
import { HistoricCountComponent } from './historic-count/historic-count.component';
import { ChartsModule } from 'ng2-charts';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BaseChartComponent } from './base-chart/base-chart.component';
import { OutletComponent } from './outlet/outlet.component';
import { LoadingComponent, LoadingDirective } from './directives/loading.directive';
import { PaginationComponent } from './pagination/pagination.component';
import { ConfirmationDialogComponent, ConfirmationDirective } from './directives/confirmation.directive';
import { FootNavComponent } from './foot-nav/foot-nav.component';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ChartsModule,
    LeafletModule
  ],
  declarations: [
    ExternalLayoutComponent,
    InternalLayoutComponent,
    TopNavComponent,
    ErrorComponent,
    EqualValidatorDirective,
    UnitPipe,
    DaterangepickerDirective,
    HistoricCountComponent,
    MainDashboardComponent,
    BreadcrumbsComponent,
    BaseChartComponent,
    OutletComponent,
    LoadingDirective,
    LoadingComponent,
    PaginationComponent,
    ConfirmationDirective,
    ConfirmationDialogComponent,
    FootNavComponent,
    MapComponent
  ],
  exports: [
    ExternalLayoutComponent,
    InternalLayoutComponent,
    EqualValidatorDirective,
    DaterangepickerDirective,
    UnitPipe,
    HistoricCountComponent,
    MainDashboardComponent,
    BaseChartComponent,
    OutletComponent,
    LoadingDirective,
    LoadingComponent,
    PaginationComponent,
    ConfirmationDirective,
    MapComponent
  ],
  entryComponents: [
    LoadingComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    UnitPipe
  ]
})
export class SharedModule {
}
