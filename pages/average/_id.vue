<template>
  <section>
    <Row class="url-average-detail-row">
      <Col v-for="(val, key) in currentUrlAverageDetail" :key="key" span="5" v-if="urlAverageDetailParam[key]">
        <detail-card :key="key" :title="urlAverageDetailParam[key]" :value="val" ></detail-card>
      </Col>
    </Row>
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
      urlAverageDetailParam: UrlAverageDetailParam
    }
  },
  async fetch ({ store, params }) {
    (!store.state.url.currentUrlAverageDetail || store.state.url.currentUrlAverageDetail.id !== params.id) && await store.dispatch('url/getUrlAverageDetail', params.id)
  },
  computed: {
    ...mapState('url', ['currentUrlAverageDetail'])
  }
}
</script>

<style lang="less">
  .url-average-detail-row{
    .ivu-col{
      margin: 5px;
    }
  }
</style>
