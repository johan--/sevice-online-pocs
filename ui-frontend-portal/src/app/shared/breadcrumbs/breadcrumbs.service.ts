import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BreadcrumbsService {

  updateBreadcrumb = new Subject();

  data: any = {};

  constructor() {
    console.log('init breadcrumbs service');
  }

  update() {
    console.log('start update');
    this.updateBreadcrumb.next();
  }

}
