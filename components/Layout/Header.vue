<template>
  <div class="bg-black text-white py-2 px-5 lg:px-16 relative z-50">
    <div class="flex items-center justify-between text-sm font-medium">
      <!-- left -->
      <div class="flex items-center space-x-5">
        <Logo />
        <div class="hidden lg:flex items-center space-x-1">
          <p
            class="flex items-center space-x-2 header-p"
            :class="companyDropdown ? 'bg-gray-800' : ''"
            @click="companyDropdown = !companyDropdown"
          >
            <span>Company</span>
            <svg-chevron-down v-if="!companyDropdown"></svg-chevron-down>
            <svg-chevron-down
              v-else
              class="transform rotate-180"
            ></svg-chevron-down>
          </p>
          <!-- company dropdown -->
          <transition-dropdown>
            <div
              v-if="companyDropdown"
              class="
                bg-white
                absolute
                top-[60px]
                shadow-md
                w-44
                py-2
                font-normal
              "
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
          <svg-dashboard></svg-dashboard>
          <span>Products</span>
        </p>
        <p
          v-if="auth"
          :class="loginDropdown ? 'bg-gray-800' : ''"
          class="header-p flex items-center space-x-2"
          @click="$router.push('/auth/looking')"
        >
          <svg-user></svg-user>
          <span class="hidden lg:inline-block">Account</span>
        </p>
        <div v-else class="flex flex-row items-center space-x-1">
          <p
            :class="loginDropdown ? 'bg-gray-800' : ''"
            class="header-p flex items-center space-x-2"
            @click="
              loginDropdown = !loginDropdown
              signupDropdown = false
            "
          >
            <svg-user></svg-user>
            <span class="hidden lg:inline-block">Log in</span>
          </p>
          <p
            :class="
              signupDropdown ? 'bg-gray-800 text-white' : 'bg-white text-black'
            "
            class="header-p hover:bg-gray-300"
            @click="
              signupDropdown = !signupDropdown
              loginDropdown = false
            "
          >
            Sign up
          </p>
        </div>
        <p
          class="header-p inline-flex lg:hidden"
          :class="headerMenu ? 'bg-gray-800' : ''"
          @click="headerMenu = !headerMenu"
        >
          <svg-menu v-if="!headerMenu"></svg-menu>
          <svg-close v-else></svg-close>
        </p>
      </div>
    </div>
    <!-- header menu -->
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
              class="flex items-center justify-between"
              @click="companyDropdown = !companyDropdown"
            >
              <span>Company</span>
              <svg-chevron-down v-if="!companyDropdown"></svg-chevron-down>
              <svg-chevron-down
                v-else
                class="transform rotate-180"
              ></svg-chevron-down>
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

    <!-- login dropdown -->
    <transition-dropdown>
      <div
        v-if="loginDropdown"
        class="absolute top-14 bg-white text-black shadow-md left-0 w-full"
      >
        <ul class="text-2xl">
          <li
            class="p-4 cursor-pointer hover:bg-gray-100"
            v-for="item in loginItems"
            :key="item"
          >
            <p
              class="flex flex-row items-center justify-between"
              @click="
                $router.push({
                  path: '/account/login',
                  query: {
                    uber_client_name: item.title,
                    uber_client_type: item.type,
                    click_id: 'login',
                  },
                })
                signupDropdown = false
                loginDropdown = false
              "
            >
              <span>Sign in to {{ item.title }}</span>
              <svg-arrow-right></svg-arrow-right>
            </p>
          </li>
        </ul>
      </div>
    </transition-dropdown>
    <!-- signin dropdown -->
    <transition-dropdown>
      <div
        v-if="signupDropdown"
        class="absolute top-14 bg-white text-black shadow-md left-0 w-full"
      >
        <ul class="text-2xl">
          <li
            class="p-4 cursor-pointer hover:bg-gray-100"
            v-for="item in signupItems"
            :key="item"
          >
            <p
              class="flex flex-row items-center justify-between"
              @click="
                $router.push({
                  path: '/account/login',
                  query: {
                    uber_client_name: item.title,
                    uber_client_type: item.type,
                    click_id: 'signup',
                  },
                })
                signupDropdown = false
                loginDropdown = false
              "
            >
              <span>{{ item.title }}</span>
              <svg-arrow-right></svg-arrow-right>
            </p>
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
      auth: true,
      companyDropdown: false,
      headerMenu: false,
      loginDropdown: false,
      signupDropdown: false,
      loginItems: [
        { title: 'drive & deliver', type: 'drive_deliver' },
        { title: 'ride', type: 'ride' },
        { title: 'order delivery with Uber Eats', type: 'uber_eat' },
      ],
      signupItems: [
        { title: 'Signup to drive & deliver', type: 'drive_deliver' },
        { title: 'Create rider account', type: 'ride' },
        { title: 'Order delivery with Uber Eats', type: 'uber_eat' },
      ],
    }
  },
}
</script>
<style scoped>
p,
span {
  min-width: max-content;
}
</style>