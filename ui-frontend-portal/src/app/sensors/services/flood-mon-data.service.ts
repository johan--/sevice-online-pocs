import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PersistenceApiService } from './persistence-api.service';

export interface Camera {
  name: string,
  lat: number,
  lng: number,
  img: string,
  attribution: string,
  currentLevel: number,
  changeLevel: number,
  dataStreamId?: string
}

@Injectable()
export class FloodMonDataService {

  private cameras: Camera[] = [
    {
      name: 'Rottweil',
      lat: 48.17122542848971,
      lng: 8.62817405026249,
      img: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Neckarbr%C3%BCcke_Pulverfabrik_Rottweil_2.jpg',
      attribution: 'Andreas König [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons',
      currentLevel: 6,
      changeLevel: 0.1
    },
    {
      name: 'Tübingen',
      lat: 48.519252245004054,
      lng: 9.056984976582271,
      img: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Neckar_T%C3%BCbingen.jpg',
      attribution: 'By Gzzz (Own work) [CC BY-SA 4.0 (http://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons',
      currentLevel: 2,
      changeLevel: -0.1
    },
    {
      name: 'Nürtingen',
      lat: 48.62669737657602,
      lng: 9.333190083097852,
      img: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/N%C3%BCrtingen_Neckarfront_2012.jpg',
      attribution: 'von Helmlechner (Eigenes Werk) [CC BY-SA 4.0 (http://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons',
      currentLevel: 3,
      changeLevel: 0.2
    },
    {
      name: 'Plochingen',
      lat: 48.712704672871865,
      lng: 9.408085612875311,
      img: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/NeckarbrueckePlochingen.JPG',
      attribution: 'von tschogibussi (tschogibussi) [GFDL (http://www.gnu.org/copyleft/fdl.html) oder ' +
      'CC-BY-SA-3.0 (http://creativecommons.org/licenses/by-sa/3.0/)], via Wikimedia Commons',
      currentLevel: 6,
      changeLevel: 0.02
    },
    {
      name: 'Esslingen',
      lat: 48.73784142504867,
      lng: 9.310308726050604,
      img: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Neckar_-_Esslingen_am_Neckar%2C_Germany_-_DSC04102.jpg',
      attribution: 'By Daderot (Own work) [CC0], via Wikimedia Commons',
      currentLevel: 2,
      changeLevel: 0.05
    },
    {
      name: 'Stuttgart',
      lat: 48.82655461601065,
      lng: 9.213888815345408,
      img: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Zuckerle.jpg',
      attribution: 'By Berndt Fernow (Own work (own photography)) [Public domain], via Wikimedia Commons',
      currentLevel: 8,
      changeLevel: -0.2,
      dataStreamId: 'cannstatt.waterheigth2'
    },
    {
      name: 'Remseck',
      lat: 48.867793600335006,
      lng: 9.260689594303932,
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Schleuse_stuttgart_aldingen_01.jpg',
      attribution: 'von Ra Boe (selbst fotografiert DigiCam C2100UZ) ' +
      '[CC BY-SA 2.5 (http://creativecommons.org/licenses/by-sa/2.5)], via Wikimedia Commons',
      currentLevel: 7,
      changeLevel: -0.03,
      dataStreamId: 'Rems-Neustadt-Height'
    },
    {
      name: 'Ludwigsburg',
      lat: 48.91378420586612,
      lng: 9.212791070236234,
      img: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/2016-03-13_Ludwigsburg_am_Neckar_bei_Hoheneck_und_Neckarweihingen_15.jpg',
      attribution: 'By Yeerge (Own work) [CC BY 4.0 (http://creativecommons.org/licenses/by/4.0)], via Wikimedia Commons',
      currentLevel: 3,
      changeLevel: 0.03
    },
    {
      name: 'Heilbronn',
      lat: 49.13156020997321,
      lng: 9.199273081592532,
      img: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Hn-neckar-wilhelmskanal.jpg',
      attribution: 'von p.schmelzle (Eigenes Werk) [GFDL (http://www.gnu.org/copyleft/fdl.html) oder ' +
      'CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons',
      currentLevel: 5,
      changeLevel: -0.01
    },
    {
      name: 'Neckarsulm',
      lat: 49.18791776642089,
      lng: 9.216419018293767,
      img: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Neckar_NSU.JPG',
      attribution: 'von Olof Hreiðarsson (Eigenes Werk) [CC BY 3.0 (http://creativecommons.org/licenses/by/3.0)], via Wikimedia Commons',
      currentLevel: 4,
      changeLevel: 0.06
    }
  ];

  constructor(
    private persistenceApi: PersistenceApiService
  ) {
  }

  getCameras(): Observable<Camera[]> {
    return Observable.of(this.cameras);
  }

  getDataService(): Function {
    return this.getDataForStream.bind(this);
  }

  getDataForStream(streamId: string, startDate: Date, endDate: Date): Observable<any> {
    console.log('get data for stream', streamId, startDate, endDate);
    if (this.cameras.find(cam => cam.dataStreamId === streamId)) {
      return this.persistenceApi.getStreamData(streamId, startDate, endDate);
    }
    const start = startDate.getTime();
    const end = endDate.getTime();
    const entries = {
      data: []
    };

    let inc = 1;
    let value = 5;
    let lastTrendChange = 0;

    for (let i = start; i < end; i += 300000) {
      if (Math.random() < 0.3 && lastTrendChange < i - 1800000) {
        inc = inc * -1;
        lastTrendChange = i;
      }
      if (value < 2) {
        inc = 1;
      }
      if (value > 10) {
        inc = -1;
      }
      value += Math.random() * inc;
      entries.data.push({ts: i, value: value});
    }

    return Observable.of(entries);
  }

}
