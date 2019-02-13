<template>
  <section>
    <h2>
      路径：{{currentUrlAverageDetail.url}}
    </h2>
    <Row class="url-average-detail-row">
      <Col v-for="(val, key) in currentUrlAverageDetail" :key="key" span="5" v-if="urlAverageDetailParam[key]">
        <detail-card :key="key" :title="urlAverageDetailParam[key]" :value="val" ></detail-card>
      </Col>
    </Row>
    <Table border :columns="tableType" :data="currentUrlAverageDetailList">
      <template slot-scope="{ row }" slot="visit_time">
        <span>{{row.visit_time | formatDate('YYYY-MM-DD hh:mm:ss')}}</span>
      </template>
    </Table>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import DetailCard from '~/components/urlAverageDetail/DetailCard'
import UrlAverageDetailParam from '@/utils/client/esum/UrlAverageDetailParam'

export default {
  name: 'url_detail',
  components: {
    DetailCard
  },
  data () {
    return {
      urlAverageDetailParam: UrlAverageDetailParam,
      tableType: [
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
          title: '浏览器',
          key: 'browser_name'
        },
        {
          title: '浏览器版本',
          key: 'browser_version'
        },
        {
          title: '平台',
          key: 'device_type'
        },
        {
          title: 'os',
          key: 'os_name'
        },
        {
          title: '访问时间',
          // key: 'visit_time',
          slot: 'visit_time'
        },
        {
          title: '查看',
          key: 'action',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.goResourceDetail(params)
                }
              }
            }, '资源')
          }
        }
      ]
    }
  },
  async fetch ({ store, params, query }) {
    let { currentUrlAverageDetail } = store.state.url
    if (!currentUrlAverageDetail || currentUrlAverageDetail.id !== +params.id) {
      await store.dispatch('url/getUrlAverageDetail', params.id)
    }
    await store.dispatch('url/getUrlAverageDetailList', {
      id: params.id,
      type: query.type || 1
    })
  },
  computed: {
    ...mapState('url', ['currentUrlAverageDetail', 'currentUrlAverageDetailList'])
  },
  methods: {
    goResourceDetail (params) {
      this.$router.push(`/resource/${params.row.id}`)
    }
  }
}
</script>

<style lang="less">
  .url-average-detail-row{
    margin: 10px 0;
    .ivu-col{
      margin: 5px;
    }
  }
</style>
