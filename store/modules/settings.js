export default {
  namespaced: true,
  state: {
    appIdTableList: []
  },
  actions: {
    async getAppIdTableList ({ commit }) {
      let { code, data } = await this.$axios.get('/api/settings/appId')
      if (code === 1) {
        commit('SET_APP_ID_TABLE_LIST', data)
      }
    },
    async addAppId ({ commit }, params) {
      let { code, data } = await this.$axios.post('/api/settings/appId', params)
      if (code === 1) {
        commit('SET_APP_ID_TABLE_LIST_PUSH', data)
      }
    },
    async modifyAppId ({ commit }, { id, desc }) {
      let { code } = await this.$axios.put(`/api/settings/appId/${id}`, { desc })
      if (code === 1) {
        commit('SET_APP_ID_INFO', { id, desc })
      }
    }
  },
  mutations: {
    SET_APP_ID_TABLE_LIST (state, is) {
      state.appIdTableList = is
    },
    SET_APP_ID_TABLE_LIST_PUSH (state, is) {
      let list = state.appIdTableList
      list.push(is)
      state.appIdTableList = list
    },
    SET_APP_ID_INFO (state, { id, desc }) {
      let item = state.appIdTableList.find(o => o.id === id)
      item.desc = desc
    }
  }
}
