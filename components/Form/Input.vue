<template>
  <input type="text" @input="$emit('textInput',inputText)" :placeholder="placeholder" v-model="inputText"  />
</template>
<script>
export default {
  props: ['placeholder'],
  data() {
    return {
      inputText:""
    }
  },
}
</script>