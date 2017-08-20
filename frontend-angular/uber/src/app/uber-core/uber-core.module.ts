import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UberCoreRoutingModule } from './uber-core-routing.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRowComponent } from './form-row/form-row.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { TimePlanningComponent } from './time-planning/time-planning.component';
import { RechercheEditComponent } from './recherche-edit/recherche-edit.component';
import { SharedModule } from "../shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UberCoreRoutingModule,
    NgbModule,
    ReactiveFormsModule

  ],
  declarations: [
    UserEditComponent,
    ServiceEditComponent,
    TimePlanningComponent,
    RechercheEditComponent,
    FormRowComponent
  ]
})



export class UberCoreModule { }
