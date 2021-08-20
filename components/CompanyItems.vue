<template>
  <ul>
    <li
      v-for="(item, index) in companyitems"
      :key="index"
      class="
        cursor-pointer
        text-gray-400
        hover:text-gray-500
        hover:bg-gray-100
        p-2
      "
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      companyitems: [
        'About Us',
        'Our Offerings',
        'How uber works',
        'Global citizenship',
        'Newsroom',
        'Investor relations',
        'Blog',
        'Careers',
      ],
    }
  },
}
</script>