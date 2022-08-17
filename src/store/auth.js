import firebase from 'firebase/app'

export default {
  state: {
    uid: null
  },
  getters: {
    uid (state) {
      return state.uid
    }
  },
  mutations: {
    saveUid (state, uid) {
      state.uid = uid
    }
  },
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        commit('saveUid', uid)
        await firebase.database().ref(`/users/${uid}/info`).set({
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async goOut ({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfoAndUid')
    }
  }
}
