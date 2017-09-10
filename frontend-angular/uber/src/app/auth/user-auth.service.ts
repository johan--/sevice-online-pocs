import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {Constants} from "../../../constants";
import {SignUp} from "../uber-core/model/SignUp";
import {SignUpRequest} from "../uber-core/model/SignUpRequest";

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
  urlPrefix: string;

  constructor(private router: Router,
              private http: Http) {
    this.http = http
    this.urlPrefix = 'http://localhost:8000/'
  }


  signUp(signUpRequest:SignUpRequest) {
    console.log('signUp', (this.urlPrefix+"api-auth/account-users"));
    return this.http.post((this.urlPrefix+"api-auth/account-users"), signUpRequest).map(res => res.json());
  }

}
