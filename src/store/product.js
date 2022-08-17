import firebase from 'firebase/app'

export default {
  state: {
    prodArr: [], // массив продуктов, для продавца
    arrForUsers: [], // массив продуктов, для покупателей
    // backUrl: 'http://localhost:3080/', // ссылка на бэк
    backUrl: 'https://secure-lowlands-49995.herokuapp.com/',
    objFilters: { // объект для вывода фильтров
      typeProduct: [],
      nameSeller: []
    },
    objFilterArrUsers: { // объект фильтров, на основе которого мы выводим отфильтрованный массив
      typeProduct: null,
      nameSeller: null,
      minPrice: null,
      maxPrice: null
    },
    filterArrForUsers: [], // массив отфильтрованных продуктов
    ordersArr: [] // массив заказов
  },
  getters: {
    prodArr (state) {
      return state.prodArr
    },
    arrForUsers (state) {
      return state.arrForUsers
    },
    objFilters (state) {
      return state.objFilters
    },
    objFilterArrUsers (state) {
      return state.objFilterArrUsers
    },
    filterArrForUsers (state) {
      return state.filterArrForUsers
    },
    ordersArr (state) {
      return state.ordersArr
    }
  },
  mutations: {
    setProd (state, data) {
      const keys = Object.keys(data)
      const value = Object.values(data)

      for (let i = 0; i < keys.length; i++) {
        const item = JSON.parse(JSON.stringify(value[i]))
        item.id = keys[i]
        state.prodArr.push(item)
      }
    },
    setSales (state, data) {
      const keys = Object.keys(data)
      const value = Object.values(data)

      for (let i = 0; i < keys.length; i++) {
        const item = JSON.parse(JSON.stringify(value[i]))
        item.idOrder = keys[i]
        state.ordersArr.push(item)
      }
    },
    // activeDelivered (state, id) {
    //   const objSale = state.ordersArr.find(el => el.idOrder === id)
    //   objSale.isDelivered = !objSale.isDelivered
    // },
    clearArr (state) {
      state.prodArr.splice(0, state.prodArr.length)
    },
    clearSales (state) {
      state.ordersArr.splice(0, state.ordersArr.length)
    },
    changeConfirmEddit (state, id) {
      const obj = state.prodArr.find(el => el.id === id)
      obj.confirmEddit = !obj.confirmEddit
    },
    cancelEddit (state, id) {
      const obj = state.prodArr.find(el => el.id === id)
      obj.confirmEddit = !obj.confirmEddit
    },
    setProdForUsers (state, users) {
      state.arrForUsers = Object.assign(users.prod)
      state.arrForUsers.forEach(item => { item.quantity = 1 })
    },
    setFilters (state) {
      for (let i = 0; i < state.arrForUsers.length; i++) {
        if (!state.objFilters.typeProduct.includes(state.arrForUsers[i].typeProduct)) {
          state.objFilters.typeProduct.push(state.arrForUsers[i].typeProduct)
        }
        if (!state.objFilters.nameSeller.includes(state.arrForUsers[i].nameSeller)) {
          state.objFilters.nameSeller.push(state.arrForUsers[i].nameSeller)
        }
      }
    },
    filterMenu (state, value) { // выводим массив с учетом фильтра, на странице покупателя
      for (const key in state.objFilterArrUsers) {
        if (key.toString() === value[0]) { // определяем какое из полей заполненно
          state.objFilterArrUsers[key] = value[1] // записываем значение в объект, относительно которого фильтруем
          const valuesArr = Object.values(state.objFilterArrUsers)
          const filterValuesArr = valuesArr.filter(el => el === null) // определяем сколько полей заполненно на странице калькулятора

          let arrProd = []
          if (key.toString() === 'minPrice') {
            arrProd = state.arrForUsers.filter(el => el.price >= value[1])
          } else if (key.toString() === 'maxPrice') {
            arrProd = state.arrForUsers.filter(el => el.price <= value[1])
          } else {
            arrProd = state.arrForUsers.filter(el => el[key] === value[1])
          }

          if (filterValuesArr.length < 3) {
            if (state.objFilterArrUsers.typeProduct !== null && state.objFilterArrUsers.typeProduct !== state.objFilterArrUsers[key]) {
              const amount = arrProd.filter(el => el.typeProduct !== state.objFilterArrUsers.typeProduct)

              for (let i = 0; i < amount.length; i++) {
                const idx = arrProd.findIndex(el => el.typeProduct !== state.objFilterArrUsers.typeProduct)
                arrProd.splice(idx, 1)
              }
            }
            if (state.objFilterArrUsers.nameSeller !== null && state.objFilterArrUsers.nameSeller !== state.objFilterArrUsers[key]) {
              const amount = arrProd.filter(el => el.nameSeller !== state.objFilterArrUsers.nameSeller)

              for (let i = 0; i < amount.length; i++) {
                const idx = arrProd.findIndex(el => el.nameSeller !== state.objFilterArrUsers.nameSeller)
                arrProd.splice(idx, 1)
              }
            }
            if (state.objFilterArrUsers.minPrice !== null && state.objFilterArrUsers.minPrice !== state.objFilterArrUsers[key]) {
              const amount = arrProd.filter(el => el.price < state.objFilterArrUsers.minPrice)

              for (let i = 0; i < amount.length; i++) {
                const idx = arrProd.findIndex(el => el.price < state.objFilterArrUsers.minPrice)
                arrProd.splice(idx, 1)
              }
            }
            if (state.objFilterArrUsers.maxPrice !== null && state.objFilterArrUsers.maxPrice !== state.objFilterArrUsers[key]) {
              const amount = arrProd.filter(el => el.price > state.objFilterArrUsers.maxPrice)

              for (let i = 0; i < amount.length; i++) {
                const idx = arrProd.findIndex(el => el.price > state.objFilterArrUsers.maxPrice)
                arrProd.splice(idx, 1)
              }
            }
          }

          if (state.filterArrForUsers.length > 0) { // если в отображаемом массиве уже есть что-то, то заменяем данные, так как изменились данные относительно которых фильруется главный массив
            state.filterArrForUsers.splice(0, state.filterArrForUsers.length, ...arrProd)
          } else { // если отображаемый массив пуст, то просто заполняем его отфильтрованными данными
            state.filterArrForUsers = arrProd.concat()
          }
        }
      }
    }
  },
  actions: {
    filterMenu ({ commit }, value) {
      commit('filterMenu', value)
    },
    async activeDelivered ({ dispatch, commit }, id) {
      const uid = await dispatch('getUid')
      commit('saveUid', uid)
      const isDelivered = true
      try {
        await firebase.database().ref(`/users/${uid}/sales/${id}/`).update({
          isDelivered
        })
        dispatch('clearSales')
        dispatch('fetchSales')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async saleProd ({ dispatch, commit, state }, { cart, dataInfo }) {
      commit('ADD_InfoToCart', dataInfo)
      const data = JSON.parse(JSON.stringify(cart))

      try {
        const res = await fetch(state.backUrl + 'api/sale',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        const j = await res.json()
        console.log(JSON.stringify(j))
      } catch (error) {
        console.error('Ошибка:', error)
      }
      dispatch('CHANGE_ActiveModal')
      commit('CLEAR_Cart')
    },
    clearArr ({ commit }) {
      commit('clearArr')
    },
    clearSales ({ commit }) {
      commit('clearSales')
    },
    async fetchProdForUsers ({ commit, state }) {
      const res = await fetch(state.backUrl + 'api/users')
      const data = await res.json()
      commit('setProdForUsers', data)
      commit('setFilters')
    },
    cancelEddit ({ commit }, id) {
      commit('cancelEddit', id)
    },
    changeConfirmEddit ({ commit }, id) {
      commit('changeConfirmEddit', id)
    },
    async deleteProd ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        commit('saveUid', uid)
        await firebase.database().ref(`/users/${uid}/products/${id}`).remove()
        await dispatch('fetchProd')
      } catch (e) {}
    },
    async fetchProd ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        commit('saveUid', uid)
        const data = (await firebase.database().ref(`/users/${uid}/products`).once('value')).val()
        await commit('setProd', data)
      } catch (e) {}
    },
    async fetchSales ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        commit('saveUid', uid)
        const data = (await firebase.database().ref(`/users/${uid}/sales`).once('value')).val()
        await commit('setSales', data)
      } catch (e) {}
    },
    async saveProduct ({ dispatch, commit },
      { typeProduct, nameProd, count, price, downloadURL, description, confirmEddit, confirmDelete, confirmCart }) {
      try {
        const uid = await dispatch('getUid')
        commit('saveUid', uid)
        const product = await firebase.database().ref(`/users/${uid}/products`).push({
          typeProduct, nameProd, count, price, downloadURL, description, confirmEddit, confirmDelete, confirmCart
        })
        return { typeProduct, nameProd, count, price, downloadURL, description, id: product.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    addImage ({ dispatch },
      { typeProduct, nameProd, count, price, img, description, confirmEddit, confirmDelete, confirmCart, id }) {
      const metadata = {
        contentType: img.type
      }
      const storageRef = firebase.storage().ref()
      const uploadTask = storageRef.child('/images/' + img.name).put(img, metadata)

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Загрузка приостановлена')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Выполняется загрузка')
              break
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('У Вас нет прав доступа')
              break
            case 'storage/canceled':
              console.log('Вы отменили загрузку')
              break

            case 'storage/unknown':
              console.log('Произошла неизвестная ошибка')
              break
          }
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            if (!confirmEddit) {
              dispatch('saveProduct', { typeProduct, nameProd, count, price, downloadURL, description, confirmEddit, confirmDelete, confirmCart })
            } else {
              dispatch('updateProd', { typeProduct, nameProd, count, price, downloadURL, description, id, confirmEddit, confirmDelete, confirmCart })
            }
          })
        }
      )
    },
    saveChange ({ dispatch, commit, state },
      { nameProd, count, price, img, description, id, confirmEddit, typeProduct, confirmDelete, confirmCart }) {
      const obj = state.prodArr.find(el => el.id === id)
      obj.confirmEddit = false
      console.log(obj)
      if (obj.downloadURL !== img) {
        dispatch('addImage', { nameProd, count, price, img, description, id, confirmEddit, typeProduct, confirmDelete, confirmCart })
      } else {
        dispatch('updateProd', { nameProd, count, price, img, description, id, confirmDelete, confirmCart, confirmEddit, typeProduct })
      }
    },
    async updateProd ({ dispatch, commit },
      { nameProd, count, price, img, downloadURL, description, id }) {
      if (!downloadURL) {
        try {
          const uid = await dispatch('getUid')
          commit('saveUid', uid)
          const downloadURL = img

          await firebase.database().ref(`/users/${uid}/products/${id}/`).update({
            nameProd, count, price, description, downloadURL
          })
          await dispatch('clearArr')
          await dispatch('fetchProd')
        } catch (e) {
          commit('setError', e)
          throw e
        }
      } else {
        try {
          const uid = await dispatch('getUid')
          commit('saveUid', uid)
          await firebase.database().ref(`/users/${uid}/products/${id}/`).update({
            nameProd, count, price, description, downloadURL
          })
          await dispatch('clearArr')
          await dispatch('fetchProd')
        } catch (e) {
          commit('setError', e)
          throw e
        }
      }
    }
  }
}
