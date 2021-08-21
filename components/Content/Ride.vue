<template>
  <div class="flex-space-y">
    <h1>Request a ride now</h1>
    <ride-form :placeholder="['Enter pickup location','Enter destination']"/>
    <div class="flex-space-y sm:flex-space-x sm:space-y-0 items-center">
      <button>Request now</button>
      <button
        class="bg-gray-300 text-black hover:opacity-100 hover:bg-gray-400"
      >
        Schedule for later
      </button>
    </div>
  </div>
</template>