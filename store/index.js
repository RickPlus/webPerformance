import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import settings from './modules/settings'
import url from './modules/url'
import Cookie from '@/utils/client/cookie'

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
          // get current user info
          await dispatch('auth/getCurrentUserInfo')
          // get appids list for current
          await dispatch('settings/getAppIdTableList')
        } else {
          redirect(`/login?r=${route.fullPath}`)
        }
      }
    }
  },
  getters: {},
  modules: {
    auth,
    settings,
    url
  }
})

export default store
