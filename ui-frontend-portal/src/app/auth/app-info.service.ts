import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AppInfo} from '../gambit/model/AppInfo';


@Injectable()
export class AppInfoService {

  baseUrl = '/api';

  constructor(private http: Http) { }

  getBackendInfo(): Observable<AppInfo> {
    return this.http.get(this.baseUrl + '/info').map(res => res.json());
  }

  getFrontendVersion(): Observable<string> {
    return this.http.get('/package.json').map(res => res.json());
  }

}
