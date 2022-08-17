import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faUser, faAt, faBars, faCaretDown, faCartShopping, faCaretLeft, faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLock, faUser, faAt, faBars, faCaretDown, faCartShopping, faCaretLeft, faCircleExclamation, faCircleCheck)

firebase.initializeApp({
  // firebase param
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(store).use(router).use(messagePlugin).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
  }
})
