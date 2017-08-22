import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserAuthService} from '../../auth/user-auth.service';
import {Constants} from '../../../constants';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  model = {
    oldPassword: '',
    newPassword1: '',
    newPassword2: '',
  };

  failedToChange: string = null;
  failedChecks: Array<string> = [];

  loading = false;

  routing = Constants.routing;

  constructor(
    private authService: UserAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.authService.changePasswordToken) {
      this.router.navigate([Constants.routing.home]);
    }
  }

  onSubmit() {
    this.loading = true;
    this.authService.changePassword(this.model.oldPassword, this.model.newPassword1)
      .subscribe(() => {
          this.loading = false;
        },
        e => {
          this.failedToChange = e.status;
          if (e.failedChecks) {
            this.failedChecks = e.failedChecks;
          } else {
            this.failedChecks = [];
          }
          this.loading = false;
        });
  }

}
