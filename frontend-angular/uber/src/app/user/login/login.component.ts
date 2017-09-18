import {Component, OnInit} from '@angular/core';
import {Constants} from '../../../../constants';
import {LocalStorageService} from 'angular-2-local-storage';
import {ActivatedRoute, Router} from '@angular/router';
import {UserLogging} from '../../uber-core/model/UserLogging';
import {UserAuthService} from '../../auth/user-auth.service';
import {LoginRequest} from '../../uber-core/model/LoginRequest';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserLogging;

  failedToLogin: string = null;

  loading = false;

  routing = Constants.routing;

  signUp: boolean = null;

  email: string;

  loginRequest: LoginRequest;

  constructor(private localSt: LocalStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private userAuthService: UserAuthService,
              private localStorageService: LocalStorageService) {
    this.email = localStorageService.get('email') ? localStorageService.get('email').toString() : '';
  }

  ngOnInit() {

    this.signUp = this.route.snapshot.params['signUp'];

    console.log('signUp', this.signUp);
    console.log('failedToLogin', this.failedToLogin);

    this.user = {
      email: '',
      password: ''
    };

  }

  onSubmit(model: UserLogging, isValid: boolean) {
    if (isValid){
      this.loginRequest = {
        username: model.email,
        password: model.password
      };
      this.userAuthService.login(this.loginRequest.username, this.loginRequest.password)
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

  valueChange(newValue) {
    console.log(newValue);
    this.localStorageService.set('email', newValue);
    const settings = this.localStorageService.get('email');
    console.log('saved email: ', settings);
  }

}
