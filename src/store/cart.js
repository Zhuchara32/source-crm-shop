export default {
  state: {
    cart: [], // корзина покупателя
    isActiveModal: false // активность модального окна корзины
  },
  getters: {
    cart (state) {
      return state.cart
    },
    isActiveModal (state) {
      return state.isActiveModal
    }
  },
  mutations: {
    addToCart (state, prod) {
      if (state.cart.length) {
        let isProductEx = false
        const obj = state.cart.find(item => item.uidProd === prod.uidProd)
        if (obj) {
          isProductEx = true
          obj.quantity++
        }
        if (!isProductEx) {
          state.cart.push(prod)
        }
      } else {
        state.cart.push(prod)
      }
    },
    DELETEFromCart (state, idx) {
      state.cart.splice(idx, 1)
    },
    decrementItem (state, idx) {
      if (state.cart[idx].quantity > 1) {
        state.cart[idx].quantity--
      }
    },
    incrementItem (state, idx) {
      if (state.cart[idx].quantity < state.cart[idx].count) {
        state.cart[idx].quantity++
      }
    },
    CHANGE_ActiveModal (state) {
      state.isActiveModal = !state.isActiveModal
    },
    ADD_InfoToCart (state, dataInfo) {
      state.cart.forEach(item => {
        item.nameBuyer = dataInfo.nameBuyer
        item.address = dataInfo.address
        item.phone = dataInfo.phone
        item.isDelivered = false // доставленно
      })
    },
    CLEAR_Cart (state) {
      state.cart.splice(0, state.cart.length)
    }
  },
  actions: {
    CHANGE_ActiveModal ({ commit }) {
      commit('CHANGE_ActiveModal')
    },
    ADD_ToCart ({ commit }, prod) {
      commit('addToCart', prod)
    },
    DELETEFromCart ({ commit }, index) {
      commit('DELETEFromCart', index)
    },
    decrementItem ({ commit }, idx) {
      commit('decrementItem', idx)
    },
    incrementItem ({ commit }, idx) {
      commit('incrementItem', idx)
    }
  }
}
