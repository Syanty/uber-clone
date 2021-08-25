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
          p-10
          py-5
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-2 w-2 mx-4"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"
              /></svg
            ><span v-if="getPickup" v-tooltip="getPickup.pickup_address">{{
              `From-${getPickup.pickup_address}`
            }}</span>
            <span v-else>Where From? </span>
          </h3>
          <div
            class="
              border border-black
              transform
              rotate-90
              w-8
              translate-x-1
              border-opacity-70
            "
          ></div>
          <h3
            class="flex flex-row space-x-2 items-center truncate cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-2 w-2 mx-4"
              viewBox="0 0 24 24"
            >
              <path d="M22 2v20h-20v-2030zm2-2h-24v24h24v-24z" /></svg
            ><span
              v-tooltip="getDestination.destination_address"
              v-if="getDestination"
              >{{ `To-${getDestination.destination_address}` }}</span
            >
            <span v-else>Where To?</span>
          </h3>
          <button @click="clearAll();$router.go();">Reset Address</button>
        </div>
        <h2 v-else>Where can we pick you up?</h2>
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
              <li
                v-for="i in 20"
                :key="i"
                class="
                  py-4
                  px-7
                  cursor-pointer
                  flex flex-row
                  space-x-5
                  items-center
                  hover:bg-gray-200
                  overflow-y-scroll
                  scrollbar-hide
                "
              >
                Uber {{ i }}
              </li>
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
      <div v-if="getDestinationStatus" class="flex items-center justify-center py-5 w-full">
        <button class="w-[70%] mx-auto">Request Uber</button>
      </div>
    </div>
  </client-only>
</template>
<script>
import { mapGetters,mapMutations } from 'vuex'
export default {
  data() {
    return {
      locationData: '',
      searchResults: [],
    }
  },
  methods: {
    ...mapMutations('map',['clearAll']),
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