import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default {
  install (app, options) {
    app.config.globalProperties.$message = html => createToast(html)

    app.config.globalProperties.$error = html => {
      createToast(`[Ошибка]: ${html}`)
    }
  }
}
