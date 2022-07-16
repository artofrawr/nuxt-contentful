<template>
  <div>HERO MODULE ({{ id }}): {{ title }}</div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
