export default {
  namespaced: true,
  state: {
    page: 1,
    perPage: 20,
    listLoading: false,
    errorList: [],
    errorListCount: 0
  },
  actions: {
    async getErrorList ({ commit, state }) {
      commit('SET_LIST_LOADING', true)
      let { code, data } = await this.$axios.get('/api/url_error', {
        page: state.page,
        perPage: state.perPage
      })
      commit('SET_LIST_LOADING', false)
      if (code === 1) {
        commit('SET_URL_ERROR_LIST', data.rows)
        commit('SET_URL_ERROR_COUNT', data.count)
      }
    },
    changeCurrentPage ({ commit }, index) {
      commit('SET_CURRENT_PAGE', index)
    }
  },
  mutations: {
    SET_LIST_LOADING (state, is) {
      state.listLoading = is
    },
    SET_URL_ERROR_LIST (state, is) {
      state.errorList = is
    },
    SET_URL_ERROR_COUNT (state, is) {
      state.errorListCount = is
    },
    SET_CURRENT_PAGE (state, is) {
      state.page = is
    }
  }
}
