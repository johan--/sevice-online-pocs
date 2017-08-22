import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../constants';

interface LoginResponse {
  status: string,
  properties: { [key: string]: any; }
}
interface UiInfoResponse {
  apiUrl: string;
  loggedIn: boolean;
  properties: { [key: string]: any; }
}

export class LoginError extends Error {
  public status: string;
  public changePasswordToken: string;
  public details: any;

  constructor(message) {
    super(message);
  }
}

export class ChangePasswordError extends Error {
  public status: string;
  public failedChecks: Array<string>;

  constructor(message) {
    super(message);
  }
}

export class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}


@Injectable()
export class UserAuthService {

  uiInfo: UiInfoResponse = null;
  uiInfoObservable = null;

  appName = '';

  roles: Array<string> = [];
  permissions: Array<string> = [];

  redirectUrl: string;

  changePasswordToken: string = null;

  logoutTimeout = null;
  logoutTimeoutTimer = null;

  allow = {
    gambit: {
      adminDashboard: false,
      partnerDashboard: false,
      managePartners: false,
      manageOffers: false,
      manageShops: false,
      manageSetting: false
    },
    sensors: {
      dashboard: false,
      floodMonitoring: false
    }
  };

  constructor(private router: Router,
              private http: Http) {
  }

  login(name: string, password: string, imTid: string): Observable<UiInfoResponse> {
    return this.loginWithBackend(name, password, imTid).do(() => {
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = null;
        console.log('Login successful, redirect to redirect url');
      } else if (this.hasRole('DGS User')) {
        this.router.navigate([Constants.routing.sensorsDashboard]);
        console.log('Login successful, redirect to sensors dashboard');
      } else if (this.hasRole('Flood Monitoring User')) {
        this.router.navigate([Constants.routing.sensorsFloodMonDashboard]);
        console.log('Login successful, redirect to sensors dashboard');
      } else {
        this.router.navigate([Constants.routing.home]);
        console.log('Login successful, redirect to home');
      }

    });
  }

  loginWithBackend(name: string, password: string, imTid: string): Observable<UiInfoResponse> {
    return this.http.post('/api/v1/authentication/login', {
      username: name,
      password: password,
      imTid: imTid
    })
      .map(res => res.json() as LoginResponse)
      .mergeMap((result: LoginResponse) => {
        console.log('login result', result);
        if (result && (result.status === 'INITIAL_PASSWORD' || result.status === 'PASSWORD_EXPIRED')) {
          if (result.properties && result.properties['change_password_token']) {
            this.changePasswordToken = result.properties['change_password_token'];
            this.router.navigate([Constants.routing.changePassword]);
          }
        }
        if (!result || result.status !== 'OK') {
          const err = new LoginError('Login failed');
          err.status = result ? result.status : 'NETWORK';
          throw err;
        }
        return this.getUiInfo(true);
      });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post('/api/v1/authentication/password', {
      token: this.changePasswordToken,
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .map(res => res.json() as LoginResponse)
      .map(result => {
        if (!result || result.status !== 'OK') {
          const err = new ChangePasswordError('Password change failed');
          err.status = result ? result.status : 'NETWORK';
          if (result.properties['failedChecks']) {
            err.failedChecks = result.properties['failedChecks'];
          }
          throw err;
        }
        this.router.navigate([Constants.routing.home]);
      });

  }

  getUiInfo(invalidate = false) {
    if (this.uiInfoObservable && !invalidate) {
      return this.uiInfoObservable;
    }
    return this.uiInfoObservable = this.http.get('/api/v1/uiInfo')
      .map(res => res.json() as UiInfoResponse)
      .do(res => {
        console.log('uiInfo', res);
        this.parseUiInfo(res);
      }).catch(err => {
        this.uiInfoObservable = null;
        throw err;
      }).publishReplay(1).refCount();
  }

  parseUiInfo(info: UiInfoResponse) {
    if (!info.properties['appName']) {
      return;
    }
    const appName = info.properties['appName'];
    this.appName = appName;
    if (info.properties['roles'] && info.properties['roles'][appName]) {
      this.roles = info.properties['roles'][appName];
    } else {
      this.roles = [];
    }
    if (info.properties['permissions'] && info.properties['permissions'][appName]) {
      this.permissions = info.properties['permissions'][appName];
    } else {
      this.permissions = [];
    }
    this.checkAllowedFeatures();

    this.setupAutoLogout(info.properties['expiration']);
  }

  setupAutoLogout(expire: number) {
    if (!expire || this.logoutTimeout === expire) {
      return;
    }
    this.logoutTimeout = expire;
    if (this.logoutTimeoutTimer) {
      clearTimeout(this.logoutTimeoutTimer);
    } else {
      this.logoutTimeoutTimer = setTimeout(() => {
        this.getUiInfo(true).subscribe(info => {
          this.router.navigate([Constants.routing.userLogin]);
        });
      }, expire - (new Date().getTime()) + 1000);
    }
  }

  checkAllowedFeatures() {
    const perm = (permission) => this.hasPermission(permission);
    this.allow.gambit.adminDashboard = this.isGambitApp() && perm('VIEW_ADMIN_DASHBOARD');
    this.allow.gambit.partnerDashboard = this.isGambitApp() && perm('VIEW_PARTNER_DASHBOARD')
      && !perm('VIEW_ADMIN_DASHBOARD');
    this.allow.gambit.managePartners = this.isGambitApp() && perm('MANAGE_PARTNERS');
    this.allow.gambit.manageOffers = this.isGambitApp() && (perm('MANAGE_OFFERS_ALL') || perm('MANAGE_OFFERS_OWN'))
      && !perm('VIEW_ADMIN_DASHBOARD');
    this.allow.gambit.manageShops = this.isGambitApp() && (perm('MANAGE_OFFERS_ALL') || perm('MANAGE_OFFERS_OWN'))
      && !perm('VIEW_ADMIN_DASHBOARD');
    this.allow.gambit.manageSetting = this.isGambitApp() && (perm('MANAGE_OFFERS_ALL') || perm('MANAGE_OFFERS_OWN'))
      && !perm('VIEW_ADMIN_DASHBOARD');
    this.allow.sensors.dashboard = this.isSensorsApp() && this.hasPermission('VIEW_DASHBOARD');
    this.allow.sensors.floodMonitoring = this.isSensorsApp() && this.hasPermission('VIEW_FLOOD_MONITORING');

  }

  hasPermission(permissionName: string): boolean {
    return this.permissions.indexOf(permissionName) !== -1;
  }

  hasRole(roleName: string): boolean {
    return this.roles.indexOf(roleName) !== -1;
  }

  logout() {
    this.roles = [];
    this.permissions = [];

    return this.http.delete('/api/v1/authentication/login')
      .flatMap(res => this.getUiInfo(true))
      .toPromise()
      .then(() => {
        return this.router.navigate([Constants.routing.userLogin]);
      });
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUiInfo().map(info => info.loggedIn);
  }

  isSensorsApp() {
    return this.appName.match(/^.*-smart-city-portal$/);
  }

  isGambitApp() {
    return this.appName.match(/^.*-gambit-app$/);
  }

  canViewGambitAdminDashboard() {
    return this.isGambitApp() && this.hasPermission('VIEW_ADMIN_DASHBOARD');
  }

}
