import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserEditComponent} from "./user-edit/user-edit.component";
import {Constants} from "../../../constants";
import {ServiceEditComponent} from "./service-edit/service-edit.component";
import {TimePlanningComponent} from "./time-planning/time-planning.component";
import {RechercheEditComponent} from "./recherche-edit/recherche-edit.component";

export const UberRoutesGenerator = {

  profileInfo: function () {
    return Constants.routing.profileSetting;
  }
}

export const routes: Routes = [
  {
    path: 'profile-setting',
    data: {
      title: 'Profile Setting'
    },
    children: [
      {
        path:'',
        component: UserEditComponent,
        data: {
          title: 'Profile Overview'
        }
      }
    ]
  },
  {
    path: 'recherche-edit',
    data: {
      title: 'Recherche Edit'
    },
    children: [
      {
        path:'',
        component: RechercheEditComponent,
        data: {
          title: 'Recherche Overview'
        }
      }
    ]
  },
  {
    path: 'time-planing',
    data: {
      title: 'Time Planning'
    },
    children: [
      {
        path:'',
        component: TimePlanningComponent,
        data: {
          title: 'Planning Overview'
        }
      }
    ]
  },
  {
    path: 'service-edit',
    data: {
      title: 'Service Editing'
    },
    children: [
      {
        path:'',
        component: ServiceEditComponent,
        data: {
          title: 'Service Overview'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UberCoreRoutingModule { }
