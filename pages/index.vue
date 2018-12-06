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
          title: 'URL',
          key: 'url',
          render: (h, params) => {
            return h('div', [
              h('a', {
                attrs: {
                  target: '_blank',
                  href: params.row.url
                }
              }, params.row.url)]
            )
          }
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
        },
        {
          title: '详细',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.goDetail(params)
                  }
                }
              }, '查看')]
            )
          }
        }
      ]
    }
  },
  async fetch ({ store }) {
    await store.dispatch('url/getUrlAverageList')
  },
  computed: {
    ...mapState('url', ['urlAverageList', 'urlAverageListCount', 'perPage', 'page'])
  },
  components: {},
  methods: {
    changePage (index) {
      this.$store.dispatch('url/setCurrentPage', index)
      this.$store.dispatch('url/getUrlAverageList')
    },
    goDetail (params) {
      this.$store.dispatch('url/setCurrentUrlAverageDetail', this.urlAverageList.find(o => o.id === params.row.id))
      console.log(this.$store)
      this.$router.push(`/average/${params.row.id}`)
    }
  }
}
</script>
