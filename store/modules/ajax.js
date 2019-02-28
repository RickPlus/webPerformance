export default {
  namespaced: true,
  state: {
    page: 1,
    perPage: 20,
    listLoading: false,
    ajaxList: [],
    ajaxListCount: 0
  },
  actions: {
    async getAjaxList ({ commit, state }) {
      commit('SET_LIST_LOADING', true)
      let { code, data } = await this.$axios.get('/api/url_ajax', {
        page: state.page,
        perPage: state.perPage
      })
      commit('SET_LIST_LOADING', false)
      if (code === 1) {
        commit('SET_URL_AJAX_LIST', data.rows)
        commit('SET_URL_AJAX_COUNT', data.count)
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
    SET_URL_AJAX_LIST (state, is) {
      state.ajaxList = is
    },
    SET_URL_AJAX_COUNT (state, is) {
      state.ajaxListCount = is
    },
    SET_CURRENT_PAGE (state, is) {
      state.page = is
    }
  }
}
