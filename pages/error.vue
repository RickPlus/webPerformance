<template>
  <section>
    <error-list-table :loading="listLoading" :list="errorList" :page-info="{ page, perPage, count: errorListCount }" @on-change="changePage" />
  </section>
</template>
<script>
import { mapState } from 'vuex'
import ErrorListTable from '~/components/layout/ErrorListTable'

const getErrorList = async (store) => {
  await store.dispatch('error/getErrorList')
}

export default {
  components: {
    ErrorListTable
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('error', ['page', 'perPage', 'listLoading', 'errorList', 'errorListCount'])
  },
  async fetch ({ store }) {
    await getErrorList(store)
  },
  methods: {
    async changePage (index) {
      this.$store.dispatch('error/changeCurrentPage', index)
      await getErrorList(this.$store)
    }
  }
}
</script>
