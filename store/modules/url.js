export default {
  namespaced: true,
  state: {
    type: 11,
    page: 1,
    perPage: 20,
    urlAverageList: [],
    urlAverageListCount: 0,
    currentUrlAverageDetail: null
  },
  actions: {
    async getUrlAverageList ({ commit, state, rootState }) {
      let { code, data, message } = await this.$axios.get('/api/url_average', {
        appId: rootState.auth.default_app_id,
        type: state.type,
        page: state.page,
        perPage: state.perPage
      })
      if (code === 1) {
        commit('SET_URL_AVERAGE_LIST', data.rows)
        commit('SET_URL_AVERAGE_LIST_COUNT', data.count)
      } else {
        this._vm.$Message.error(message)
      }
    },
    async getUrlAverageDetail ({ commit, rootState }, id) {
      let { code, data, message } = await this.$axios.get(`/api/url_average/${id}`, {
        appId: rootState.auth.default_app_id
      })
      if (code === 1) {
        commit('SET_CURRENT_URL_AVERAGE_DETAIL', data)
      } else {
        this._vm.$Message.error(message)
      }
    },
    setCurrentUrlAverageDetail ({ commit }, data) {
      commit('SET_CURRENT_URL_AVERAGE_DETAIL', data)
    },
    setCurrentPage ({ commit }, index) {
      commit('SET_CURRENT_PAGE', index)
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
    SET_CURRENT_URL_AVERAGE_DETAIL (state, is) {
      state.currentUrlAverageDetail = is
    }
  }
}