import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExternalLayoutComponent} from './shared/external-layout/external-layout.component';
import {InternalLayoutComponent} from './shared/internal-layout/internal-layout.component';
import {ErrorComponent} from './shared/error/error.component';

const routes: Routes = [
  {
    path: '',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
