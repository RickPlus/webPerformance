export default {
  namespaced: true,
  state: {
    token: '',
    uid: '',
    uname: '',
    default_app_id: ''
  },
  actions: {
    async login ({ commit }, params) {
      let { code, data, message } = await this.$axios.post('/open/login', params)
      if (code === 1) {
        commit('SET_TOKEN', data)
      } else {
        this._vm.$Message.error(message)
      }
    },
    async getCurrentUserInfo ({ commit }) {
      let { code, data } = await this.$axios.post('/api/user/current')
      if (code === 1) {
        commit('SET_UID', data.id)
        commit('SET_UNAME', data.name)
        commit('SET_DEFAULT_APP_ID', data.default_app_id)
      }
    },
    async modifyUserInfo ({ commit, state }, params) {
      let { code } = await this.$axios.put(`/api/user/${state.uid}`, params)
      if (code === 1) {
        params.name && commit('SET_UNAME', params.name)
        params.default_app_id && commit('SET_DEFAULT_APP_ID', params.default_app_id)
      }
    },
    clientSelectAppId ({ commit }, id) {
      commit('SET_DEFAULT_APP_ID', id)
    }
  },
  mutations: {
    SET_TOKEN (state, is) {
      state.token = is
    },
    SET_UID (state, is) {
      state.uid = is
    },
    SET_UNAME (state, is) {
      state.uname = is
    },
    SET_DEFAULT_APP_ID (state, is) {
      state.default_app_id = is
    }
  }
}
