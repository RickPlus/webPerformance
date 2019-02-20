<template>
  <section class="search-page">
    <Form inline>
      <FormItem class="search-url">
        <Input type="text" v-model="formInline.url" placeholder="url"></Input>
      </FormItem>
      <FormItem class="search-type">
        <Select v-model="formInline.type">
          <Option v-for="(item, index) in SearchUrlSelectType" :key="index" :value="index">{{item}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="search">搜索</Button>
      </FormItem>
    </Form>
    <url-view-list-table v-if="formInline.type === 'url'" :loading="listLoading" :list="list" :page-info="{ page, perPage, count }" @on-change="changePage"></url-view-list-table>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import SearchUrlSelectType from '@/utils/client/esum/SearchUrlSelectType'
import UrlViewListTable from '~/components/layout/UrlViewListTable'
export default {
  components: {
    UrlViewListTable
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
    async search () {
      let { dispatch } = this.$store
      dispatch('search/setCurrentPage', 1)
      dispatch('search/setCurrentSearchUrl', this.formInline.url)
      dispatch('search/setCurrentSearchType', this.formInline.type)
      await dispatch('search/getList')
    },
    async changePage (index) {
      let { dispatch } = this.$store
      dispatch('search/setCurrentPage', index)
      await dispatch('search/getList')
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
