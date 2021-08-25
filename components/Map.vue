<template>
  <div id="map" class="w-full h-[35%] relative z-40 lg:h-full">
    <slot :route="route" />
    <div class="hidden">
      <svg-square-outline-bold
        id="pickup_marker"
        class="w-5 h-5"
      ></svg-square-outline-bold>
      <svg-circle-outline-bold
        id="destination_marker"
        class="w-5 h-5"
      ></svg-circle-outline-bold>
      <svg-placeholder id="default_marker" class="w-12 h-12"></svg-placeholder>
    </div>
  </div>
</template>
<script>
// import getcenter from 'geolib/es/getCenter'
import { mapGetters,mapMutations } from 'vuex'
export default {
  data() {
    return {
      map: null,
      coordinates: [],
      zoom: 11,
      style: this.$MapStyle,
      accessToken: this.$AccessToken,
      geolocate: null,
      route: {},
      popupOffsets: {
        top: [0, -15],
        'top-left': [0, 0],
        'top-right': [0, 0],
        bottom: [0, -20],
        'bottom-left': [10, -20],
        left: [-10, -15],
        right: [-10, -10],
      },
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
      this.getPickupLocation()
      this.getDestinationLocation()
    })

    // this.addDirectionControl()
    this.addCustomAttributeControl()
    this.addNavigationControl()
    this.addGeolocateControl()
  },
  methods: {
    ...mapMutations('map',['clearAll']),
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
          offset: this.popupOffsets,
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
    getPickupLocation() {
      if (this.getPickupStatus) {
        const location = [
          this.getPickup.pickup_longitude,
          this.getPickup.pickup_latitude,
        ]
        this.map.setCenter(location)
        this.coordinates.push({
          loc: location,
          name: this.getPickup.pickup_address,
          el_id: 'pickup_marker',
          way: 'From - ',
        })

        this.addMarker()
        this.map.flyTo({
          center: location,
          zoom: 13,
          essential: true,
          bearing: 0,
          speed: 0.3,
          curve: 1,
          easing: (t) => t,
        })
      }
    },
    getDestinationLocation() {
      if (this.getDestinationStatus) {
        const pickupLocation = {
          longitude: this.getPickup.pickup_longitude,
          latitude: this.getPickup.pickup_latitude,
        }

        const destLocation = {
          longitude: this.getDestination.destination_longitude,
          latitude: this.getDestination.destination_latitude,
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
          name: this.getDestination.destination_address,
          el_id: 'destination_marker',
          way: 'To - ',
        })

        this.addMarker()
        this.map.flyTo({
          center: [
            this.getDestination.destination_longitude,
            this.getDestination.destination_latitude,
          ],
          zoom: 13,
          essential: true,
          bearing: 0,
          speed: 1,
          curve: 1,
          easing: (t) => t,
        })
        const routeCoords = `${pickupLocation.longitude},${pickupLocation.latitude};${destLocation.longitude},${destLocation.latitude}`
        this.getRoute(routeCoords)
      }
    },
  },
  computed: {
    ...mapGetters('map', [
      'getPickupStatus',
      'getDestinationStatus',
      'getPickup',
      'getDestination',
    ]),
  },

  watch: {
    getPickupStatus: function () {
      this.getPickupLocation()
    },
    getDestinationStatus: function () {
      this.getDestinationLocation()
    },
  },
}
</script>
