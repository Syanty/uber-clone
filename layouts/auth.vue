<template>
  <div class="h-screen">
    <div v-if="$nuxt.isOffline">
      <no-internet></no-internet>
    </div>
    <div v-else>
      <LayoutAuthHeader />
      <Nuxt />
    </div>
  </div>
</template>