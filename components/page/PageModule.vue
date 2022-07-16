<template>
  <component :is="component" v-if="component" v-bind="module" />
</template>
<script>
import HeroModule from '../hero/HeroModule.vue'
import MultiPurposeModule from '../content/MultiPurposeModule.vue'

const MODULES = {
  hero: HeroModule,
  multipurpose: MultiPurposeModule,
}

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
