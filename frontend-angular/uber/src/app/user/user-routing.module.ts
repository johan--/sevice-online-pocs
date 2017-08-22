import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AlreadyLoggedInGuard} from "../../../../../ui-frontend-portal/src/app/auth/already-logged-in.guard";
import {LogoutComponent} from "./logout/logout.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {InfoComponent} from "./info/info.component";
import {UserRequiredGuard} from "../../../../../ui-frontend-portal/src/app/auth/user-required.guard";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [],
    data: {
      title: 'Login'
    }
  },
  {
    path: 'logout',
    data: {
      title: 'Logout'
    },
    component: LogoutComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    data: {
      title: 'Change password'
    }
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot password'
    }
  },
  {
    path: 'info',
    component: InfoComponent,
    canActivate: [UserRequiredGuard],
    data: {
      title: 'User Info'
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [UserRequiredGuard],
    data: {
      title: 'User Settings'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
