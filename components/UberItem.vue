<template>
  <li
    class="
      py-3
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
    <div v-if="!route" class="animate-pulse flex items-center space-x-4 w-full">
      <div class="rounded-full bg-blue-600 h-12 w-12"></div>
      <div class="flex-1 items-center space-y-4 py-1">
        <div class="h-4 bg-blue-500 rounded w-3/4"></div>
        <div class="space-y-2">
          <div class="h-4 bg-blue-500 rounded"></div>
          <div class="h-4 bg-blue-500 rounded w-5/6"></div>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center space-x-4 w-full">
      <svg-car class="h-12 w-12"></svg-car>
      <div class="flex items-center flex-row space-y-4 py-1 border-b w-full">
        <div class="flex flex-col w-full">
          <div class="flex flex-row items-center space-x-1">
            <p>Uber Name</p>
            <svg-users class="w-3 h-3"></svg-users>
            <p>4</p>
            <!-- number of passenger -->
          </div>
          <div class="space-y-2">
            <p class="text-sm">Description</p>
            <p class="text-xs">Availability</p>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <p class="font-semibold">Price</p>
          <p class="text-xs line-through opacity-70">price</p>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  props: ['route'],
}
</script>