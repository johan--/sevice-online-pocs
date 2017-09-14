import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserAuthService} from './user-auth.service';
import {Constants} from '../../../constants';

@Injectable()
export class UserRequiredGuard implements CanActivate {

  constructor(private router: Router,
              private authService: UserAuthService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkLogin(url: string) {
    return this.authService.isLoggedIn().map(isLoggedIn => {
      if (isLoggedIn) {
        return true
      } else {
        if (url !== Constants.routing.home) {
          this.authService.redirectUrl = url;
          console.log('set redirect url', url);
        }
        this.router.navigate([Constants.routing.userLogin]);

        return false;
      }
    }).catch((err) => {
      console.error('failed to check login', err);
      this.router.navigate([Constants.routing.error, 'loginCheckFailed']);
      return Observable.of(false);
    });
  }
}
