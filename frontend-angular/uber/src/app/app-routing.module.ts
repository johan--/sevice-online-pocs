import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExternalLayoutComponent} from './shared/external-layout/external-layout.component';
import {InternalLayoutComponent} from './shared/internal-layout/internal-layout.component';
import {ErrorComponent} from './shared/error/error.component';
import {Constants} from '../../constants';
import {MainDashboardComponent} from './shared/main-dashboard/main-dashboard.component';
import {UserRequiredGuard} from './auth/user-required.guard';

export const HomeRoutesGenerator = {
  home: function () {
    return Constants.routing.home;
  }
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: InternalLayoutComponent,
    canActivate: [UserRequiredGuard],
    children: [
      {
        path: 'home',
        component: MainDashboardComponent,
        data: {
          title: 'Home'
        }
      },

      {
        path: 'uber',
        loadChildren:'app/uber-core/uber-core.module#UberCoreModule',
        data: {
          title: 'Uber'
        }
      },
      {
        path: 'user-internal',
        loadChildren: 'app/user/user.module#UserModule',
        data: {
          title: 'User'
        }
      }
    ]
  },
  {
    path: '',
    component: ExternalLayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: 'app/user/user.module#UserModule',
      },
      {
        path: 'error/:error',
        component: ErrorComponent
      },
      {
        path: '**',
        component: ErrorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
