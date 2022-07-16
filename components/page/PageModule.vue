<template>
  <div v-if="component">
    <component :is="component" v-bind="module" />
  </div>
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
    console.log(this.module)
    return {
      component: MODULES[this.module.__typename],
    }
  },
}
</script>
