<template>
  <div class="h-full lg:h-[90vh] w-full z-30 fixed top-0 lg:top-[10vh]">
    <Map :pickupAddress="pickupAddress" :destinationAddress="destinationAddress">
      <div
        class="
          z-50
          w-full
          lg:w-[500px]
          h-[60%]
          lg:h-full
          absolute
          bottom-0
          flex justify-end items-end
          lg:justify-center
          lg:items-center
          overflow-y-scroll
          scrollbar-hide
        "
      >
        <search-ride
          @loadPickup="pickupAddress = $event"
          @loadDestination="destinationAddress = $event"
        ></search-ride>
      </div>
    </Map>
  </div>
</template>
<script>
export default {
  layout: 'auth',
  data() {
    return {
      pickupAddress: {},
      destinationAddress: {},
    }
  },
}
</script>