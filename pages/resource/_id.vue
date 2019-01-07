<template>
  <section>
    resource
  </section>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('resource', ['listLoading', 'resourceList'])
  },
  async fetch ({ store, params }) {
    await store.dispatch('resource/getUrlResource', params.id)
  }
}
</script>
<style lang="less">
</style>
