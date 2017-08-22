import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class SettingsService {

  rev: 0;

  /**
   * Map specific settings
   * @type {{}}
   */
  map = {
    initialZoom: 1,
    nodeZoom: 15,
  };

  /**
   * Metric or imperial
   * @type {string}
   */
  units = 'metric';

  /**
   * Unit for temperature
   * @type {string}
   */
  temperatureUnit = '°C';

  /**
   * Use 24h time format
   */
  time24hours: true;

  constructor(private localStorage: LocalStorageService) {
    const settings = localStorage.get('currentSettings') as SettingsService;
    console.log('saved settings: ', settings);
    if (settings) {
      Object.assign(this, settings);
    }
  }

}
