<template>
  <div
    :class="
      active === 'drive' ? 'bg-drive' : active === 'eat' ? 'bg-eat' : 'bg-ride'
    "
    class="p-0 lg:px-16 lg:py-20 bg-cover"
  >
    <div
      class="
        w-full
        flex
        items-center
        bg-white
        lg:rounded-t-md
        lg:w-1/2
        lg:shadow-md
        border-b border-gray-300
      "
    >
      <div
        @click="active = 'drive'"
        :class="active === 'drive' ? 'border-b-4' : ''"
        class="banner_item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M3 18h-2c-.552 0-1-.448-1-1v-2h15v-9h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.121-.728 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-6c0 1.656-1.344 3-3 3s-3-1.344-3-3zm3-1.2c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm12 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-4-2.8h-14v-10c0-.552.448-1 1-1h12c.552 0 1 .448 1 1v10zm3-6v3h4.715l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.42z"
          />
        </svg>
        <p class="hover:opacity-70">Drive or Deliver</p>
      </div>
      <div
        @click="active = 'eat'"
        :class="active === 'eat' ? 'border-b-4' : ''"
        class="banner_item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M18.496 24h-.001c-.715 0-1.5-.569-1.5-1.5v-8.5s-1.172-.003-2.467 0c.802-6.996 3.103-14 4.66-14 .447 0 .804.357.807.851.01 1.395.003 16.612.001 21.649 0 .828-.672 1.5-1.5 1.5zm-11.505-12.449c0-.691-.433-.917-1.377-1.673-.697-.56-1.177-1.433-1.088-2.322.252-2.537.862-7.575.862-7.575h.6v6h1.003l.223-6h.607l.173 6h1.003l.242-6h.562l.199 6h1.003v-6h.549s.674 5.005.951 7.55c.098.902-.409 1.792-1.122 2.356-.949.751-1.381.967-1.381 1.669v10.925c0 .828-.673 1.5-1.505 1.5-.831 0-1.504-.672-1.504-1.5v-10.93z"
          />
        </svg>
        <p class="hover:opacity-70">Eat</p>
      </div>
      <div
        @click="active = 'ride'"
        :class="active === 'ride' ? 'border-b-4' : ''"
        class="banner_item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z"
          />
        </svg>
        <p class="hover:opacity-70">Ride</p>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div
        class="
          bg-white
          col-span-2
          p-6
          lg:col-span-1
          lg:rounded-b-md
          lg:shadow-md
        "
      >
        <!-- banner item drive -->
        <content-drive v-if="active === 'drive'"/>
        <!-- banner item eat -->
        <content-eat v-else-if="active === 'eat'"/>

        <!-- banner item ride -->
        <content-ride v-else />
      </div>
      <div
        :class="
          active === 'drive'
            ? 'bg-drive'
            : active === 'eat'
            ? 'bg-eat'
            : 'bg-ride'
        "
        class="inline-flex col-span-2 lg:hidden h-64 bg-cover"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 'drive',
    }
  },
}
</script>