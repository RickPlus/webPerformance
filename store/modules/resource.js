export default {
  namespaced: true,
  state: {
    listLoading: false,
    resourceList: null
  },
  actions: {
    async getUrlResource ({ commit, state, rootState }, id) {
      commit('SET_LIST_LOADING', true)
      let { code, data } = await this.$axios.get(`/api/url_resource/${id}`)
      commit('SET_LIST_LOADING', false)
      if (code === 1) {
        commit('SET_RESOURCE_LIST', data)
      }
    }
  },
  mutations: {
    SET_LIST_LOADING (state, is) {
      state.listLoading = is
    },
    SET_RESOURCE_LIST (state, is) {
      state.resourceList = is
    }
  }
}
