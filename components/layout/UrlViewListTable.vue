<!--
 url view list table component
-->
<template>
  <section class="url-view-list-table">
    <Table border :columns="tableType" :data="list" :loading="loading">
      <template slot-scope="{ row }" slot="visit_time">
        <span>{{row.visit_time | formatDate('YYYY-MM-DD hh:mm:ss')}}</span>
      </template>
    </Table>
    <Page :total="pageInfo.count" :current="pageInfo.page" :page-size="pageInfo.perPage" v-if="pageInfo.count > pageInfo.perPage" @on-change="changePage" />
  </section>
</template>
<script>
export default {
  data () {
    return {
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
                  this.goDetail(params)
                }
              }
            }, '详情')
          }
        }
      ]
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    pageInfo: {
      type: Object,
      default: () => {
        return {
          count: 0,
          page: 1,
          perPage: 0
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changePage (index) {
      this.$emit('on-change', index)
    },
    goDetail (params) {
      this.$router.push(`/url/${params.row.id}`)
    }
  }
}
</script>
