<template>
  <div>
    MULTIPURPOSE MODULE ({{ id }})
    <div v-html="text" />
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>
