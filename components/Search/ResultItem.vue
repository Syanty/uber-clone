<template>
  <li
    @click="$emit('itemClicked',item.properties)"
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
export default {
  props: ['item'],
}
</script>