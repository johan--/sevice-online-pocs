import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../constants";
import {Router} from "@angular/router";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  model = {
    email: '',
    newPassword1: '',
    newPassword2:''
  };

  failedToChange: string = null;
  failedChecks: Array<string> = [];

  loading = false;

  routing = Constants.routing;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

}
