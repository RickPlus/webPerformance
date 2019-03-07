<!--
 error list table component
-->
<template>
  <section class="error-list-table">
    <Table border :columns="tableType" :data="list" :loading="loading" >
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
          title: '页面地址',
          key: 'url'
        },
        {
          title: '报错文件',
          key: 'error_url'
        },
        {
          title: '报错信息',
          key: 'message'
        },
        {
          title: '行',
          key: 'line_no'
        },
        {
          title: '列',
          key: 'col_no'
        },
        {
          title: '访问时间',
          // key: 'visit_time',
          slot: 'visit_time'
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
    }
  }
}
</script>

<style lang="less">
  .table-error-row td{
    background-color: #ed4014 !important;
    color: #fff !important;
  }
  .table-warn-row td{
    background-color: #ff9900 !important;
    color: #fff !important;
  }
</style>
