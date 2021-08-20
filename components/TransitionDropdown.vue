<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-class="transform opacity-0 -translate-y-2"
    enter-to-class="transform opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-300"
    leave-class="transform opacity-100 -translate-y-0"
    leave-to-class="transform opacity-0 -translate-y-2"
  >
    <slot />
  </transition>
</template>