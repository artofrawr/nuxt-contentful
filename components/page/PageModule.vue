<template>
  <component :is="component" v-if="component" v-bind="module" />
</template>
<script>
import MODULES from './modules'

export default {
  props: {
    module: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      component: MODULES[this.module.__typename],
    }
  },
}
</script>
