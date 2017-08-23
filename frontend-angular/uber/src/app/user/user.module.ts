import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { InfoComponent } from './info/info.component';
import { SettingsComponent } from './settings/settings.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule

  ],
  declarations: [LoginComponent, ChangePasswordComponent, ForgotPasswordComponent, LogoutComponent, InfoComponent, SettingsComponent, RegistrationComponent]
})
export class UserModule { }
