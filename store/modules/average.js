export default {
  namespaced: true,
  state: {
    type: 1,
    page: 1,
    perPage: 20,
    listLoading: false,
    urlAverageList: [],
    urlAverageListCount: 0,
    currentUrlAverageDetail: null,
    currentUrlAverageDetailList: null,
    currentUrlAverageDetailListCount: 0,
    currentUrlAverageDetailListPage: 1,
    currentUrlAverageDetailListPerPage: 20
  },
  actions: {
    async getUrlAverageList ({ commit, state, rootState }) {
      commit('SET_LIST_LOADING', true)
      let { code, data, message } = await this.$axios.get('/api/url_average', {
        type: state.type,
        page: state.page,
        perPage: state.perPage
      })
      commit('SET_LIST_LOADING', false)
      if (code === 1) {
        commit('SET_URL_AVERAGE_LIST', data.rows)
        commit('SET_URL_AVERAGE_LIST_COUNT', data.count)
      } else {
        this._vm.$Message.error(message)
      }
    },
    async getUrlAverageDetail ({ commit, rootState }, id) {
      let { code, data, message } = await this.$axios.get(`/api/url_average/${id}`)
      if (code === 1) {
        commit('SET_CURRENT_URL_AVERAGE_DETAIL', data)
      } else {
        this._vm.$Message.error(message)
      }
    },
    async getUrlAverageDetailList ({ commit, rootState, state }, { id, type }) {
      let { code, data, message } = await this.$axios.get(`/api/url_average/${id}/list`, {
        type: type,
        page: state.currentUrlAverageDetailListPage,
        perPage: state.currentUrlAverageDetailListPerPage
      })
      if (code === 1) {
        commit('SET_CURRENT_URL_AVERAGE_DETAIL_LIST', data.rows)
        commit('SET_CURRENT_URL_AVERAGE_DETAIL_LIST_COUNT', data.count)
      } else {
        this._vm.$Message.error(message)
      }
    },
    setCurrentUrlAverageDetail ({ commit }, data) {
      commit('SET_CURRENT_URL_AVERAGE_DETAIL', data)
    },
    setCurrentUrlAverageDetailList ({ commit }, data) {
      commit('SET_CURRENT_URL_AVERAGE_DETAIL_LIST', data)
    },
    setCurrentPage ({ commit }, index) {
      commit('SET_CURRENT_PAGE', index)
    },
    setCurrentType ({ commit }, index) {
      commit('SET_CURRENT_TYPE', index)
    },
    setCurrentUrlAverageDetailListPage ({ commit }, index) {
      commit('SET_CURRENT_URL_AVERAGE_DETAIL_LIST_PAGE', index)
    }
  },
  mutations: {
    SET_URL_AVERAGE_LIST (state, is) {
      state.urlAverageList = is
    },
    SET_URL_AVERAGE_LIST_COUNT (state, is) {
      state.urlAverageListCount = is
    },
    SET_CURRENT_PAGE (state, is) {
      state.page = is
    },
    SET_CURRENT_TYPE (state, is) {
      state.type = is
    },
    SET_LIST_LOADING (state, is) {
      state.listLoading = is
    },
    SET_CURRENT_URL_AVERAGE_DETAIL (state, is) {
      state.currentUrlAverageDetail = is
    },
    SET_CURRENT_URL_AVERAGE_DETAIL_LIST (state, is) {
      state.currentUrlAverageDetailList = is
    },
    SET_CURRENT_URL_AVERAGE_DETAIL_LIST_PAGE (state, is) {
      state.currentUrlAverageDetailListPage = is
    },
    SET_CURRENT_URL_AVERAGE_DETAIL_LIST_COUNT (state, is) {
      state.currentUrlAverageDetailListCount = is
    }
  }
}
