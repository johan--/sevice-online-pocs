import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../../../constants';

@Component({
  selector: 'flood-mon-dashboard',
  templateUrl: './flood-mon-dashboard.component.html',
  styleUrls: ['./flood-mon-dashboard.component.scss']
})
export class FloodMonDashboardComponent implements OnInit {

  routing = Constants.routing;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToDetails() {
    this.router.navigate([this.routing.sensorsFloodMonDashboard, 'neckar']);
  }
}
