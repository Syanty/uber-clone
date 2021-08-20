<template>
  <div class="bg-gray-100 container-fluid">
    <div class="flex-space-y">
      <h2>There’s more to love in the apps</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          class="p-5 bg-white flex flex-row items-center cursor-pointer group"
        >
          <div
            class="
              bg-black
              p-5
              text-white
              h-32
              flex
              items-center
              justify-center
            "
          >
            <h1 class="flex flex-col items-center justify-center">
              Uber
              <span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  /></svg
              ></span>
            </h1>
          </div>
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
          <div
            class="
              bg-black
              text-white
              h-32
              p-5
              flex
              items-center
              justify-center
            "
          >
            <h1>Uber</h1>
          </div>
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