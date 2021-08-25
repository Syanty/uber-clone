<template>
  <li
    @click="fetchLocation(item.properties)"
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
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['item'],
  methods: {
    ...mapActions('map', ['setPickup', 'setDestination']),
    fetchLocation(location) {
      let query = {}
      const routeQuery = this.$route.query
      if (this.getPickupStatus) {
        this.setDestination({
          destination: {
            destination_address: location.formatted,
            destination_latitude: location.lat,
            destination_longitude: location.lon,
          },
          status: true,
        })
        query = {
          ...routeQuery,
          destination_address: location.formatted,
          destination_latitude: location.lat,
          destination_longitude: location.lon,
        }
      } else {
        this.setPickup({
          pickup: {
            pickup_address: location.formatted,
            pickup_latitude: location.lat,
            pickup_longitude: location.lon,
          },
          status: true,
        })

        query = {
          ...routeQuery,
          pickup_address: location.formatted,
          pickup_latitude: location.lat,
          pickup_longitude: location.lon,
        }
      }
      this.$emit('clearLocation')
      this.$router
        .replace({
          path: this.$route.path,
          query: query,
        })
        .catch(() => {})
    },
  },
  computed: {
    ...mapGetters('map', ['getPickupStatus', 'getDestinationStatus']),
  },
}
</script>