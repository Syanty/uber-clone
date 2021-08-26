<template>
  <div id="map" class="w-full h-[35%] relative z-40 lg:h-full">
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      map: null,
      coordinates: [],
      cabsCoordinates: [],
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
      geojson: null,
    })

    this.map.on('load', () => {
      // this.geolocate.trigger()
      this.getPickupLocation()
      this.getDestinationLocation()
    })

    // this.addDirectionControl()
    this.addCustomAttributeControl()
    this.addNavigationControl()
    this.addGeolocateControl()
  },
  methods: {
    ...mapMutations('map', ['clearAll']),
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
    addPickDestMarker() {
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
    async addCabsMarker() {
      /* find coordinates from api */
      await this.$axios
        .get(
          `https://api.geoapify.com/v2/places?categories=commercial.vehicle,parking.cars,service.taxi&filter=circle:${this.getPickup.pickup_longitude},${this.getPickup.pickup_latitude},5000&bias=proximity:${this.getPickup.pickup_longitude},${this.getPickup.pickup_latitude}&limit=5&apiKey=${process.env.NUXT_ENV_GEOAPIFY_KEY}`
        )
        .then((res) => {
          this.cabsCoordinates = res.data.features
        })
        .catch(() => console.clear())

      this.cabsCoordinates.forEach((cab) => {
        const el = document.createElement('div')
        el.innerHTML = `<?xml version="1.0"?>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="80" height="80" x="0" y="0" viewBox="0 0 47.032 47.032" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><circle r="23.516" cx="23.516" cy="23.516" fill="#000000" shape="circle" transform="matrix(0.54,0,0,0.54,10.817360343933105,10.817360343933105)"/><g transform="matrix(0.5,0,0,0.5,11.758000373840325,11.758000373840334)">
            <g xmlns="http://www.w3.org/2000/svg">
              <path d="M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z" fill="#fff9f9" data-original="#000000" style="" class=""/>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            <g xmlns="http://www.w3.org/2000/svg">
            </g>
            </g></svg>
            `
        new this.$MapBoxGl.Marker({
          color: 'black',
          element: el,
        })
          .setLngLat(cab.geometry.coordinates)
          .addTo(this.map)
      })
    },
    async getRoute(coordinates) {
      await this.$axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${coordinates}?annotations=congestion&overview=full&geometries=geojson&access_token=${process.env.NUXT_ENV_MAPBOX_KEY}
`
        )
        .then((res) => {
          const data = res.data.routes[0]
          const distance = data.distance // in meters
          const duration = data.duration /* in seconds */

          const routeParam = { distance, duration }

          this.$emit('getRouteParam', routeParam)

          const route = data.geometry.coordinates
          this.geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          }

          /* add route source */

          /* if the route already exists on the map, reset it using setData */
          if (this.map.getSource('route')) {
            this.map.getSource('route').setData(this.geojson)
          } else {
            // otherwise, add source
            this.map.addSource('route', {
              type: 'geojson',
              data: this.geojson,
            })
            /* add route layer i.e path */
            this.addRouteLayer()
          }
        })
        .catch(() => {})
    },
    addRouteLayer() {
      this.map.addLayer({
        id: 'routeline-active',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'black',
          'line-width': 5,
        },
      })
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

        this.addPickDestMarker()
        this.map.flyTo({
          center: location,
          zoom: 13,
          essential: true,
          bearing: 0,
          speed: 0.3,
          curve: 1,
          easing: (t) => t,
        })

        /* add nearby cab coordinates marker */
        this.addCabsMarker()
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
        this.map.setCenter([destLocation.longitude, destLocation.latitude])

        this.coordinates.push({
          loc: [destLocation.longitude, destLocation.latitude],
          name: this.getDestination.destination_address,
          el_id: 'destination_marker',
          way: 'To - ',
        })

        this.addPickDestMarker()

        const routeCoords = `${pickupLocation.longitude},${pickupLocation.latitude};${destLocation.longitude},${destLocation.latitude}`
        this.getRoute(routeCoords)
        this.map.flyTo({
          center: [
            this.getPickup.pickup_longitude,
            this.getPickup.pickup_latitude,
          ],
          zoom: 13,
          essential: true,
          bearing: 0,
          speed: 1,
          curve: 1,
          duration: 5000,
          easing: (t) => t,
        })
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
