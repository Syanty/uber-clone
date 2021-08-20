<template>
  <div class="bg-black text-white container-fluid flex flex-col space-y-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="col-span-1 lg:col-span-2">
        <Logo class="py-10" />
        <p class="lg:pb-10">Visit Help Center</p>
      </div>
      <div class="flex items-start justify-start lg:justify-end">
        <p>Donot sell my info(california)</p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-5 gap-y-8">
      <div class="flex-space-y" v-for="item in footerItems" :key="item.title">
        <h4>{{ item.title }}</h4>
        <ul>
          <li
            class="mb-3 cursor-pointer hover:opacity-90"
            v-for="list in item.list"
            :key="list"
          >
            <p class="inline-block">{{ list }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 py-4">
      <div class="flex flex-row items-center space-x-1 justify-center">
        <p
          v-for="(icon, index) in socialIcons"
          :key="index"
          class="
            p-3
            hover:bg-gray-500
            cursor-pointer
            active:scale-95
            transition
            transform
            duration-300
            ease-out
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path :d="icon" />
          </svg>
        </p>
      </div>
      <div
        class="
          col-span-1
          lg:col-span-2
          flex flex-col
          space-y-5
          sm:space-x-5
          sm:flex-row
          justify-center
        "
      >
        <p
          class="
            flex flex-row
            space-x-2
            justify-center
            items-center
            px-2
            hover:bg-gray-500
            cursor-pointer
            min-w-max
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
              clip-rule="evenodd"
            />
          </svg>
          <span>English(International)</span>
        </p>
        <p
          class="
            flex flex-row
            space-x-2
            items-center
            justify-center
            px-2
            hover:bg-gray-500
            cursor-pointer
            min-w-max
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>San Fransico Bay Area</span>
        </p>
      </div>
      <div class="flex flex-row items-center justify-between">
        <svg-playstore
          class="
            w-32
            h-14
            cursor-pointer
            active:scale-90
            transform
            transition
            duration-200
            ease-out
          "
        ></svg-playstore>
        <svg-applestore
          class="
            w-32
            h-14
            cursor-pointer
            active:scale-90
            transform
            transition
            duration-200
            ease-out
          "
        ></svg-applestore>
      </div>
    </div>
    <div class="flex flex-row items-center justify-between p-2 text-xs">
      <p>&copy; {{ new Date().getFullYear() }} Uber technologies Inc.</p>
      <p class="flex flex-row items-center space-x-5">
        <span>Privacy</span>
        <span>Accessibility</span>
        <span>Terms</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      footerItems: [
        {
          title: 'Company',
          list: [
            'About us',
            'Our offerings',
            'Newsroom',
            'Investors',
            'Blog',
            'Careers',
            'AI',
            'Giftcards',
          ],
        },
        {
          title: 'Products',
          list: [
            'Ride',
            'Drive',
            'Deliver',
            'Eat',
            'Uber for Business',
            'Uber frieght',
          ],
        },
        {
          title: 'Global citizenship',
          list: ['Safety', 'Diversity and Conclusion'],
        },
        {
          title: 'Travel',
          list: ['Airports', 'Cities'],
        },
      ],
      socialIcons: [
        'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z',
        'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
        'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z',
        'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
        'M14.829 6.302c-.738-.034-.96-.04-2.829-.04s-2.09.007-2.828.04c-1.899.087-2.783.986-2.87 2.87-.033.738-.041.959-.041 2.828s.008 2.09.041 2.829c.087 1.879.967 2.783 2.87 2.87.737.033.959.041 2.828.041 1.87 0 2.091-.007 2.829-.041 1.899-.086 2.782-.988 2.87-2.87.033-.738.04-.96.04-2.829s-.007-2.09-.04-2.828c-.088-1.883-.973-2.783-2.87-2.87zm-2.829 9.293c-1.985 0-3.595-1.609-3.595-3.595 0-1.985 1.61-3.594 3.595-3.594s3.595 1.609 3.595 3.594c0 1.985-1.61 3.595-3.595 3.595zm3.737-6.491c-.464 0-.84-.376-.84-.84 0-.464.376-.84.84-.84.464 0 .84.376.84.84 0 .463-.376.84-.84.84zm-1.404 2.896c0 1.289-1.045 2.333-2.333 2.333s-2.333-1.044-2.333-2.333c0-1.289 1.045-2.333 2.333-2.333s2.333 1.044 2.333 2.333zm-2.333-12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.958 14.886c-.115 2.545-1.532 3.955-4.071 4.072-.747.034-.986.042-2.887.042s-2.139-.008-2.886-.042c-2.544-.117-3.955-1.529-4.072-4.072-.034-.746-.042-.985-.042-2.886 0-1.901.008-2.139.042-2.886.117-2.544 1.529-3.955 4.072-4.071.747-.035.985-.043 2.886-.043s2.14.008 2.887.043c2.545.117 3.957 1.532 4.071 4.071.034.747.042.985.042 2.886 0 1.901-.008 2.14-.042 2.886z',
      ],
    }
  },
}
</script>