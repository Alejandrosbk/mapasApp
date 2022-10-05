import { PlacesService } from './../../services/places.service';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Mapboxgl from 'mapbox-gl'; 

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor( private placesService: PlacesService ) { }

  ngAfterViewInit(): void {
    if ( !this.placesService.useLocation ) throw Error('No hay placesService.userLocation')
    
    else {
      console.log('Tu geolocalización es', this.placesService.useLocation);
    };

    const map = new Mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }
}
