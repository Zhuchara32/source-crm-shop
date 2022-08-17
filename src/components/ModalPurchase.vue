<template>
  <div class="modal">
    <form
      class="modal-app"
    >
      <label
        for="nameBuyer"
        class="modal-name"
      >
        Укажите имя покупателя
      </label>
      <input
        type="text"
        name="nameBuyer"
        v-model="nameBuyer"
        class="modal-input"
        :class="{ invalid: v$.nameBuyer.$error }"
      >
      <ul class="invalid-list">
        <li class="invalid-list__errors"
          v-for="(error, index) of v$.nameBuyer.$errors"
          :key="index"
        >
          {{ printNameBuyerError(error.$validator, error.$params) }}
        </li>
      </ul>
      <label
        for="addressBuyer"
        class="modal-name"
      >
        Укажите адрес доставки
      </label>
      <input
        type="text"
        name="addressBuyer"
        v-model="address"
        class="modal-input"
        :class="{ invalid: v$.address.$error }"
      >
      <ul class="invalid-list">
        <li class="invalid-list__errors"
          v-for="(error, index) of v$.address.$errors"
          :key="index"
        >
          {{ printAddressError(error.$validator, error.$params) }}
        </li>
      </ul>
      <label
        for="phoneBuyer"
        class="modal-name"
      >
        Укажите номер телефона получателя
      </label>
      <input
        type="tel"
        name="phoneBuyer"
        v-model.trim="phone"
        class="modal-input"
        :class="{ invalid: v$.phone.$error }"
      >
      <ul class="invalid-list">
        <li class="invalid-list__errors"
          v-for="(error, index) of v$.phone.$errors"
          :key="index"
        >
          {{ printPhoneError(error.$validator, error.$params) }}
        </li>
      </ul>
      <div class="modal-container">
        <button
          type="submit"
          class="modal-btn save"
          @click.prevent="addInfoSale(cart)"
        >
          Оформить заказ
        </button>
        <button
          class="modal-btn cancel"
          type="button"
          @click="CHANGE_ActiveModal"
        >
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { mapActions } from 'vuex'

export default {
  name: 'ModalPurchase',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      nameBuyer: '',
      address: '',
      phone: '',
      valid: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    }
  },
  validations () {
    return {
      phone: { phone: v => this.valid.test(v), required, minLength: minLength(10) },
      nameBuyer: { required, minLength: minLength(6) },
      address: { required, minLength: minLength(10) }
    }
  },
  props: {
    cart: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    ...mapActions(['saleProd', 'CHANGE_ActiveModal']),
    async addInfoSale (cart) {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      const dataInfo = {
        nameBuyer: this.nameBuyer,
        address: this.address,
        phone: this.phone
      }

      try {
        await this.saleProd({ cart, dataInfo })
        this.clarInfo()
        this.$router.push('/')
      } catch (e) {}
    },
    clarInfo () {
      this.nameBuyer = ''
      this.address = ''
      this.phone = ''
    },
    printNameBuyerError ($name, $param) {
      if ($name === 'required') {
        return 'Поле не должно быть пустым'
      } else if ($name === 'minLength') {
        return 'Минимальная длина должна быть ' + $param.min + ' символов'
      }
    },
    printAddressError ($name, $param) {
      if ($name === 'required') {
        return 'Поле не должно быть пустым'
      } else if ($name === 'minLength') {
        return 'Минимальная длина должна быть ' + $param.min + ' символов'
      }
    },
    printPhoneError ($name, $param) {
      if ($name === 'required') {
        return 'Поле не должно быть пустым'
      } else if ($name === 'minLength') {
        return 'Минимальная длина должна быть ' + $param.min + ' символов'
      } else if ($name === 'phone') {
        return 'Введите корректный номер телефона'
      }
    }
  }
}
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: calc(50vh - 200px);
    left: calc(50vw - 250px);
    width: 500px;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    border-radius: 10px;

    &-app {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    &-name {
      font-size: 18px;
      color: #ffffff;
      margin-bottom: 10px;
    }

    &-input {
      border: none;
      border-radius: 8px;
      height: 25px;
      width: 300px;
      margin-bottom: 20px;
    }

    &-container {
      width: 300px;
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
    }

    &-btn {
      padding:10px;
      border-radius: 10px;
      border: none;
      color: #ffffff;
      font-weight: bold;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .save {
    background: #145A32;
  }

  .cancel {
    background: #B2BABB;
  }

  .invalid {
    border: 1px solid red;

    &-list {
      list-style-type: none;

      &__errors {
      color: red;
      padding: 5px;
      font-size: 9px;
    }
  }
}
</style>
