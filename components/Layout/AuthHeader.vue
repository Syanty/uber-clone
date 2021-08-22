<template>
  <div
    class="
      bg-transparent
      lg:bg-black
      lg:text-white
      h-[10vh]
      sticky
      top-0
      z-40
      px-16
      flex
      items-center
    "
  >
    <div class="flex items-center justify-between text-sm font-medium w-full">
      <!-- left -->
      <div class="flex items-center space-x-5">
        <Logo />
        <!-- display on large screen -->
        <div class="hidden lg:flex items-center space-x-5">
          <a>Ride</a>
          <a>Drive</a>
          <a>More</a>
        </div>
      </div>
      <!-- right -->
      <div class="flex items-center">
        <!-- display on large screen -->
        <div class="hidden lg:flex items-center space-x-5">
          <a>Help</a>
          <a>Username</a>
        </div>
        <!-- display on small screen -->
        <div class="flex lg:hidden items-center space-x-5">
          <svg-circle-plus class="text-black"></svg-circle-plus>
          <svg-user class="text-black"></svg-user>
        </div>
      </div>
    </div>
  </div>
</template>