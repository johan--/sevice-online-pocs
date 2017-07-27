import { Component, OnInit } from '@angular/core';

import {Constants} from "../../../../constants";

@Component({
  selector: 'main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  routing = Constants.routing;





  constructor() {

  }

  ngOnInit() {

  }

}
