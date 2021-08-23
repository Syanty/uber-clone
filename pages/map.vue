<template>
  <div id="map" class="h-full w-full">
   <div class="hidden">
      <svg-square id="pickup_marker" class="w-4 h-4 font-bold"></svg-square>
    <svg-circle id="destination_marker" class="w-4 h-4"></svg-circle>
   </div>
  </div>
</template>
<script>
export default {
  layout: 'account',
  data() {
    return {
      map: null,
      destinationLocation: [-83.093, 42.376],
      pickupLocation: [-83.083, 42.363],
      coordinates: [
        {
          loc: [-83.083, 42.363],
          el_id: 'pickup_marker',
        },
        {
          loc: [-83.093, 42.376],
          el_id: 'destination_marker',
        },
      ],
      zoom: 13,
      style: this.$MapStyle,
      accessToken: this.$AccessToken,
    }
  },
  mounted() {
    this.map = new this.$MapBoxGl.Map({
      container: 'map',
      attributionControl: false,
      style: this.style,
      accessToken: this.accessToken,
      center: this.pickupLocation,
      zoom: this.zoom,
    })

    this.map.on('load', () => {
      this.coordinates.forEach((coord) => {
        const el = document.getElementById(coord.el_id)
        new this.$MapBoxGl.Marker({
          color: 'black',
          element: el,
        })
          .setLngLat(coord.loc)
          .setPopup(
            new this.$MapBoxGl.Popup({
              closeButton: false,
              closeOnClick: false,
            }).setHTML(`<p> <a>From</a>${coord.loc}</p>`)
          )
          .addTo(this.map)
      })

      /* add route */
      this.getRoute()
    })

    // this.addDirectionControl()
    this.addNavigationControl()
    this.addCustomAttributeControl()
    this.addGeolocateControl()
  },
  methods: {
    addDirectionControl() {
      const directions = new this.$MapboxDirections({
        accessToken: this.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        alternatives: false,
        geometries: 'geojson',
        controls: { instructions: false },
        flyTo: false,
      })

      this.addMapControl(directions, 'bottom-right')
    },
    addNavigationControl() {
      this.addMapControl(new this.$MapBoxGl.NavigationControl(),'bottom-right')
    },
    addCustomAttributeControl() {
      this.addMapControl(
        new this.$MapBoxGl.AttributionControl({
          customAttribution: 'Map designed by Santosh Tharu',
        })
      )
    },
    addGeolocateControl() {
      this.addMapControl(
        new this.$MapBoxGl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      )
    },
    addMapControl(control, options) {
      this.map.addControl(control, options)
    },
    async getRoute() {
      await this.$axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/-83.093,42.376;-83.083,42.363?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoiaWFtc2FudHkiLCJhIjoiY2tzaGcydWo2MXRzbTJ2b2Q4ZXZnaTg5ayJ9.Q4UAWGgMINrgBnqxHWvbKg
`
        )
        .then((res) => {
          const data = res.data.routes[0]
          const route = data.geometry.coordinates
          const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          }

          /* add route source */
          this.map.addSource('route', {
            type: 'geojson',
            data: geojson,
          })
          /* add route layer i.e path */
          this.addRouteLayer()
        })
    },
    addRouteLayer() {
      this.map.addLayer(
        {
          id: 'routeline-active',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': 'black',
            'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 13],
          },
        },
        'waterway-label'
      )
    },
  },
}
</script>
