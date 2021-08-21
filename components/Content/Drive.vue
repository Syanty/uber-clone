<template>
  <div class="flex-space-y">
    <div class="flex-space-y">
      <h1>Get in the driver’s seat and get paid</h1>
      <p>Drive on the platform with the largest network of active riders.</p>
    </div>
    <div class="flex-space-y sm:flex-space-x sm:space-y-0 items-center">
      <button
        class="sm:w-64"
        @click="
          $router.push({
            path: 'account/login',
            query: {
              uber_client_name: 'Signup to drive & deliver',
              uber_client_type: 'drive_deliver',
              click_id: 'signup',
            },
          })
        "
      >
        Sign up to drive
      </button>
      <p class="cursor-pointer mt-5 underline sm:text-center">
        Learn more about driving and delivering
      </p>
    </div>
  </div>
</template>