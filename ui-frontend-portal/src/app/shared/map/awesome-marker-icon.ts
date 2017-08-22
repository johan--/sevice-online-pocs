import * as L from 'leaflet';

declare const document;

export interface AwesomeMarkerIconOptions extends L.IconOptions {
  icon: string;
  iconColor?: string;
  markerColor?: string;
}

/**
 * Inspired by https://github.com/danwild/leaflet-fa-markers/blob/master/L.Icon.FontAwesome.js
 */
export class AwesomeMarkerIcon extends L.Icon {
  options: AwesomeMarkerIconOptions;

  markerPath: any;
  icon: any;

  constructor(_options: AwesomeMarkerIconOptions) {
    super(_options);
    this.options = Object.assign({
      iconColor: 'white',
      markerColor: 'blue',
      iconAnchor: [15, 50],
      popupAnchor: [1, -32],
    }, _options);
  }

  setMarkerColor(color: string) {
    this.options.markerColor = color;
    if (this.markerPath) {
      this.markerPath.setAttribute('fill', color);
    }
  }

  setIconColor(color: string) {
    this.options.iconColor = color;
    if (this.icon) {
      this.icon.style.color = color;
    }
  }

  createIcon() {
    const container = document.createElement('div');
    container.style.width = '30px';
    container.style.height = '50px';
    container.style.marginLeft = '-15px';
    container.style.marginTop = '-50px';
    container.style.textAlign = 'center';
    container.style.position = 'relative';

    const markerSymbol = this.createMarkerSymbol();
    container.appendChild(markerSymbol);

    const iconContainer = container.appendChild(document.createElement('div'));
    iconContainer.style.marginTop = '-50px';
    iconContainer.style.textAlign = 'center';

    const icon = iconContainer.appendChild(document.createElement('span'));
    icon.className = 'fa fa-' + this.options.icon;
    icon.style.color = this.options.iconColor;
    this.icon = icon;


    return container;
  }

  createMarkerSymbol() {
    const svgNs = 'http://www.w3.org/2000/svg';
    const container = document.createElement('div');
    const svg = container.appendChild(document.createElementNS(svgNs, 'svg'));
    svg.setAttribute('width', 32);
    svg.setAttribute('height', 52);
    svg.setAttribute('viewBox', '0 0 32 52');
    const path = svg.appendChild(document.createElementNS(svgNs, 'path'));
    path.setAttribute('d', 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,24.0760606 16,51 16,51 ' +
      'C16,51 31,24.0760606 31,15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z');
    path.setAttribute('fill', this.options.markerColor);
    this.markerPath = path;
    return container;
  }

}
