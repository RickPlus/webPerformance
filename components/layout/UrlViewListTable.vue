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
    <Drawer :width="800" title="Resource List" :closable="false" v-model="isShowResourceList">
      <section>
        <resource-process v-for="(item, index) in resourceList" :key="index" :url="item.url" :block="item.block_time + item.dns_time + item.tcp_time " :wait="item.wait_ttfb_time" :download="item.download_time" :duration="item.duration"/>
      </section>
    </Drawer>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import ResourceProcess from '~/components/layout/ResourceProcess'
export default {
  components: {
    ResourceProcess
  },
  data () {
    return {
      isShowResourceList: false,
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
                  this.getResourceList(params)
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
  computed: {
    ...mapState('resource', ['listLoading', 'resourceList'])
  },
  methods: {
    changePage (index) {
      this.$emit('on-change', index)
    },
    async getResourceList (params) {
      this.isShowResourceList = true
      await this.$store.dispatch('resource/getUrlResource', params.row.id)
    }
  }
}
</script>
