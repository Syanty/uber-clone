<template>
  <div class="bg-gray-100 container-fluid">
    <div class="flex-space-y">
      <h2>There’s more to love in the apps</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="p-5 bg-white flex flex-row items-center cursor-pointer group"
        >
          <secondary-logo>
            <span>
              <svg-arrow-right></svg-arrow-right>
            </span>
          </secondary-logo>
          <div class="mx-auto text-center">
            <h3>Download the driver App</h3>
          </div>
          <svg-arrow-right
            class="
              group-hover:translate-x-3
              transform
              transition
              duration-200
              ease-out
            "
          ></svg-arrow-right>
        </div>
        <div
          class="p-5 bg-white flex flex-row items-center cursor-pointer group"
        >
          <secondary-logo></secondary-logo>
          <div class="mx-auto text-center">
            <h3>Download the App</h3>
          </div>
          <svg-arrow-right
            class="
              group-hover:translate-x-3
              transform
              transition
              duration-200
              ease-out
            "
          ></svg-arrow-right>
        </div>
      </div>
    </div>
  </div>
</template>