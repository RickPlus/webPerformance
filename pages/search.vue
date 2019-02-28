<template>
  <section class="search-page">
    <Form inline>
      <FormItem class="search-url">
        <Input type="text" v-model="formInline.url" placeholder="url"></Input>
      </FormItem>
      <FormItem class="search-type">
        <Select v-model="formInline.type" @on-change="changeType">
          <Option v-for="(item, index) in SearchUrlSelectType" :key="index" :value="index">{{item}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="search">搜索</Button>
      </FormItem>
    </Form>
    <url-view-list-table v-if="formInline.type === 'url'" :loading="listLoading" :list="list" :page-info="{ page, perPage, count }" @on-change="changePage" />
    <ajax-list-table v-if="formInline.type === 'ajax'" :loading="listLoading" :list="list" :page-info="{ page, perPage, count }" @on-change="changePage" />
    <error-list-table v-if="formInline.type === 'error'" :loading="listLoading" :list="list" :page-info="{ page, perPage, count }" @on-change="changePage" />
  </section>
</template>
<script>
import { mapState } from 'vuex'
import SearchUrlSelectType from '@/utils/client/esum/SearchUrlSelectType'
import UrlViewListTable from '~/components/layout/UrlViewListTable'
import AjaxListTable from '~/components/layout/AjaxListTable'
import ErrorListTable from '~/components/layout/ErrorListTable'
export default {
  components: {
    UrlViewListTable,
    AjaxListTable,
    ErrorListTable
  },
  data () {
    return {
      SearchUrlSelectType,
      formInline: {
        url: '',
        type: Object.keys(SearchUrlSelectType)[0]
      }
    }
  },
  async asyncData ({ store }) {
    let { searchType, searchUrl } = store.state.search
    return {
      formInline: {
        url: searchUrl,
        type: searchType || Object.keys(SearchUrlSelectType)[0]
      }
    }
  },
  computed: {
    ...mapState('search', ['listLoading', 'list', 'page', 'perPage', 'count'])
  },
  methods: {
    search () {
      let { dispatch } = this.$store
      dispatch('search/setCurrentPage', 1)
      dispatch('search/setCurrentSearchUrl', this.formInline.url)
      dispatch('search/setCurrentSearchType', this.formInline.type)
      this.getList()
    },
    changePage (index) {
      let { dispatch } = this.$store
      dispatch('search/setCurrentPage', index)
      this.getList()
    },
    async getList () {
      this.formInline.url && await this.$store.dispatch('search/getList')
    },
    changeType (type) {
      this.$store.dispatch('search/setCurrentSearchType', type)
      this.getList()
    }
  }
}
</script>
<style lang="less">
.search-page{
  .search-url{
    width: 50%;
  }
  .search-type{
    width: 20%;
  }
}
</style>
