import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
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
}
