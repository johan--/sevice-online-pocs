import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserEditComponent} from "./user-edit/user-edit.component";
import {Constants} from "../../../constants";

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
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UberCoreRoutingModule { }
