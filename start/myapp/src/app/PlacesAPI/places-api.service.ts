import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lieu } from '../Lieu';
import { async } from 'q';
declare const require: any;
declare var google;

@Injectable({
  providedIn: 'root'
})
export class PlacesAPIService {
  private map: any;

  constructor(private http: HttpClient) {
    this.map = new google.maps.Map(document.getElementById('map'));
  }

  getPlaces(lat: number, long: number, type: string, keyword: string, radius: number): Promise<Lieu[]> {
    const service = new google.maps.places.PlacesService(this.map);
    const request = {
      location: new google.maps.LatLng(lat, long),
      radius: radius,
      type: type,
      openNow: true,
      keyword: keyword
    };
    return new Promise(function(fulfill, reject) {
      service.nearbySearch(request, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const lieus: Lieu[] = [];
          result.forEach(element => {
            const lieu: Lieu = new Lieu(element.name, element.vicinity, element.rating);
            console.log(lieu);
            lieus.push(lieu);
          });
          fulfill(lieus);
        } else {
          reject('Reqest status code was not ok');
        }
      });
    });
  }

  getDirection(debut: string, fin: string, travelMode: string): Promise<string> {
    const service = new google.maps.DirectionsService(this.map);
    const request = {
      origin: debut,
      destination: fin,
      travelMode: travelMode
    };
    let temps = '';
    return new Promise(function(fulfill, reject) {
      service.route(request, (result, status) => {
        temps = result.routes[0].legs[0].duration.text;
        fulfill(temps);
      });
    });
  }
}
