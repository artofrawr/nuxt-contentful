<template>
  <div :class="bg">HERO MODULE ({{ id }}): {{ title }}</div>
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
    bg: {
      type: String,
      default: 'bg-red-200',
    },
  },
}
</script>
