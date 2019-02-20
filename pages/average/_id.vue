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
    <url-view-list-table :list="currentUrlAverageDetailList" :pageInfo="{count: currentUrlAverageDetailListCount, page: currentUrlAverageDetailListPage, perPage: currentUrlAverageDetailListPerPage}" @on-change="changePage"/>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import DetailCard from '~/components/urlAverageDetail/DetailCard'
import UrlViewListTable from '~/components/layout/UrlViewListTable'
import UrlAverageDetailParam from '@/utils/client/esum/UrlAverageDetailParam'

export default {
  name: 'url_detail',
  components: {
    DetailCard,
    UrlViewListTable
  },
  data () {
    return {
      urlAverageDetailParam: UrlAverageDetailParam
    }
  },
  async fetch ({ store, params, query }) {
    let { currentUrlAverageDetail } = store.state.average
    if (!currentUrlAverageDetail || currentUrlAverageDetail.id !== +params.id) {
      await store.dispatch('average/getUrlAverageDetail', params.id)
    }
    await store.dispatch('average/getUrlAverageDetailList', {
      id: params.id,
      type: query.type || 1
    })
  },
  computed: {
    ...mapState('average', ['currentUrlAverageDetail', 'currentUrlAverageDetailList', 'currentUrlAverageDetailListPage', 'currentUrlAverageDetailListPerPage', 'currentUrlAverageDetailListCount'])
  },
  methods: {
    async changePage (index) {
      let { dispatch } = this.$store
      dispatch('average/setCurrentUrlAverageDetailListPage', index)
      await dispatch('average/getUrlAverageDetailList', {
        id: this.$route.params.id,
        type: this.$route.query.type || 1
      })
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
