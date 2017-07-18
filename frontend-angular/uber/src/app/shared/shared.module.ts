import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalLayoutComponent } from './external-layout/external-layout.component';
import { InternalLayoutComponent } from './internal-layout/internal-layout.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExternalLayoutComponent, InternalLayoutComponent, TopNavComponent, ErrorComponent]
})
export class SharedModule { }
