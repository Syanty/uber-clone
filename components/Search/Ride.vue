<template>
  <div
    class="
      absolute
      bg-white
      w-full
      h-full
      lg:w-[90%]
      lg:h-[90%]
      flex flex-col items-end lg:items-center
      lg:rounded-lg
      lg:shadow-lg
    "
  >
    <div class="bg-blue-700 w-full text-white p-10 hidden lg:flex lg:rounded-t-lg">
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
        <div class="flex mt-5" v-if="!coordsLoaded">
          <input
            type="text"
            :placeholder="pickupLoaded ? 'Destination' : 'Pickup Location'"
            @input="autoComplete"
            class="focus:border-b-2 border-blue-700 focus:bg-blue-50 text-lg"
            v-model="location"
          />
        </div>
        <div v-else>
          <ul>
            <li
              v-for="i in 10"
              :key="i"
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
              Uber {{ i }}
            </li>
          </ul>
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
        <ul v-if="location">
          <search-result-item
            v-for="item in getSearchResult"
            :key="item.properties.place_id"
            :item="item"
            @itemClicked="searchResultItemClicked($event)"
          ></search-result-item>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      location: '',
      searchResults: [],
      pickupLoaded: false,
      coordsLoaded: false,
    }
  },
  mounted() {
    if (this.$route.query.refresh_id === '') {
      this.$router.replace({
        path: this.$route.path,
        query: {
          refresh_id: 'asdasd',
        },
      })
    }
  },
  methods: {
    autoComplete() {
      setTimeout(() => {
        this.$axios
          .get(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${this.location}&apiKey=${process.env.NUXT_ENV_GEOAPIFY_KEY}`
          )
          .then((res) => {
            this.searchResults = res.data.features
          })
          .catch(() => {})
      }, 2000)
    },
    searchResultItemClicked(location) {
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

        this.$emit('loadDestination', destination)
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

        this.$emit('loadPickup', pickup)
      }
      this.searchResults = []
      this.location = ''
      this.$router.replace({
        path: this.$route.path,
        query: query,
      })
    },
  },
  computed: {
    getSearchResult() {
      return this.searchResults
    },
  },
}
</script>