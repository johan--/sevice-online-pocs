import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAuthService } from './user-auth.service';
import { Constants } from '../../constants';

@Injectable()
export class AlreadyLoggedInGuard implements CanActivate {
    constructor(private router: Router,
                private authService: UserAuthService) {

    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isLoggedIn().map(isLoggedIn => {
            console.log('isLoggedIn check', isLoggedIn);
            if (isLoggedIn) {
                this.router.navigate([Constants.routing.home]);
                return false;
            } else {
                return true;
            }
        }).catch((err) => {
            console.error('failed to check login', err);
            this.router.navigate([Constants.routing.error, 'loginCheckFailed']);
            return Observable.of(false);
        });
    }
}
