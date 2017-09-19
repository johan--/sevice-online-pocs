import {Component, HostListener, OnInit} from '@angular/core';
import {Constants} from '../../../../constants';
import {LocalStorageService} from 'angular-2-local-storage';
import {ActivatedRoute, Router} from '@angular/router';
import {UserLogging} from '../../uber-core/model/UserLogging';
import {UserAuthService} from '../../auth/user-auth.service';
import {LoginRequest} from '../../uber-core/model/LoginRequest';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: UserLogging;

  failedToLogin: string = null;

  loading = false;

  routing = Constants.routing;

  signUp: boolean = null;

  email: string;
  password: string;

  loginRequest: LoginRequest;

  constructor(private localSt: LocalStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private userAuthService: UserAuthService,
              private localStorageService: LocalStorageService) {
    this.email = localStorageService.get('email') ? localStorageService.get('email').toString() : '';
    this.password = localStorageService.get('password') ? localStorageService.get('password').toString() : '';
  }

  ngOnInit() {

    this.signUp = this.route.snapshot.params['signUp'];

    console.log('signUp', this.signUp);
    console.log('failedToLogin', this.failedToLogin);

    this.user = {
      email: this.email,
      password: this.password
    };

  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(e: Event): void {
    console.log('scrolled');
  }

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(e) {
    alert(`I'm leaving the app!`);
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(e) {
    alert(`I'm leaving the app!`);
  }

  doSomething() {
    alert('event');
    console.log('event', event)
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
            console.log('e', e);
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
    this.localStorageService.set('email', newValue);
    const settings = this.localStorageService.get('email');
  }

}
