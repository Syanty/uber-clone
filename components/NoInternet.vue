<template>
  <div class="w-screen h-screen bg-gray-200">
    <div class="bg-gray-900 h-1/3"></div>
    <div class="fixed transform -translate-x-1/2 top-24 left-1/2">
      <div
        class="
          flex
          items-center
          justify-center
          w-64
          h-64
          text-lg
          font-bold
          text-red-600
          transform
          bg-white
          rounded-full
          shadow-xl
          animate-bounce
        "
      >
        OFFLINE
      </div>
      <div
        class="
          flex
          items-center
          justify-center
          mt-5
          text-lg
          font-bold
          text-red-500
          sm:text-xl
        "
      >
        NO INTERNET CONNECTION
      </div>
      <div class="flex items-center justify-center">
        Slow or No Intenet connection
      </div>
      <div
        class="
          flex
          items-center
          justify-center
          text-sm text-blue-400
          transform
          animate-pulse
        "
      >
        Check your connection and Try again
      </div>
    </div>
  </div>
</template>