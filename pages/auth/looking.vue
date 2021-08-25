<template>
  <div class="h-full lg:h-[90vh] w-full z-30 fixed top-0 lg:top-[10vh]">
    <Map @getRouteParam="route = $event" />
    <div
      class="
        flex
        z-50
        w-full
        lg:w-[500px]
        h-[65%]
        lg:h-full
        absolute
        lg:top-0
        justify-center
        items-center
      "
    >
      <search-ride :route="route"></search-ride>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'auth',
  data() {
    return {
      route: null,
    }
  },
}
</script>
