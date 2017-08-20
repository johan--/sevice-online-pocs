import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalLayoutComponent } from './external-layout/external-layout.component';
import { InternalLayoutComponent } from './internal-layout/internal-layout.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ErrorComponent } from './error/error.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import { FootNavComponent } from './foot-nav/foot-nav.component';
import {UberCoreModule} from "../uber-core/uber-core.module";
import { DateTimeRangePickerComponent } from './date-time-range-picker/date-time-range-picker.component';
import {DateTimeRangePickerDirective} from "./date-time-range-picker/date-time-range-picker.directive";
import {DateTimeRangeValidatorDirective} from "./date-time-range-picker/date-time-range-validator.directive";
import {FormsModule} from "@angular/forms";
import { DurationPipe } from './pipes/duration.pipe';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    ExternalLayoutComponent,
    InternalLayoutComponent,
    TopNavComponent,
    ErrorComponent,
    MainDashboardComponent,
    FootNavComponent,
    DateTimeRangePickerComponent,
    DateTimeRangePickerDirective,
    DateTimeRangeValidatorDirective,
    DurationPipe,
  ],
  entryComponents: [
    DateTimeRangePickerComponent
  ],
  exports: [
    DateTimeRangePickerComponent,
    DateTimeRangePickerDirective,
    DateTimeRangeValidatorDirective,
    DurationPipe,
  ]
})
export class SharedModule { }
