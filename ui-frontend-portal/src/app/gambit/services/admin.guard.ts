import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserAuthService} from '../../auth/user-auth.service';
import {Constants} from '../../../constants';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
              private authService: UserAuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

  checkLogin() {
    return this.authService.isLoggedIn().map(isLoggedIn => {
      if (isLoggedIn && this.authService.allow.gambit.adminDashboard) {
        return true
      } else {
        this.router.navigate([Constants.routing.gambitPartnerDashboard]);
        return false;
      }
    }).catch((err) => {
      console.error('failed to check login', err);
      this.router.navigate([Constants.routing.error, 'loginCheckFailed']);
      return Observable.of(false);
    });
  }
}
