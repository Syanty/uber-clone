<template>
  <div
    class="h-full lg:h-[90vh] w-full z-30 fixed top-0 lg:top-[10vh]"
  >
    <Map>
      <div
        class="
          z-50
          w-full
          lg:w-[500px]
          h-full
          absolute
          flex
          justify-center
          items-center
          overflow-y-scroll
          scrollbar-hide
        "
      >
        <div
          class="
            absolute
            bg-white
            w-full
            h-full
            lg:w-[90%]
            lg:h-[90%]
            flex flex-col
          "
        >
          <div class="bg-blue-700 w-full text-white p-10">
            <h2>Where can we pick you up?</h2>
          </div>
          <div
            class="
              h-full
              lg:h-2/3
              w-full
              overflow-y-auto
              scrollbar-hide
              py-10
              bg-white
            "
          >
            <div class="px-7">
              <div class="flex mt-5">
                <input
                  v-if="!lookup"
                  type="text"
                  placeholder="Pickup location"
                  @input="autoComplete(pickup)"
                  class="focus:border-b-2 border-blue-700 focus:bg-blue-50"
                  v-model="pickup"
                />
                <input
                  v-else
                  type="text"
                  placeholder="Destination"
                  @input="autoComplete(destination)"
                  class="focus:border-b-2 border-blue-700 focus:bg-blue-50"
                  v-model="destination"
                />
              </div>
              <div class="flex justify-start py-5">
                <button
                  class="
                    bg-gray-300
                    p-2
                    px-4
                    w-1/3
                    text-black
                    rounded-full
                    flex flex-row
                    items-center
                  "
                >
                  <svg-clock class="w-3 h-3"></svg-clock>
                  <p class="mx-2">Now</p>
                  <svg-chevron-down class="w-3 h-3"></svg-chevron-down>
                </button>
              </div>
            </div>
            <div>
              <ul>
                <li
                  v-for="item in searchResults"
                  :key="item.properties.place_id"
                  @click="setLocation(item.properties)"
                  class="
                    py-2
                    px-7
                    cursor-pointer
                    flex flex-row
                    space-x-5
                    items-center
                    hover:bg-gray-200
                  "
                >
                  <span class="p-2 rounded-full bg-gray-400">
                    <svg-location></svg-location>
                  </span>
                  <div class="flex flex-col w-full border-b pb-2">
                    <h4>
                      {{ item.properties.name || item.properties.city }}
                    </h4>
                    <p class="text-sm">
                      {{ item.properties.formatted }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Map>
  </div>
</template>
<script>
import getcenter from 'geolib/es/getCenter'
export default {
  layout: 'auth',
  data() {
    return {
      pickup: '',
      destination: '',
      searchResults: [],
      lookup: false,
    }
  },
  methods: {
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
      const centerCoord = getcenter(coordinates)
      this.center = [centerCoord.longitude, centerCoord.latitude]
    },
    autoComplete(searchItem) {
      this.$axios
        .get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchItem}&apiKey=${process.env.NUXT_ENV_GEOAPIFY_KEY}`
        )
        .then((res) => {
          this.searchResults = res.data.features
        })
        .catch((err) => console.log(err))
    },
    setLocation(location) {
      /* if pickup address is provided */
      if (!this.lookup) {
        this.$router.replace({
          path: this.$route.path,
          query: {
            pickup_id: location.place_id,
            pickup_address: location.formatted,
            pickup_latitude: location.lat,
            pickup_longitude: location.lon,
          },
        })
        this.center = [location.lon, location.lat]
        this.coordinates = [
          Object.assign(
            { longitude: location.lon, latitude: location.lat },
            {
              name: location.name || location.formatted,
            }
          ),
        ]
        this.lookup = true
      } else {
        this.$router.replace({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            destination_id: location.place_id,
            destination_address: location.formatted,
            destination_latitude: location.lat,
            destination_longitude: location.lon,
          },
        })

        this.coordinates.push(
          Object.assign(
            { longitude: location.lon, latitude: location.lat },
            {
              name: location.name || location.formatted,
            }
          )
        )
        this.findCenter(this.coordinates)
      }

      this.searchResults = []

      this.zoom = 13
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
