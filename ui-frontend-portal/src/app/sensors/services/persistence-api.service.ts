import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../model/User';
import { Group } from '../model/Group';
import { MonitoredNodeTree } from '../model/MonitoredNodeTree';
import { Tag } from '../model/Tag';
import { WeatherStation } from '../model/WeatherStation';
import { City } from '../model/City';
import { WeatherReading } from '../model/WeatherReading';

@Injectable()
export class PersistenceApiService {

  baseUrl = 'api/v1/persistence/v1';

  constructor(private http: Http) {
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get(this.baseUrl + '/users/' + userId).map(res => res.json());
  }

  getGroupsByUserId(userId: string): Observable<Group[]> {
    return this.getUserById(userId).map(user => user ? user.groups : null);
  }

  getGroupNodes(groupId: number): Observable<MonitoredNodeTree[]> {
    return this.http.get(this.baseUrl + '/groups/' + groupId + '/monitored-nodes').map(res => res.json());
  }

  getStreamData(streamId: string, from: Date, to: Date): Observable<any> {
    return this.http.get(this.baseUrl + '/data/' + streamId + '/' + from.toISOString() + '/' + to.toISOString()).map(res => res.json());
  }

  getWeatherReadings(weatherStationId: number, from: Date, to: Date): Observable<WeatherReading[]> {
    return this.http.get(this.baseUrl + '/weather/stations/' + weatherStationId + '/readings/' + from.toISOString() + '/'
      + to.toISOString()).map(res => res.json());
  }

  getNodeById(nodeId: number): Observable<MonitoredNodeTree> {
    return this.http.get(this.baseUrl + '/nodes/' + nodeId).map(res => res.json());
  }

  getTags(): Observable<Tag[]> {
    return this.http.get(this.baseUrl + '/tags').map(res => res.json());
  }

  getCities(): Observable<City[]> {
    return this.http.get(this.baseUrl + '/cities').map(res => res.json());
  }

  getWeatherStationsByCityId(cityId: number): Observable<WeatherStation[]> {
    return this.http.get(this.baseUrl + '/cities/' + cityId + '/weatherstations').map(res => res.json());
  }

  getWeatherStations(): Observable<WeatherStation[]> {
    return this.http.get(this.baseUrl + '/weather/stations').map(res => res.json());
  }

}
