<template>
  <div id="map" class="w-full h-[40%] z-40 lg:h-full">
    <slot :route="route" />
    <div class="hidden">
      <svg-square
        id="pickup_marker"
        class="w-4 h-4 font-bold"
      ></svg-square>
      <svg-circle id="destination_marker" class="w-4 h-4"></svg-circle>
    </div>
  </div>
</template>
<script>
// import getcenter from 'geolib/es/getCenter'
export default {
  props: ['pickupAddress', 'destinationAddress'],
  data() {
    return {
      map: null,
      coordinates: [],
      zoom: 11,
      style: this.$MapStyle,
      accessToken: this.$AccessToken,
      geolocate: null,
      route: {},
    }
  },
  mounted() {
    this.map = new this.$MapBoxGl.Map({
      container: 'map',
      attributionControl: false,
      style: this.style,
      accessToken: this.accessToken,
      center: [-73.97644, 40.73401],
      zoom: this.zoom,
      maxZoom: 18,
    })

    this.map.on('load', () => {
      this.geolocate.trigger()
    })

    // this.addDirectionControl()
    this.addCustomAttributeControl()
    this.addNavigationControl()
    this.addGeolocateControl()
  },
  methods: {
    addDirectionControl() {
      const directions = new this.$MapboxDirections({
        accessToken: this.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        alternatives: false,
        congestion: true,
        geometries: 'geojson',
        controls: { instructions: false },
        flyTo: false,
        placeholderOrigin: 'Origin',
        placeholderDestination: 'Destination',
      })
      // document.getElementById('directionControl').appendChild(directions.onAdd(this.map))
      this.addMapControl(directions, 'top-right')
    },
    addNavigationControl() {
      this.addMapControl(new this.$MapBoxGl.NavigationControl(), 'bottom-right')
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
        (this.geolocate = new this.$MapBoxGl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          showAccuracyCircle: false,
          trackUserLocation: true,
          showUserHeading: true,
        }))
      )
    },
    addMapControl(control, options) {
      this.map.addControl(control, options)
    },
    addMarker() {
      this.coordinates.forEach((coord) => {
        const el = document.getElementById(coord.el_id)
        new this.$MapBoxGl.Marker({
          color: 'black',
          element: el,
        })
          .setLngLat(coord.loc)
          .addTo(this.map)

        new this.$MapBoxGl.Popup({
          closeButton: false,
          closeOnClick: false,
        })
          .setHTML(
            `<p class="space-x-2"> 
                  <a class="text-blue-500 space-x-1">
                  ${coord.way}
                  </a>
                  ${coord.name}
              </p>`
          )
          .setLngLat(coord.loc)
          .addTo(this.map)
      })
    },
    async getRoute(coordinates) {
      await this.$axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?alternatives=true&geometries=geojson&steps=true&access_token=${process.env.NUXT_ENV_MAPBOX_KEY}
`
        )
        .then((res) => {
          const data = res.data.routes[0]
          const distance = data.distance // in meters
          const duration = data.duration /* in seconds */

          this.route = { distance, duration }

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
        .catch(() => {})
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
            'line-width': ['interpolate', ['linear'], ['zoom'], 15, 3, 22, 13],
          },
        },
        'waterway-label'
      )
    },
  },
  watch: {
    pickupAddress: function () {
      if (Object.keys(this.pickupAddress).length > 0) {
        const location = [this.pickupAddress.lon, this.pickupAddress.lat]
        this.map.setCenter(location)
        this.coordinates.push({
          loc: location,
          name: this.pickupAddress.name,
          el_id: 'pickup_marker',
          way: 'From - ',
        })

        this.addMarker()
      }
    },
    destinationAddress: function () {
      if (Object.keys(this.destinationAddress).length > 0) {
        const pickupLocation = {
          longitude: this.pickupAddress.lon,
          latitude: this.pickupAddress.lat,
        }

        const destLocation = {
          longitude: this.destinationAddress.lon,
          latitude: this.destinationAddress.lat,
        }

        // current pickup location
        // const pickupLocation = this.map.getCenter()

        /* const coordinates = [
          {
            longitude: pickupLocation.lng,
            latitude: pickupLocation.lat,
          },
          destLocation,
        ]
        const center = getcenter(coordinates)

        this.map.setCenter([center.longitude, center.latitude]) */

        this.coordinates.push({
          loc: [destLocation.longitude, destLocation.latitude],
          name: this.destinationAddress.name,
          el_id: 'destination_marker',
          way: 'To - ',
        })

        this.addMarker()
        const routeCoords = `${pickupLocation.longitude},${pickupLocation.latitude};${destLocation.longitude},${destLocation.latitude}`
        this.getRoute(routeCoords)
      }
    },
  },
}
</script>
