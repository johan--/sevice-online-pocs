import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserAuthService} from '../../auth/user-auth.service';
import {Constants} from '../../../constants';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = {
    name: '',
    password: '',
    imTid: '',
  };

  failedToLogin: string = null;

  loading = false;

  routing = Constants.routing;

  constructor(private route: ActivatedRoute,
              private userAuth: UserAuthService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['imtid']) {
        this.model.imTid = params['imtid'];
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.userAuth.login(this.model.name, this.model.password, this.model.imTid)
      .subscribe(() => {
          this.loading = false;
        },
        e => {
          if (!e.status) {
            this.failedToLogin = 'Unknown error';
          } else {
            this.failedToLogin = e.status;
          }
          this.loading = false;
        });
  }

}
