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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [ExternalLayoutComponent, InternalLayoutComponent, TopNavComponent, ErrorComponent, MainDashboardComponent, FootNavComponent]
})
export class SharedModule { }
