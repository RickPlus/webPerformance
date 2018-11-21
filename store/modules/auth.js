export default {
  namespaced: true,
  state: {
    token: '',
    uid: '',
    uname: ''
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
      }
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
    }
  }
}
