<template>
  <client-only>
    <MglMap
      :accessToken="access_token"
      :mapStyle.sync="mapStyle"
      :center="getCenter"
      :zoom="zoom"
      :offset="[-20, -10]"
    >
      <div v-for="coord in getCoordinates" :key="coord.name">
        <MglMarker
          :coordinates="[coord.longitude, coord.latitude]"
          color="black"
        >
          <MglPopup
            :offset="[0, -10]"
            :showed="true"
            :closeButton="false"
            :closeOnClick="false"
          >
            <div>{{ coord.name }}</div>
          </MglPopup>
        </MglMarker>
      </div>
    </MglMap>
  </client-only>
</template>
<script>
import getcenter from 'geolib/es/getCenter'
import ipInfo from 'ipinfo'
export default {
  data() {
    return {
      mapStyle: 'mapbox://styles/iamsanty/ckslydyu40qoe17p3dzw9jo6a',
      coordinates: [],
      access_token: process.env.NUXT_ENV_MAPBOX_KEY,
      center: [],
      zoom: 11,
    }
  },
  mounted() {
    this.fetchIpInfo()
  },
  methods: {
    fetchIpInfo() {
      ipInfo((err, cLoc) => {
        if (err) return
        const coords = cLoc.loc.split(',')
        this.center = [parseFloat(coords[1]), parseFloat(coords[0])]
        this.coordinates = [
          {
            longitude: this.center[0],
            latitude: this.center[1],
            name: cLoc.city,
          },
        ]
        this.attrLoaded = true
      })
    },
    getLocation() {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          this.successfulLookup,
          console.log()
        )
      } else {
        alert('Geolocation not supported by your browser')
      }
    },
    successfulLookup(position) {
      this.findCenter(position.coords)
    },
    findCenter(coordinates) {
      // latitude and longitude of the center of location coordinates
      const centerCoord = getcenter(coordinates.longitude, coordinates.latitude)
      this.center = [centerCoord.longitude, centerCoord.latitude]
    },
  },
  computed: {
    getCenter() {
      return this.center
    },
    getCoordinates() {
      return this.coordinates
    },
  },
}
</script>