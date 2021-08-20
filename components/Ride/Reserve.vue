<template>
  <div class="bg-white container-fluid">
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="hidden lg:inline-flex bg-reserve bg-cover m-6"></div>
      <div class="lg:p-6 flex-space-y">
        <div class="flex-space-y">
          <h2>Reserve a ride in advance</h2>
          <p>
            Complete your plans today by reserving a ride. Request a ride up to
            30 days in advance, at any time and on any day of the year.
          </p>
          <p class="underline cursor-pointer">Learn about Uber Reserve</p>
        </div>
        <div class="flex-space-y">
          <h4>Destination</h4>
          <ride-form :placeholder="['Where from?', 'Where to?']"></ride-form>
          <h4>Choose date and time</h4>
          <div class="grid grid-cols-2 gap-2">
            <form-input :placeholder="'Date'"></form-input>
            <form-input :placeholder="'Time'"></form-input>
          </div>
          <button>Reserve a ride</button>
          <!-- if uber is not available -->
          <p class="opacity-70">
            Reserve may not be available for your pickup location
          </p>
        </div>
      </div>
    </div>
  </div>
</template>