<template>
  <div>
    <div v-if="page"><PageModules :page="page" /></div>
    <div v-else>
      <PageNotFound />
    </div>
  </div>
</template>
<script>
import PageNotFound from '../components/page/PageNotFound.vue'
import PageModules from '../components/page/PageModules.vue'
import { fetchPage, fieldsParser } from '~/plugins/contentful.js'

export default {
  components: { PageNotFound, PageModules },
  async asyncData({ route }) {
    const slug = route.path
    const response = await fetchPage(slug)
    const page = fieldsParser(response)

    return {
      page,
    }
  },
}
</script>
