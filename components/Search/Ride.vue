<template>
  <client-only>
    <div
      class="
        absolute
        bg-white
        w-full
        h-full
        lg:w-[90%]
        lg:h-[90%]
        flex flex-col
        items-center
        lg:rounded-lg
        lg:shadow-lg
        overflow-y-scroll
        scrollbar-hide
      "
    >
      <div
        class="
          bg-blue-700
          w-full
          text-white
          px-5
          py-2
          lg:py-5
          flex
          lg:rounded-t-lg
          flex-col
          space-y-2
        "
      >
        <div
          v-if="getPickupStatus || getPickup"
          class="flex flex-col space-y-2"
        >
          <h3
            class="flex flex-row space-x-2 items-center truncate cursor-pointer"
          >
            <svg-circle-outline class="w-2 h-2"></svg-circle-outline>
            <span v-if="getPickup" v-tooltip="getPickup.pickup_address">{{
              `From-${getPickup.pickup_address}`
            }}</span>
            <span v-else>Where From? </span>
          </h3>
          <svg-subtract
            class="w-8 transform rotate-90 -translate-x-3"
          ></svg-subtract>
          <h3
            class="flex flex-row space-x-2 items-center truncate cursor-pointer"
          >
            <svg-square-outline class="w-2 h-2"></svg-square-outline>
            <span
              v-tooltip="getDestination.destination_address"
              v-if="getDestination"
              >{{ `To-${getDestination.destination_address}` }}</span
            >
            <span v-else>Where To?</span>
          </h3>
          <div
            :class="route ? 'justify-between' : 'justify-center'"
            class="flex flex-row items-center mt-3 text-sm"
          >
            <p v-if="route" class="flex flex-col space-y-1">
              <span>Distance - {{ route.distance | distanceInKm }} km away</span>
            </p>
            <button
              :class="!route ? '' : 'w-[40%]'"
              @click="
                clearAll()
                $router.go()
              "
            >
              Reset
            </button>
          </div>
        </div>
        <h2 v-else class="py-5">Where can we pick you up?</h2>
      </div>
      <div
        class="
          h-full
          lg:h-2/3
          w-full
          py-10
          bg-white
          overflow-y-scroll
          scrollbar-hide
        "
      >
        <div class="px-7">
          <div
            class="flex sticky -top-10 flex-col space-x-2 bg-white"
            v-if="!getDestinationStatus"
          >
            <input
              type="text"
              :placeholder="getPickupStatus ? 'Destination' : 'Pickup Location'"
              @input="autoComplete"
              class="focus:border-b-2 border-blue-700 focus:bg-blue-50 text-lg"
              v-model="locationData"
            />
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

          <div v-else>
            <ul>
              <uber-item :route="route" v-for="i in 10" :key="i"></uber-item>
            </ul>
          </div>
        </div>
        <div>
          <ul v-if="locationData">
            <search-result-item
              v-for="item in searchResults"
              :key="item.properties.place_id"
              :item="item"
              @clearLocation="locationData = ''"
            ></search-result-item>
          </ul>
        </div>
      </div>
      <div
        v-if="getDestinationStatus"
        class="flex items-center justify-center py-2 lg:py-5 w-full"
      >
        <button class="w-[70%] mx-auto">Request Uber</button>
      </div>
    </div>
  </client-only>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: ['route'],
  data() {
    return {
      locationData: '',
      searchResults: [],
    }
  },
  methods: {
    ...mapMutations('map', ['clearAll']),
    autoComplete() {
      this.$axios
        .get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${this.locationData}&apiKey=${process.env.NUXT_ENV_GEOAPIFY_KEY}`
        )
        .then((res) => {
          this.searchResults = res.data.features
        })
        .catch(() => {
          console.clear()
        })
    },
  },
  filters: {
    distanceInKm: function (val) {
      return parseFloat(val / 1000).toFixed(2)
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
}
</script>