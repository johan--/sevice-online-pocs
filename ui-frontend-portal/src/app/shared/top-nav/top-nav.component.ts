import { Component, OnInit } from '@angular/core';
import {Constants} from '../../../constants';
import {UserAuthService} from '../../auth/user-auth.service';
//import {GambitRoutesGenerator} from '../../gambit/gambit-routing.module';
import {HomeRoutesGenerator} from '../../app-routing.module';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  homeRoute = HomeRoutesGenerator;

  isCollapsed = true;

  routing = Constants.routing;

  constructor(
    public authService: UserAuthService
  ) { }

  ngOnInit() {
  }

}
