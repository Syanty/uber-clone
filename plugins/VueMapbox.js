/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import { MglMap, MglMarker, MglPopup, MglNavigationControl, MglGeolocateControl, MglFullscreenControl } from 'vue-mapbox';
import Mapbox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


Vue.component('MglMap', MglMap);
Vue.component('MglMarker', MglMarker);
Vue.component('MglPopup', MglPopup);
Vue.component('MglNavigationControl', MglNavigationControl)
Vue.component('MglGeolocateControl', MglGeolocateControl)
Vue.component('MglFullscreenControl', MglFullscreenControl)

Vue.prototype.$mapbox = Mapbox;