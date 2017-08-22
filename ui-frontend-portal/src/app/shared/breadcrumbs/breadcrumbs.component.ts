import {Component, Injector, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import {BreadcrumbsService} from './breadcrumbs.service';

interface Breadcrumb {
  title: string;
  urlSegments: Array<string>
}

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private breadcrumbsService: BreadcrumbsService,
              private injector: Injector) {
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      console.log('navigation end');
      this.identifyRoute();
    });
    this.activeRoute.url.subscribe((segments) => {
      segments.forEach(segment => {
        console.log('route url ', segment.path);
      });
    });
    this.breadcrumbsService.updateBreadcrumb.subscribe(() => {
      console.log('update breadcrumbs');
      this.identifyRoute();
    });
  }

  identifyRoute() {
    this.breadcrumbs = [];
    const path = ['/'];
    // Traverse route snapshots to get the breadcrumbs path
    for (let route = this.activeRoute.snapshot; route; route = route.firstChild) {
      if (route.outlet === 'primary') {
        path.push(...route.url.map(segment => segment.path));
      }
      if (route.outlet === 'primary' && route.data && route.data['title']) {
        const title = typeof(route.data['title']) === 'function' ?
          route.data['title'](route, this.breadcrumbsService.data, this.injector) : route.data['title'];
        if (title && title.length) {
          this.breadcrumbs.push({
            urlSegments: path.slice(0),
            title: title
          });
        }
      }
    }
    console.log('breadcrumb', this.breadcrumbs);

  }

  navigateTo(segments: Array<string>) {
    return this.router.navigate(segments);
  }


}
