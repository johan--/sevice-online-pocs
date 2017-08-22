import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import * as L from 'leaflet';

declare const document;

export interface MapPolylineOptions extends L.PolylineOptions {
  showToolTip?: boolean;
}

export class MapPolyLine extends L.Polyline {
  showToolTip = true;

  constructor(latlngs: L.LatLngExpression[], options: MapPolylineOptions) {
    super(latlngs, options);
    if (options && options.showToolTip !== undefined) {
      this.showToolTip = options.showToolTip;
    }
  }
}

export interface MapMarkerOptions extends L.MarkerOptions {
  showToolTip?: boolean;
}

export class MapMarker extends L.Marker {
  showToolTip = true;

  constructor(latlng: L.LatLngExpression, options: MapMarkerOptions) {
    super(latlng, options);
    if (options && options.showToolTip !== undefined) {
      this.showToolTip = options.showToolTip;
    }
  }
}

@Component({
  selector: 'leaflet-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @ViewChild(LeafletDirective) private leaflet: LeafletDirective;

  @Input() popupTpl: TemplateRef<any>;

  @Output() onMove = new EventEmitter<L.Event>();

  @Input() fitMarkerBounds = true;

  @Input() maxZoom = 20;

  _height: string;

  _markers: L.Marker[] = [];

  _polyLines: L.Polyline[] = [];

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxNativeZoom: 19,
          maxZoom: 25,
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
    ],
    zoom: 5,
    maxZoom: 25,
    center: L.latLng({lat: 0, lng: 0})
  };

  subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
    L.Icon.Default.mergeOptions({imagePath: 'assets/leaflet/'});

  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onMapReady(map: L.Map) {
    console.log('map ready', map);
    this.subscriptions.push(Observable.fromEvent(map, 'move').subscribe(event => {
      this.onMove.next(event as L.Event);
    }));
    // this.subscriptions.push(Observable.fromEvent(map, 'zoom').subscribe(event => {
    //   console.log('zoom', event);
    // }));

    this._markers.forEach(m => {
      this.addMarker(m);
    });
    this._polyLines.forEach(pl => {
      this.addPolyLine(pl);
    });
    this.adjustBounds();
  }

  get map(): L.Map {
    return this.leaflet ? this.leaflet.getMap() : null;
  }

  @Input() set zoom(zoom: number) {
    this.options.zoom = zoom;
    if (!this.map) {
      return;
    }
    this.map.setZoom(zoom);
  }

  @Input() set center(coordinates: L.LatLngLiteral) {
    this.options.center = L.latLng(coordinates);
    if (!this.map) {
      return;
    }
    this.map.panTo(coordinates);
  }

  @Input() set height(height: string) {
    this._height = height;
    this.resize();
  }

  @Input() set markers(markers: L.Marker[] | MapMarker[]) {
    this.resetMarkers();
    this._markers = markers;
    if (this.map) {
      this._markers.forEach(m => {
        this.addMarker(m);
      });
      this.adjustBounds();
    }
  }

  get markers() {
    return this._markers;
  }

  resetMarkers() {
    let m;
    while (m = this._markers.pop()) {
      m.remove();
    }
  }

  @Input() set polyLines(polyLines: L.Polyline[] | MapPolyLine[]) {
    this.resetPolyLines();
    this._polyLines = polyLines;
    if (this.map) {
      this._polyLines.forEach(pl => {
        this.addPolyLine(pl);
      });
    }
  }

  resetPolyLines() {
    let m;
    while (m = this._polyLines.pop()) {
      m.remove();
    }
  }

  resize() {
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 10);
  }

  addMarker(marker: L.Marker | MapMarker) {
    marker.addTo(this.map);
    let show = true;
    if (marker instanceof MapMarker) {
      show = marker.showToolTip;
    }
    if (this.popupTpl && show) {
      marker.bindPopup((layer: L.Layer) => this.renderPopup(layer));
    }
  }

  addPolyLine(polyLine: L.Polyline | MapPolyLine) {
    polyLine.addTo(this.map);
    let show = true;
    if (polyLine instanceof MapPolyLine) {
      show = polyLine.showToolTip;
    }
    if (this.popupTpl && show) {
      polyLine.bindPopup((layer: L.Layer) => this.renderPopup(layer));
    }
  }

  renderPopup(marker: L.Layer) {
    const popup = document.createElement('div');
    const ref = this.popupTpl.createEmbeddedView({marker: marker});
    ref.detectChanges();
    ref.rootNodes.forEach(node => popup.appendChild(node));
    return popup;
  }

  adjustBounds() {
    if (this.fitMarkerBounds && this._markers.length) {
      const bounds = L.latLngBounds(this._markers[0].getLatLng(), this._markers[0].getLatLng());
      this._markers.forEach(m => {
        bounds.extend(m.getLatLng());
      });
      this.map.fitBounds(bounds, {maxZoom: this.maxZoom});
    }
  }

}
