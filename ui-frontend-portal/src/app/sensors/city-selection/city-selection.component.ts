import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersistenceApiService } from '../services/persistence-api.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { City } from '../model/City';

@Component({
  selector: 'city-selection',
  templateUrl: './city-selection.component.html',
  styleUrls: ['./city-selection.component.scss']
})
export class CitySelectionComponent implements OnInit {

  storageCityKey = 'currentSelectedCity';

  currentCity: City = null;

  cities: City[] = [];

  @Output() cityChanged = new EventEmitter<City>();

  loadingCities = false;
  loadingCitiesFailed: string = null;

  constructor(private api: PersistenceApiService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {

    this.loadingCities = true;
    const savedTreeCityId = this.localStorage.get(this.storageCityKey);

    this.api.getCities().subscribe(cities => {
      cities.unshift({id: null, name: 'All Cities'});

      if (savedTreeCityId && cities && cities.length) {
        this.currentCity = cities.find(City => City.id === savedTreeCityId) || this.currentCity;
      }
      if (!this.currentCity && cities && cities.length) {
        this.currentCity = cities[0];
      }
      console.log('cities', cities);
      this.cities = cities;
      this.loadingCities = false;


      if (!this.cities) {
        this.loadingCitiesFailed = 'No Cities found';
      }

      this.cityChanged.next(this.currentCity);

    }, (error) => {
      this.loadingCities = false;
      this.loadingCitiesFailed = error.toString();
    });
  }

  selectCity(city: City) {
    if (this.currentCity !== city) {
      this.currentCity = city;
      this.localStorage.set(this.storageCityKey, city.id);
      this.cityChanged.next(city);
    }
  }

}
