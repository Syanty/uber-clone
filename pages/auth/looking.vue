<template>
  <div class="h-full lg:h-[90vh] w-full z-30 fixed top-0 lg:top-[10vh]">
    <Map
      :pickupAddress="pickupAddress"
      :destinationAddress="destinationAddress"
    >
      <div
        class="
          hidden
          lg:flex
          z-50
          w-[500px]
          h-full
          absolute
          top-0
          justify-center
          items-center
        "
      >
         <search-ride
        @getLocation="location = $event"
        @getClickedSearchItem="fetchLocation($event)"
        @loadPickup="pickupAddress = $event"
        @loadDestination="destinationAddress = $event"
        @setCoordsLoaded="
          coordsLoaded = false
          location = $event
        "
        @setPickupLoaded="
          pickupLoaded = false
          location = $event
        "
        :location="location"
        :getSearchResults="getSearchResults"
        :pickupLoaded="pickupLoaded"
        :coordsLoaded="coordsLoaded"
        :pickupAddress="pickupAddress"
        :destinationAddress="destinationAddress"
      ></search-ride>
      </div>
    </Map>
    <div
      class="
        lg:hidden
        flex
        z-50
        w-full
        h-[60%]
        absolute
        bottom-0
        justify-end
        items-end
      "
    >
      <search-ride
        @getLocation="location = $event"
        @getClickedSearchItem="fetchLocation($event)"
        @loadPickup="pickupAddress = $event"
        @loadDestination="destinationAddress = $event"
        @setCoordsLoaded="
          coordsLoaded = false
          location = $event
        "
        @setPickupLoaded="
          pickupLoaded = false
          location = $event
        "
        :location="location"
        :getSearchResults="getSearchResults"
        :pickupLoaded="pickupLoaded"
        :coordsLoaded="coordsLoaded"
        :pickupAddress="pickupAddress"
        :destinationAddress="destinationAddress"
      ></search-ride>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'auth',
  data() {
    return {
      pickupAddress: {},
      destinationAddress: {},
      location: '',
      searchResults: [],
      pickupLoaded: false,
      coordsLoaded: false,
      clickedSearchItem: '',
    }
  },
  methods: {
    autoComplete() {
      this.$axios
        .get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${this.location}&apiKey=${process.env.NUXT_ENV_GEOAPIFY_KEY}`
        )
        .then((res) => {
          this.searchResults = res.data.features
        })
        .catch(() => {
          console.clear()
        })
    },
    fetchLocation(location) {
      let query = {}

      /* after pickup address is provided */
      if (this.pickupLoaded) {
        this.coordsLoaded = true
        query = {
          ...this.$route.query,
          destination_id: location.place_id,
          destination_address: location.formatted,
          destination_latitude: location.lat,
          destination_longitude: location.lon,
        }
        const destination = {
          name: location.name || location.formatted,
          lat: location.lat,
          lon: location.lon,
        }

        this.destinationAddress = destination
      } else {
        /* provide pickup address */
        this.pickupLoaded = true
        query = {
          ...this.$route.query,
          pickup_id: location.place_id,
          pickup_address: location.formatted,
          pickup_latitude: location.lat,
          pickup_longitude: location.lon,
        }
        const pickup = {
          name: location.name || location.formatted,
          lat: location.lat,
          lon: location.lon,
        }

        this.pickupAddress = pickup
      }
      this.location = ''
      this.clickedSearchItem = ''
      this.$router
        .replace({
          path: this.$route.path,
          query: query,
        })
        .catch(() => {})
    },
  },
  computed: {
    getSearchResults() {
      return this.searchResults
    },
  },
  watch: {
    location: function () {
      if (this.location === '') {
        this.searchResults = []
      } else {
        this.autoComplete()
      }
    },
  },
}
</script>