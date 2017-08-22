import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../auth/user-auth.service';
import {Constants} from '../../../constants';

@Component({
  selector: 'main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  routing = Constants.routing;

  constructor(
    public authService: UserAuthService
  ) { }

  ngOnInit() {
  }

}
