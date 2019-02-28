<template>
  <section>
    <ajax-list-table :loading="listLoading" :list="ajaxList" :page-info="{ page, perPage, count: ajaxListCount }" @on-change="changePage" />
  </section>
</template>
<script>
import { mapState } from 'vuex'
import AjaxListTable from '~/components/layout/AjaxListTable'

const getAjaxList = async (store) => {
  await store.dispatch('ajax/getAjaxList')
}

export default {
  components: {
    AjaxListTable
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('ajax', ['page', 'perPage', 'listLoading', 'ajaxList', 'ajaxListCount'])
  },
  async fetch ({ store }) {
    await getAjaxList(store)
  },
  methods: {
    async changePage (index) {
      this.$store.dispatch('ajax/changeCurrentPage', index)
      await getAjaxList(this.$store)
    }
  }
}
</script>
