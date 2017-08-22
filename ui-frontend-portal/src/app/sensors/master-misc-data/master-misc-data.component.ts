import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherStation } from '../model/WeatherStation';
import { PersistenceApiService } from '../services/persistence-api.service';
import { City } from '../model/City';
import { MonitoredNodeTree } from '../model/MonitoredNodeTree';

@Component({
  selector: 'master-misc-data',
  templateUrl: './master-misc-data.component.html',
  styleUrls: ['./master-misc-data.component.scss']
})
export class MasterMiscDataComponent implements OnInit {

  @Output() onWeatherStationChanged = new EventEmitter<WeatherStation>();

  currentWeatherStation: WeatherStation = null;

  private weatherStations: WeatherStation[] = [];
  private weatherStationsByCityId: WeatherStation[] = [];

  private weatherStationsTree: MonitoredNodeTree[] = [];

  loadingWeatherStations = false;
  loadingWeatherStationsFailed: string = null;

  constructor(private api: PersistenceApiService) {
  }


  ngOnInit() {
    this.loadWeatherStation();
  }

  loadWeatherStation() {
    this.weatherStations = [];
    this.loadingWeatherStations = true;

    this.api.getWeatherStations().subscribe(weatherStations => {
      this.weatherStations = weatherStations as WeatherStation[];

      this.weatherStationsByCityId = this.weatherStations;

      this.loadingWeatherStations = false;
    }, (error) => {
      this.loadingWeatherStations = false;
      this.loadingWeatherStationsFailed = error.toString();
    });
  }

  getWeatherStations(): WeatherStation[] {
    return this.weatherStations;
  }

  toggleWeatherStation(weatherStation: WeatherStation) {
    if (this.currentWeatherStation === weatherStation) {
      this.currentWeatherStation = null;
    } else {
      this.currentWeatherStation = weatherStation;
    }

    this.onWeatherStationChanged.next(this.currentWeatherStation);
  }

  selectCity(city: City) {
    if (city.id === null) {
      this.weatherStationsByCityId = this.weatherStations;
    } else {
      this.weatherStationsByCityId = this.weatherStations.filter(weatherStations => weatherStations.cityId === city.id);
    }
    this.currentWeatherStation = null;
    this.onWeatherStationChanged.next(this.currentWeatherStation);
  }

}
