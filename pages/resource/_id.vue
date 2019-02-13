<template>
  <section>
    <Tabs>
      <TabPane label="标签一">标签一的内容</TabPane>
      <TabPane label="标签二">标签二的内容</TabPane>
      <TabPane label="标签三">标签三的内容</TabPane>
    </Tabs>
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
