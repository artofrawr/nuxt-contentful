<template>
  <div>
    <div
      v-for="(module, index) in modules"
      :key="`pagemodule-${index}-${module.id}`"
    >
      <PageModule :module="module" />
    </div>
  </div>
</template>
<script>
import PageModule from './PageModule'
export default {
  components: {
    PageModule,
  },
  props: {
    page: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      modules: this.page.pageModules || [],
    }
  },
}
</script>
