<template>
  <form class="login-comp" @submit.prevent="onSubmit">
    <h1 class="login-comp__heading">
      <span class="login-comp__log">Войти</span>
      или
      <router-link to="/register" class="login-comp__sign-up">Зарегистрироваться</router-link>
    </h1>
    <div class="login-comp__container">
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
              {{ printError(error.$validator, error.$params) }}
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
              {{ printPasError(error.$validator, error.$params) }}
            </li>
          </ul>
      </p>
    </div>
    <p class="login-comp__clearfix">
        <input class="login-comp__submit" type="submit" name="submit" value="Войти">
    </p>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import messages from '@/utils/messages'
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations () {
    return {
      email: { email, required, minLength: minLength(4) },
      password: { required, minLength: minLength(6) }
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit () {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.login(formData)
        this.$router.push('/myProduct')
      } catch (e) {}
    },
    printError ($name, $param) {
      if ($name === 'required') {
        return 'Поле не должно быть пустым'
      } else if ($name === 'minLength') {
        return 'Минимальная длина должна быть ' + $param.min + ' символов'
      } else if ($name === 'email') {
        return 'Введите корректный email'
      }
    },
    printPasError ($name, $param) {
      if ($name === 'required') {
        return 'Введите пароль'
      } else if ($name === 'minLength') {
        return 'Минимальная длина пароля - ' + $param.min + ' символов'
      }
    }
  }
}
</script>

<style lang="scss">
.login-comp {
    width: 340px;
    padding: 15px;
    background: #fffaf6;
    border-radius: 4px;
    color: #7e7975;
    box-shadow:
        0 2px 2px rgba(0,0,0,0.2),
        0 1px 5px rgba(0,0,0,0.2),
        0 0 0 12px rgba(255,255,255,0.4);

  &__heading {
    font-size: 15px;
    font-weight: bold;
    color: #bdb5aa;
    padding-bottom: 8px;
    border-bottom: 1px solid #EBE6E2;
    text-shadow: 0 2px 0 rgba(255,255,255,0.8);
    box-shadow: 0 1px 0 rgba(255,255,255,0.8);
  }

  &__log {
    display: inline-block;
    text-transform: uppercase;
    color: #6c6763;
    padding-right: 2px;
  }

  &__sign-up {
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    color: #ffb347;
    padding-left: 2px;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__float {
    width: 50%;
    padding-top: 15px;
    border-top: 1px solid rgba(255,255,255,1);

    &:first-of-type {
      padding-right: 5px;
    }

    &:last-of-type {
      padding-left: 5px;
    }
  }

  &__input {
    font-size: 13px;
    font-weight: 400;
    display: block;
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 3px solid #ebe6e2;
    border-radius: 5px;
    transition: all 0.3s ease-out;
  }

  &__label {
    display: block;
    padding: 0 0 5px 2px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 400;
    text-shadow: 0 1px 0 rgba(255,255,255,0.8);
    font-size: 11px;
  }

  &__clearfix {
    display: flex;
    justify-content: center;
  }

  &__submit {
    width: 50%;
    height: 38px;
    box-shadow: inset 0 1px rgba(255,255,255,0.3);
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    font-weight: bold;
    margin: 0 auto;
    background: linear-gradient(#fbd568, #ffb347);
    border: 1px solid #f4ab4c;
    color: #996319;
    text-shadow: 0 1px rgba(255,255,255,0.3);

    &:hover {
      box-shadow:
        inset 0 1px rgba(255,255,255,0.3),
        inset 0 20px 40px rgba(255,255,255,0.15);
    }

    &:active {
      top: 1px;
    }
  }
}

.icon {
  margin-right: 5px;
  display: inline-block;
  width: 10px;
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
