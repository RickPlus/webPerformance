import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import settings from './modules/settings'
import average from './modules/average'
import search from './modules/search'
import resource from './modules/resource'
import ajax from './modules/ajax'
import error from './modules/error'
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
    average,
    search,
    resource,
    ajax,
    error
  }
})

export default store
