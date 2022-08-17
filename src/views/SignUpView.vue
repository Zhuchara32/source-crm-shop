<template>
  <form class="login-comp" @submit.prevent="submitSignUp">
    <h1 class="login-comp__heading">
      <router-link to="/login" class="login-comp__sign-up">Войти</router-link>
      или
      <span class="login-comp__log">Зарегистрироваться</span>
    </h1>
    <div class="login-comp__container">
      <p class="login-comp__float">
        <label for="login" class="login-comp__label">
          <font-awesome-icon class="icon" icon="user" />
          Логин
        </label>
        <input
          type="text"
          name="login"
          placeholder="Введите логин"
          class="login-comp__input"
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
      </p>
      <p class="login-comp__float">
        <label for="email" class="login-comp__label">
          <font-awesome-icon class="icon" icon="user" />
          Email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          class="login-comp__input"
          v-model.trim="email"
          :class="{ invalid: v$.email.$error }"
        >
        <ul class="invalid-list">
          <li class="invalid-list__errors"
            v-for="(error, index) of v$.email.$errors"
            :key="index"
          >
              {{ printErrorEmail(error.$validator, error.$params) }}
          </li>
        </ul>
      </p>
      <p class="login-comp__float">
          <label for="password" class="login-comp__label">
            <font-awesome-icon class="icon" icon="lock" />
            Пароль
          </label>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            class="login-comp__input login-comp__showpassword"
            v-model.trim="password"
            :class="{ invalid: v$.password.$error }"
          >
          <ul class="invalid-list">
            <li class="invalid-list__errors"
              v-for="(error, index) of v$.password.$errors"
              :key="index"
            >
              {{ printErrorPass(error.$validator, error.$params) }}
            </li>
          </ul>
      </p>
      <p class="login-comp__float">
          <label for="password" class="login-comp__label">
            <font-awesome-icon class="icon" icon="lock" />
            Пароль
          </label>
          <input
            type="password"
            name="password"
            placeholder="Подтвердите пароль"
            class="login-comp__input login-comp__showpassword"
            v-model.trim="passConfirm"
            :class="{ invalid: v$.passConfirm.$error }"
          >
          <ul class="invalid-list">
            <li class="invalid-list__errors"
              v-for="(error, index) of v$.passConfirm.$errors"
              :key="index"
            >
              {{ printErrorConfirmPass(error.$validator, error.$params) }}
            </li>
          </ul>
      </p>
    </div>
    <p class="login-comp__clearfix">
        <input class="login-comp__submit" type="submit" name="submit" value="Зарегистрироваться">
    </p>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { mapActions } from 'vuex'

export default {
  name: 'SignUpView',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      email: '',
      password: '',
      passConfirm: '',
      name: ''
      // agree: false
    }
  },
  validations () {
    return {
      email: { email, required, minLength: minLength(4) },
      password: { required, minLength: minLength(6) },
      passConfirm: { required, confirm: v => v === this.password },
      name: { required, minLength: minLength(4) }
      // agree: { checked: v => true }
    }
  },
  methods: {
    ...mapActions(['register']),
    printErrorName ($name, $param) {
      if ($name === 'required') {
        return 'Придумайте логин'
      } else if ($name === 'minLength') {
        return 'Минимальная длинна логина должна быть ' + $param.min + ' символов'
      }
    },
    printErrorEmail ($name, $param) {
      if ($name === 'required') {
        return 'Поле не должно быть пустым'
      } else if ($name === 'minLength') {
        return 'Минимальная длина должна быть ' + $param.min + ' символов'
      } else if ($name === 'email') {
        return 'Введите корректный email'
      }
    },
    printErrorPass ($name, $param) {
      if ($name === 'required') {
        return 'Введите пароль'
      } else if ($name === 'minLength') {
        return 'Минимальная длина пароля - ' + $param.min + ' символов'
      }
    },
    printErrorConfirmPass ($name, $param) {
      if ($name === 'required') {
        return 'Подтвердите пароль'
      } else if ($name === 'confirm') {
        return 'Пароли не совпадают'
      }
    },
    async submitSignUp () {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      try {
        await this.register(formData)
        this.$router.push('/login')
      } catch (e) {}
    }
  }
}
</script>
