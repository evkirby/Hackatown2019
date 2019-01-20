import { GeoService } from './../geo.service';
import { PlacesAPIService } from './../PlacesAPI/places-api.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Lieu } from '../Lieu';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('home') home: ElementRef;
  @ViewChild('result') result: ElementRef;
  inLat: number; // = 45.502990;
  inLong: number; // = -73.613990;
  inType = 'restaurant';
  inKey: string;
  inRad = 1500;
  endroits: Lieu[];

  constructor(public mapsSerice: PlacesAPIService, public geoService: GeoService) {

  }

  getAddr() {
    this.mapsSerice.getAddr(this.inLat, this.inLong);
  }

  useMyLocation() {
    this.geoService.getLocation();
    this.inLat = this.geoService.lat;
    this.inLong = this.geoService.long;
  }

  async loadPlaces() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    const places: Lieu[] = await this.mapsSerice.getPlaces(this.inLat, this.inLong, this.inType, this.inKey, this.inRad);
    console.log(places);
    const array = new Array({1: 2, 3: 4, 5: 6}, {7: 8, 9: 10, 11: 12});
    console.log(array[0]);
    // this.mapsSerice.getDirection(places[0].adresse, places[1].adresse, 'WALKING');
  }

  annuler() {
      document.getElementById('result').style.display = 'none';
      document.getElementById('home').style.display = 'block';
  }
}
