import Vue from 'vue'
import MapBoxGl from 'mapbox-gl'
import {lineString as TurMakeLineString} from '@turf/helpers'
import * as Polyline from '@mapbox/polyline'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';

Vue.prototype.$MapStyle = 'mapbox://styles/iamsanty/cksormxy694x217r3eo1th4wj'
Vue.prototype.$AccessToken = process.env.NUXT_ENV_MAPBOX_KEY
Vue.prototype.$MapBoxGl = MapBoxGl
Vue.prototype.$MapboxDirections = MapboxDirections;
Vue.prototype.$MapboxGeocoder = MapboxGeocoder
Vue.prototype.$TurMakeLineString = TurMakeLineString
Vue.prototype.$Polyline = Polyline