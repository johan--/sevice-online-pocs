import {Component, OnInit} from '@angular/core';
import {Constants} from '../../../../constants';
import {LocalStorage, LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @LocalStorage('variable', 'default value')
  model = {
    email: '',
    password: '',
  };

  failedToLogin: string = null;

  loading = false;

  routing = Constants.routing;

  constructor(
    private localSt:LocalStorageService
  ) {
  }

  ngOnInit() {
    this.localSt.observe('variable')
      .subscribe((value) => console.log('new value', value));
  }

}
