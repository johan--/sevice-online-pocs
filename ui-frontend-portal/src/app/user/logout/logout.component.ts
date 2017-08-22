import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../auth/user-auth.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: UserAuthService
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

}
