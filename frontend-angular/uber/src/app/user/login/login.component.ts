import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../constants";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = {
    email: '',
    password: '',
  };

  failedToLogin: string = null;

  loading = false;

  routing = Constants.routing;

  constructor() { }

  ngOnInit() {
  }

}
