<template>
  <div
    class="
      absolute
      bg-white
      w-full
      h-full
      lg:w-[90%]
      lg:h-[90%]
      flex flex-col
      items-end
      lg:items-center
      lg:rounded-lg
      lg:shadow-lg
    "
  >
    <div
      class="
        bg-blue-700
        w-full
        text-white
        p-10
        flex
        lg:rounded-t-lg
        flex-col
        space-y-2
      "
    >
      <h2 v-if="!pickupLoaded">Where can we pick you up?</h2>
      <div v-else class="flex flex-col space-y-5">
        <h3
          class="flex flex-row space-x-2 items-center truncate cursor-pointer"
          @click="$emit('setPickupLoaded', pickupAddress.name)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-2 w-2 mx-4"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"
            /></svg
          ><span>{{ pickupAddress.name || 'Where From?' }}</span>
        </h3>
        <div
          class="
            border border-black
            transform
            rotate-90
            w-14
            -translate-x-2
            border-opacity-70
          "
        ></div>
        <h3
          class="flex flex-row space-x-2 items-center truncate cursor-pointer"
          @click="$emit('setCoordsLoaded', destinationAddress.name)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-2 w-2 mx-4"
            viewBox="0 0 24 24"
          >
            <path d="M22 2v20h-20v-2030zm2-2h-24v24h24v-24z" /></svg
          ><span>{{ destinationAddress.name || 'Where To?' }}</span>
        </h3>
      </div>
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
        <div class="flex sticky -top-10 flex-col space-x-2 bg-white">
          <input
            v-if="!coordsLoaded"
            type="text"
            :placeholder="pickupLoaded ? 'Destination' : 'Pickup Location'"
            @input="passSearchItem"
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

        <div v-if="coordsLoaded">
          <ul>
            <li
              v-for="i in 20"
              :key="i"
              class="
                py-2
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
            v-for="item in getSearchResults"
            :key="item.properties.place_id"
            :item="item"
            @itemClicked="$emit('getClickedSearchItem', $event)"
          ></search-result-item>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    'location',
    'searchResultItemClicked',
    'autoComplete',
    'getSearchResults',
    'pickupLoaded',
    'coordsLoaded',
    'pickupAddress',
    'destinationAddress',
  ],
  data() {
    return {
      locationData: '',
      clickedSearchItem: {},
    }
  },
  methods: {
    passSearchItem() {
      setTimeout(() => {
        this.$emit('getLocation', this.locationData)
      }, 2000)
    },
  },
  watch: {
    location: function () {
      this.locationData = this.location
    },
    /* pickupLoaded:function(){
      this.pickupStatus = this.pickupLoaded
    },
    coordsLoaded:function(){
      this.destStatus = this.coordsLoaded
    } */
  },
}
</script>