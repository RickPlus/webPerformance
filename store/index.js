import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import Cookie from '../utils/client/cookie'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async nuxtServerInit ({ commit, state, dispatch }, { req, redirect, route }) {
      if (!route.fullPath.includes('/login')) {
        let token = req.headers.cookie ? Cookie.get('token', req.headers.cookie) : ''
        if (token) {
          commit('auth/SET_TOKEN', token)
          dispatch('auth/getCurrentUserInfo')
        } else {
          redirect(`/login?r=${route.fullPath}`)
        }
      }
    }
  },
  getters: {},
  modules: {
    auth
  }
})

export default store
