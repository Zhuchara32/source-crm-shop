import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import product from './product'
import cart from './cart'

export default createStore({
  state: {
    isOpen: true,
    error: null
  },
  getters: {
    isOpen (state) {
      return state.isOpen
    },
    error (state) {
      return state.error
    }
  },
  mutations: {
    sidebarACTIVE (state) {
      state.isOpen = !state.isOpen
    },
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    sidebarACTIVE (ctx) {
      ctx.commit('sidebarACTIVE')
    }
  },
  modules: {
    auth,
    info,
    product,
    cart
  }
})
