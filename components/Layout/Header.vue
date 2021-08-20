<template>
  <div class="bg-black text-white py-2 px-5 lg:px-16 relative z-50">
    <div class="flex items-center justify-between text-sm font-medium">
      <!-- left -->
      <div class="flex items-center space-x-5">
        <Logo/>
        <div class="hidden lg:flex items-center space-x-1">
          <p
            class="flex items-center space-x-2 header-p"
            :class="companyDropdown?'bg-gray-800':''"
            @click="companyDropdown = !companyDropdown"
          >
            <span>Company</span>
            <svg
              v-if="!companyDropdown"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </p>
          <transition-dropdown>
            <div
              v-if="companyDropdown"
              class="bg-white absolute top-[68px] shadow-md w-44 py-2 font-normal"
            >
              <company-items></company-items>
            </div>
          </transition-dropdown>

          <p class="header-p">Safety</p>
          <p class="header-p">Help</p>
          <p class="header-p">COVID-19 resources</p>
        </div>
      </div>
      <!-- right -->
      <div class="flex items-center space-x-1">
        <p class="header-p hidden lg:flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            /></svg
          ><span>Products</span>
        </p>
        <p class="header-p flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            /></svg
          ><span class="hidden lg:inline-flex">Log in</span>
        </p>
        <p class="header-p bg-white text-black hover:bg-gray-300">Sign up</p>
        <p
          class="header-p inline-flex lg:hidden"
          :class="headerMenu ? 'bg-gray-800' : ''"
          @click="headerMenu = !headerMenu"
        >
          <svg
            v-if="!headerMenu"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </p>
      </div>
    </div>

    <transition-dropdown>
      <div
        v-if="headerMenu"
        class="
          absolute
          lg:hidden
          top-16
          bg-white
          text-black
          shadow-md
          left-0
          w-full
        "
      >
        <ul class="text-2xl">
          <li class="p-4 cursor-pointer hover:bg-gray-100">
            <p
              class="flex items-center justify-between "
              @click="companyDropdown = !companyDropdown"
            >
              <span>Company</span>
              <svg
                v-if="!companyDropdown"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </p>
          </li>
          <li v-if="companyDropdown" class="p-4">
            <div class="bg-white w-full py-2 font-normal text-base">
              <company-items></company-items>
            </div>
          </li>
          <li class="p-4 cursor-pointer hover:bg-gray-100">Safety</li>
          <li class="p-4 cursor-pointer hover:bg-gray-100">Help</li>
          <li class="p-4 cursor-pointer hover:bg-gray-100">
            COVID-19 Resources
          </li>
        </ul>
      </div>
    </transition-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyDropdown: false,
      headerMenu: false,
    }
  },
}
</script>