<!--
 ajax list table component
-->
<template>
  <section class="ajax-list-table">
    <Table border :columns="tableType" :data="list" :loading="loading" :row-class-name="rowClassName">
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
          title: '访问url',
          key: 'url'
        },
        {
          title: '请求url',
          key: 'request_url'
        },
        {
          title: '方法',
          key: 'method'
        },
        {
          title: '参数',
          key: 'params'
        },
        {
          title: '结果',
          key: 'status'
        },
        {
          title: '时长(ms)',
          key: 'duration'
        },
        {
          title: '大小(kb)',
          key: 'size'
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
    rowClassName (row) {
      if (+row.status !== 200) {
        return 'table-error-row'
      } else if (row.duration > 1000) {
        return 'table-warn-row'
      } else {
        return ''
      }
    },
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
