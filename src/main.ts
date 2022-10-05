import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlam9zYmsiLCJhIjoiY2w4djR2OXltMGE5MTNvcnIydXpsaDl0bSJ9.fbIetjAJm8SYeA9Mnn-MYQ';

// Consultar geolocalización del usuario
if ( !navigator.geolocation ) {
  alert('No es posible obtener la localización');
  throw new Error('No es posible obtener la localización');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
