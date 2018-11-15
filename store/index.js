import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import Cookie from '../utils/client/cookie'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async nuxtServerInit ({ commit, state, dispatch }, { req, res, route }) {
      let token = req.headers.cookie ? Cookie.get('token', req.headers.cookie) : ''
      if (token) {
        commit('auth/SET_TOKEN', token)
        dispatch('auth/getCurrentUserInfo')
      }
    }
  },
  getters: {},
  modules: {
    auth
  }
})

export default store
