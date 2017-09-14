import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {InfoComponent} from "./info/info.component";
import {SettingsComponent} from "./settings/settings.component";
import {RegistrationComponent} from "./registration/registration.component";
import {UserRequiredGuard} from '../auth/user-required.guard';
import {AlreadyLoggedInGuard} from '../auth/already-logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AlreadyLoggedInGuard],
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
    path: 'signUp',
    data: {
      title: 'signUp'
    },
    component: RegistrationComponent
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
