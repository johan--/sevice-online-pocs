import {Component, OnInit, Input} from '@angular/core';
import {Constants} from '../../../constants';

@Component({
  selector: 'widget-alarm',
  templateUrl: './widget-alarm.component.html',
  styleUrls: ['./widget-alarm.component.scss']
})
export class WidgetAlarmComponent implements OnInit {

  routing = Constants.routing;

  @Input() label = '';
  @Input() subLabel = '';

  constructor() { }

  ngOnInit() {
  }

  navigateToDetails() {

  }

}
