import {Component, OnInit, Input} from '@angular/core';
import {Constants} from '../../../constants';
import {Router} from '@angular/router';

@Component({
  selector: 'widget-camera-data',
  templateUrl: './widget-camera-data.component.html',
  styleUrls: ['./widget-camera-data.component.scss']
})
export class WidgetCameraDataComponent implements OnInit {

  routing = Constants.routing;

  @Input() chartType = '';
  @Input() label = '';
  @Input() subLabel = '';
  @Input() risk = 'low';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToDetails() {
    this.router.navigate([this.routing.sensorsFloodMonDashboard, 'neckar']);
  }

}
