import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor( private http: HttpClient ) {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]> {
    //  Convertimos a una promesa el navigator.geolocation position ya que por defecto no lo permite
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ( {coords} ) => {
          this.useLocation = [ coords.longitude, coords.latitude ];
          resolve( this.useLocation );
        },
        (err) => {
          alert('No es posible obtener la localización');
          console.log('No es posible obtener la localización', err);
          reject();
        }
      )
    });
  }

  getPlacesByQuery( query: string = '' ) {
    // evaluar cuantro el string en nulo
    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?country=co&limit=10&proximity=-74.10830846036745%2C4.745205541820809&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiYWxlam9zYmsiLCJhIjoiY2w4djRybmxjMGExNTN5cWlxYWxsNWl3dyJ9.t4rpG3ANCmmkkmeeYbIinA`)
      .subscribe(data => {
        console.log('data de los lugares', data.features);
        this.isLoadingPlaces = false;
        this.places = data.features;
      });
  }
}
