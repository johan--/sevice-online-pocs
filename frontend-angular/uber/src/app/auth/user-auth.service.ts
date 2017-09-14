import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import {Constants} from "../../../constants";
import {SignUp} from "../uber-core/model/SignUp";
import {SignUpRequest} from "../uber-core/model/SignUpRequest";
import {LoginRequest} from '../uber-core/model/LoginRequest';

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

  baseUrl = '/manage';

  uiInfo: UiInfoResponse = null;
  uiInfoObservable = null;

  appName = '';

  roles: Array<string> = [];
  permissions: Array<string> = [];

  redirectUrl: string;

  changePasswordToken: string = null;

  logoutTimeout = null;

  logoutTimeoutTimer = null;

  urlPrefix: string;

  constructor(private router: Router,
              private http: Http) {
    this.http = http;
    this.urlPrefix = 'http://localhost:7000/'
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


    this.setupAutoLogout(info.properties['expiration']);
  }


  signUp(signUpRequest:SignUpRequest) {
    console.log('signUp', (this.baseUrl+"/api-auth/account-users"));
    return this.http.post((this.baseUrl+"/api-auth/account-users"), signUpRequest).map(res => res.json());
  }

  login(loginRequest:LoginRequest) {
    console.log('signUp', (this.urlPrefix+"api-auth/account-users"));
    return this.http.post((this.urlPrefix+"api-auth/account-users"), loginRequest).map(res => res.json());
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUiInfo().map(info => info.loggedIn);
  }


}
