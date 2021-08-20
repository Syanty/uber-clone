<template>
  <div class="flex flex-col space-y-2">
    <span class="bg-gray-100 flex flex-row items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-2 w-2 mx-4"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"
        />
      </svg>
      <form-input
        @textInput="pickup = $event"
        :placeholder="placeholder[0]"
        class="flex-grow"
      ></form-input>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mx-4 cursor-pointer text-gray-300 hover:text-gray-400"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M0 9l24-9-8.986 24-3.014-12z" /></svg
    ></span>
    <div
      class="
        border border-black
        transform
        rotate-90
        w-16
        -translate-x-3
        border-opacity-70
      "
    ></div>
    <span class="bg-gray-100 flex flex-row items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-2 w-2 mx-4"
        viewBox="0 0 24 24"
      >
        <path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z" />
      </svg>
      <form-input
        @textInput="destination = $event"
        :placeholder="placeholder[1]"
        class="flex-grow"
      ></form-input>
    </span>
  </div>
</template>
<script>
export default {
  props: ['placeholder'],
  data() {
    return {
      pickup: '',
      destination: '',
    }
  },
}
</script>