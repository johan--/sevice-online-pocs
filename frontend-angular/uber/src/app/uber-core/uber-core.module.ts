import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UberCoreRoutingModule } from './uber-core-routing.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import {Constants} from "../../../constants";
import {Routes} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    UberCoreRoutingModule
  ],
  declarations: [UserEditComponent]
})



export class UberCoreModule { }
