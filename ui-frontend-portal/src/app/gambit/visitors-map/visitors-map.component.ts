import { Component, OnInit, ViewChild } from '@angular/core';
import { GambitApiService, GameObjective } from '../services/gambit-api.service';
import { MapComponent } from '../../shared/map/map.component';

interface Marker {
  id: string;
  lat: number;
  lng: number;
  title?: string;
  label?: string;
  icon?: string;
}


interface Circle {
  id: string;
  lat: number;
  lng: number;
  radius: number;
  title?: string;
  label?: string;
  color?: string;
  pollution?: number;
  density?: number;
  ranking?: number;
}

export class GameObjectiveMarker extends L.Circle {
  constructor(public objective: GameObjective, options?: L.CircleMarkerOptions) {
    super(L.latLng(objective.latitude, objective.longitude), options);
  }
}


@Component({
  selector: 'visitors-map',
  templateUrl: './visitors-map.component.html',
  styleUrls: ['./visitors-map.component.scss']
})
export class VisitorsMapComponent implements OnInit {

  // google maps zoom level
  zoom = 14;

  // initial center position for the map
  center = {lat: 53.958718, lng: -1.083167};

  layer: L.Layer;

  circleOptions: L.CircleMarkerOptions = {
    radius: 40,
    stroke: false,
    fill: true,
    fillColor: '#ff0000',
    fillOpacity: 0.5
  };

  @ViewChild(MapComponent) map: MapComponent;

  constructor(private gambitApi: GambitApiService) {
  }

  ngOnInit() {
    this.gambitApi.getGameObjectives().subscribe((objectives) => {
      console.log('game objectives', objectives);
      if (!objectives.length) {
        return;
      }
      const circles = objectives
        .map((obj) => new GameObjectiveMarker(obj, this.circleOptions)
          .addTo(this.map.map)
          .bindPopup((layer: L.Layer) => this.map.renderPopup(layer)));

      const featureGroup = L.featureGroup(circles);
      const bounds = featureGroup.getBounds();
      this.map.map.fitBounds(bounds);


    });
  }

}
