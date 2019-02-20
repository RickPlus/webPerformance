export default {
  namespaced: true,
  state: {
    searchUrl: '',
    searchType: 'url',
    listLoading: false,
    list: [],
    page: 1,
    perPage: 20,
    count: 0
  },
  actions: {
    async getList ({ commit, state }) {
      commit('SET_LIST_LOADING', true)
      let { code, data } = await this.$axios.get(`/api/search/${state.searchType}`, {
        url: state.searchUrl,
        page: state.page,
        perPage: state.perPage
      })
      commit('SET_LIST_LOADING', false)
      if (code === 1) {
        commit('SET_LIST', data.rows)
        commit('SET_LIST_COUNT', data.count)
      }
    },
    setCurrentPage ({ commit }, value) {
      commit('SET_CURRENT_PAGE', value)
    },
    setCurrentSearchUrl ({ commit }, value) {
      commit('SET_CURRENT_SEARCH_URL', value)
    },
    setCurrentSearchType ({ commit }, value) {
      commit('SET_CURRENT_SEARCH_TYPE', value)
    }
  },
  mutations: {
    SET_LIST_LOADING (state, is) {
      state.listLoading = is
    },
    SET_LIST (state, is) {
      state.list = is
    },
    SET_LIST_COUNT (state, is) {
      state.count = is
    },
    SET_CURRENT_PAGE (state, is) {
      state.page = is
    },
    SET_CURRENT_SEARCH_URL (state, is) {
      state.searchUrl = is
    },
    SET_CURRENT_SEARCH_TYPE (state, is) {
      state.searchType = is
    }
  }
}
