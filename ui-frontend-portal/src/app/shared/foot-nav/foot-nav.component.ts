import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants';
import {AppInfoService} from '../../auth/app-info.service';
import {AppInfo} from '../../gambit/model/AppInfo';
import { environment } from '../../../environments/environment.prod';



@Component({
  selector: 'foot-nav',
  templateUrl: './foot-nav.component.html',
  styleUrls: ['./foot-nav.component.scss']
})
export class FootNavComponent implements OnInit {

  routing = Constants.routing;
  backendAppInfo: AppInfo;
  frontendAppVersion: string;
  errors: {[name: string]: Array<string>} = {};
  globalError: string = null;
  loading = false;


  constructor(
    private appInfoService: AppInfoService
  ) { }

  ngOnInit() {
    this.getBackendAppInfo();
  }

  getBackendAppInfo() {
    this.appInfoService.getBackendInfo().subscribe(info => {
      this.loading = false;
      console.log('loaded info applicationName', info);
      this.backendAppInfo = info;
    }, error => {
      this.loading = false;
      this.globalError = error;
      console.log('Error', error);
    });
  }

}
