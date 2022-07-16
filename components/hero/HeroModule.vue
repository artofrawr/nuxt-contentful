<template>
  <div :class="bg">HERO MODULE ({{ id }}): {{ title }}</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    bg: {
      type: String,
      default: '',
    },
  },
}
</script>
