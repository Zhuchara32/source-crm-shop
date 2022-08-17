<template>
  <div class="profile" :class="{full: !isOpen}">
    <h2 class="profile-heading">Профиль</h2>
    <form class="profile-form">
      <label for="login">Введите новое имя: </label>
      <input
        name="login"
        class="profile-form__input"
        type="text"
        v-model="name"
        :class="{ invalid: v$.name.$error }"
      >
      <ul class="invalid-list">
        <li class="invalid-list__errors"
          v-for="(error, index) of v$.name.$errors"
          :key="index"
        >
            {{ printErrorName(error.$validator, error.$params) }}
        </li>
      </ul>
      <button
        class="profile-form__btn"
        type="submit"
        @click.prevent="changeInfo"
      >
        Сохранить изменения
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyProfile',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      name: ''
    }
  },
  validations () {
    return {
      name: { required, minLength: minLength(4) }
    }
  },
  computed: {
    ...mapGetters(['isOpen'])
  },
  methods: {
    ...mapActions(['newInfo']),
    printErrorName ($name, $param) {
      if ($name === 'required') {
        return 'Придумайте логин'
      } else if ($name === 'minLength') {
        return 'Минимальная длинна логина должна быть ' + $param.min + ' символов'
      }
    },
    async changeInfo () {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      const formData = {
        name: this.name
      }
      try {
        await this.newInfo(formData)
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss">
  .profile {
    width: 80vw;
    text-align: center;
    margin-left: 20vw;

    &-heading {
      margin: 10px auto;
    }

    &-form {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__input {
        width: 300px;
        font-size: 13px;
        padding: 6px 0 4px 10px;
        border: 1px solid #cecece;
        background: #F6F6f6;
        border-radius: 8px;
        margin-bottom: 10px;
      }

      &__btn {
        border: none;
        border-radius: 15px;
        width: 150px;
        height: 30px;
        background: #000080;
        color: #ffffff;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .invalid {
  border: 1px solid red;

  &-list {
    list-style-type: none;

    &__errors {
      color: red;
      padding: 5px;
      font-size: 11px;
    }
  }
}
</style>
