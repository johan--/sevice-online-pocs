import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../auth/settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  zoomLevels = [];

  constructor(public settings: SettingsService) {
    for (let i = 1; i <= 20; i++) {
      this.zoomLevels.push(i);
    }
  }

  ngOnInit() {
  }

  setUnits(units: string) {
    this.settings.units = units;
  }

  setTemperatureUnit(unit: string) {
    this.settings.temperatureUnit = unit;
  }

  set initialZoom(value: string) {
    this.settings.map.initialZoom = parseInt(value, 10);
  }

  get initialZoom(): string {
    return this.settings.map.initialZoom.toString();
  }

  set nodeZoom(value: string) {
    this.settings.map.nodeZoom = parseInt(value, 10);
  }

  get nodeZoom(): string {
    return this.settings.map.nodeZoom.toString();
  }

}
