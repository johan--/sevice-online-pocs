import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, CookieXSRFStrategy, XSRFStrategy } from '@angular/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserAuthService } from './auth/user-auth.service';
import { SettingsService } from './auth/settings.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import {BreadcrumbsService} from './shared/breadcrumbs/breadcrumbs.service';
import {AppInfoService} from './auth/app-info.service';

export function cookieXSRFStrategyFactory() {
  return new CookieXSRFStrategy('XSRF-TOKEN', 'X-XSRF-TOKEN');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    AuthModule,
    LocalStorageModule.withConfig({prefix: 'sc', storageType: 'sessionStorage'}),
  ],
  providers: [
    UserAuthService,
    SettingsService,
    BreadcrumbsService,
    AppInfoService,
    {provide: XSRFStrategy, useFactory: cookieXSRFStrategyFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
