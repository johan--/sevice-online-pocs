import { Component, OnInit } from '@angular/core';
import {HomeRoutesGenerator} from "../../app-routing.module";
import {Constants} from "../../../../constants";

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  homeRoute = HomeRoutesGenerator;

  routing = Constants.routing;

  constructor() { }

  ngOnInit() {
  }

}
