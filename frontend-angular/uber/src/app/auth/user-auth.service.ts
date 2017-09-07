import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {Constants} from "../../../constants";

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

  constructor(private router: Router,
              private http: Http) {
  }


  signUp(email: string, password: string) {
    return this.http.post('api-auth/account-users', {
      email: email,
      password: password
    }).map(res => res.json());
  }

}
