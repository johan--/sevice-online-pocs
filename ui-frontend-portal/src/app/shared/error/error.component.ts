import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Constants} from '../../../constants';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  error = 'resourceNotFound';
  errorDetail = 'Unknown error';
  timeStamp = '';

  routing = Constants.routing;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['error']) {
        this.error = params['error'];
      }
      if (Constants.errors[this.error]) {
        this.errorDetail = Constants.errors[this.error];
      }
      console.log('error params', params, this.route);
    });
    const now = new Date();
    this.timeStamp = now.toISOString();
  }

}
