<template>
  <section>
    <Table border :columns="tableType" :data="urlAverageList"></Table>
    <Page :total="urlAverageListCount" :current="page" :page-size="perPage" v-if="urlAverageListCount > perPage" @on-change="changePage"></Page>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      tableType: [
        {
          title: 'URL(平均)',
          key: 'url'
        },
        {
          title: '调用次数',
          key: 'count'
        },
        {
          title: '加载时间',
          key: 'load_time'
        },
        {
          title: '白屏时间',
          key: 'white_time'
        },
        {
          title: 'DOM时间',
          key: 'dom_time'
        },
        {
          title: 'DNS时间',
          key: 'dns_time'
        },
        {
          title: 'TCP时间',
          key: 'tcp_time'
        },
        {
          title: '重定向时间',
          key: 'redirect_time'
        },
        {
          title: '资源时间',
          key: 'resource_time'
        },
        {
          title: 'DOM READY 时间',
          key: 'dom_ready_time'
        }
      ]
    }
  },
  async fetch ({ store }) {
    await store.dispatch('average/getUrlAverageList')
  },
  computed: {
    ...mapState('average', ['urlAverageList', 'urlAverageListCount', 'perPage', 'page'])
  },
  components: {},
  methods: {
    changePage (index) {
      this.$store.dispatch('average/setCurrentPage', index)
      this.$store.dispatch('average/getUrlAverageList')
    }
  }
}
</script>

<style>
</style>
