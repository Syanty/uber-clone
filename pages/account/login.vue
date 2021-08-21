<template>
  <div class="login h-screen">
    <div
      v-if="!socialModal"
      class="
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
    >
      <div class="flex-space-y justify-center">
        <div class="mx-auto">
          <p @click="$router.push('/')">
            <secondary-logo class="w-32 h-32 cursor-pointer"></secondary-logo>
          </p>
        </div>
        <div class="flex flex-col p-4">
          <h3>Get moving with Uber</h3>
          <p class="text-xs mb-5">Enter your phone number(required)</p>
          <vue-tel-input
            v-model="phone"
            @country-changed="countryChanged"
            class="bg-white"
          ></vue-tel-input>
          <p class="text-red-500" v-if="!isValid">Invalid phone number</p>
          <button
            class="mt-2 flex items-center flex-row space-x-5 justify-center"
            :class="validating ? 'cursor-not-allowed active:scale-100' : ''"
            :disabled="validating"
            @click="validate"
          >
            <svg-dotted-circle
              v-if="validating"
              :class="validating ? 'animate-spin text-white' : ''"
            ></svg-dotted-circle>
            <span>Next</span>
          </button>
          <p
            class="text-blue-500 font-medium p-4 cursor-pointer"
            @click="socialModal = true"
          >
            Or connect using a social account
          </p>
        </div>
      </div>
    </div>
    <!-- social account options modal -->
    <div
      v-if="socialModal"
      class="
        w-64
        sm:w-96
        rounded-md
        shadow-md
        px-4
        py-6
        bg-white
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
        space-y-5
        z-50
      "
    >
      <div>
        <p @click="socialModal = false" class="flex justify-end">
          <svg-close
            class="
              cursor-pointer
              transform
              transition
              duration-200
              ease-out
              hover:scale-110
            "
          ></svg-close>
        </p>
      </div>
      <h3>Choose an account</h3>
      <ul class="pt-5">
        <li
          class="
            p-2
            cursor-pointer
            flex flex-row
            items-center
            justify-between
            hover:bg-gray-200
            rounded-lg
          "
        >
          <span class="flex flex-row items-center space-x-5"
            ><svg-facebook></svg-facebook>
            <p class="font-semibold">Facebook</p></span
          >
          <svg-arrow-right></svg-arrow-right>
        </li>
        <li
          class="
            p-2
            cursor-pointer
            flex flex-row
            items-center
            justify-between
            hover:bg-gray-200
            rounded-lg
          "
        >
          <span class="flex flex-row space-x-5 items-center"
            ><svg-google></svg-google>
            <p class="font-semibold">Google</p></span
          >
          <svg-arrow-right></svg-arrow-right>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'account',
  data() {
    return {
      socialModal: false,
      phone: '',
      country: '',
      socialAccounts: [
        {
          title: 'Facebook',
          link: '',
          icon: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z',
        },
        {
          title: 'Google',
          link: '',
        },
      ],
      isValid: true,
      validating: false,
    }
  },
  methods: {
    countryChanged(country) {
      this.country = country
    },
    async validate() {
      this.validating = true
      await this.$axios
        .get(
          `http://apilayer.net/api/validate?access_key=${process.env.NUXT_ENV_NUMVERIFY_KEY}&number=${this.phone}&country_code=${this.country.iso2}&format=1`
        )
        .then((res) => {
          setTimeout(() => {
            this.isValid = res.data.valid
            this.validating = false
          }, 2000)
        })
    },
  },
}
</script>
<style scoped>
.login {
  background-color: #dfdbe5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='152' height='152' viewBox='0 0 152 152'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='temple' fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>