import { MapService } from './../../services/map.service';
import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor( private mapService: MapService,
    private placesService: PlacesService ) {}

  goToMyLocation() {
    if ( !this.placesService.isUserLocationReady ) throw Error("No hay cordenadas del usuario");
    if ( !this.mapService.isMapReady ) throw Error("No se ha cargado el mapa");
    
    console.log('volver a mi ubicación');
    this.mapService.flyTo( this.placesService.useLocation! );

  }


}
