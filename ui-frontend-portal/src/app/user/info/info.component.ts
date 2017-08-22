import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../auth/user-auth.service';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(
    public authService: UserAuthService
  ) { }

  ngOnInit() {
  }

}
