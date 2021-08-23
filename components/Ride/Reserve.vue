<template>
  <div class="bg-white container-fluid">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="hidden md:inline-flex bg-reserve bg-cover m-6"></div>
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
          <div
            class="
              w-full
              flex flex-row
              items-center
              space-x-5
              sm:justify-between
            "
          >
            <client-only>
              <v-date-picker v-model="date" is-required :min-date="new Date()">
                <template #default="{ inputValue, inputEvents }">
                  <input
                    :value="inputValue"
                    v-on="inputEvents"
                    type="text"
                    class="w-full flex-grow"
                  />
                </template>
              </v-date-picker>
              <v-date-picker mode="time" v-model="date" is-required>
                <template #default="{ inputValue, inputEvents }">
                  <input
                    :value="inputValue"
                    v-on="inputEvents"
                    type="text"
                    class="w-full flex-grow"
                  />
                </template>
              </v-date-picker>
            </client-only>
          </div>
          <button>Reserve a ride</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: new Date(),
    }
  },
}
</script>