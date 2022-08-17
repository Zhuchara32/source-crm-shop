<template>
  <form class="eddit" @submit.prevent="submitChange">
    <label for="img" class="eddit-label">
      Изменить изображение товара
    </label>
    <ul class="invalid-list">
      <li class="invalid-list__errors"
        v-for="(error, index) of v$.img.$errors"
        :key="index"
      >
        {{ printErrorImg(error.$validator, error.$params) }}
      </li>
    </ul>
    <input
      class="eddit-input"
      type="file"
      ref="fileImg"
      id="img"
      @change="changeImg"
      :class="{ invalid: v$.img.$error }"
    >

    <label for="nameProd" class="eddit-label">
      Название товара:
    </label>
    <ul class="invalid-list">
      <li class="invalid-list__errors"
        v-for="(error, index) of v$.nameProd.$errors"
        :key="index"
      >
        {{ printErrorNameProd(error.$validator, error.$params) }}
      </li>
    </ul>
    <input
      class="eddit-input"
      type="text"
      v-model="nameProd"
      id="nameProd"
      :class="{ invalid: v$.nameProd.$error }"
    >

    <label for="price" class="eddit-label">
      Укажите цену на товар:
    </label>
    <ul class="invalid-list">
      <li class="invalid-list__errors"
        v-for="(error, index) of v$.price.$errors"
        :key="index"
      >
        {{ printErrorPrice(error.$validator, error.$params) }}
      </li>
    </ul>
    <input
      type="number"
      class="eddit-input"
      v-model="price"
      id="price"
      :class="{ invalid: v$.price.$error }"
    >

    <label for="count" class="eddit-label">
      Количество товара:
    </label>
    <ul class="invalid-list">
      <li class="invalid-list__errors"
        v-for="(error, index) of v$.count.$errors"
        :key="index"
      >
        {{ printErrorCount(error.$validator, error.$params) }}
      </li>
    </ul>
    <input
      class="eddit-input"
      type="number"
      v-model="count"
      id="count"
      :class="{ invalid: v$.count.$error }"
    >

    <label for="description" class="eddit-label">
      Описание товара:
    </label>
    <ul class="invalid-list">
      <li class="invalid-list__errors"
        v-for="(error, index) of v$.description.$errors"
        :key="index"
      >
        {{ printErrorDescription(error.$validator, error.$params) }}
      </li>
    </ul>
    <textarea
      class="eddit-input"
      v-model="description"
      name="description"
      id="description"
      cols="30"
      rows="10"
      :class="{ invalid: v$.description.$error }"
    >
    </textarea>
    <button
      class="eddit-button save"
      type="submit"
    >
      Сохранить
    </button>
    <button
      type="button"
      class="eddit-button cancel"
      @click="cancelEddit(id)"
    >
      Отмена
    </button>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { mapActions } from 'vuex'

export default {
  name: 'EdditProduct',
  props: [
    'prod',
    'id'
  ],
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      description: this.prod.description,
      count: this.prod.count,
      price: this.prod.price,
      nameProd: this.prod.nameProd,
      img: this.prod.downloadURL,
      fileType: [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/jpg'
      ]
    }
  },
  validations () {
    return {
      nameProd: { required, minLength: minLength(5) },
      count: { required, integer: v => Number.isInteger(v) },
      price: { required },
      img: { isTrue: v => this.fileType.includes(v.type) || typeof v === 'string' },
      description: { required, minLength: minLength(20) }
    }
  },
  methods: {
    ...mapActions(['saveChange', 'cancelEddit']),
    async submitChange () {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      const formData = {
        id: this.id,
        typeProduct: this.prod.typeProduct,
        nameProd: this.nameProd,
        count: this.count,
        price: this.price,
        img: this.img,
        description: this.description,
        confirmEddit: this.prod.confirmEddit,
        confirmDelete: false,
        confirmCart: false
      }
      console.log(formData)
      try {
        console.log('try')
        await this.saveChange(formData)
        this.clearProd()
        this.v$.$reset()
        this.$message('Товар успешно изменен')
      } catch (e) {}
    },
    clearProd () {
      this.nameProd = ''
      this.count = null
      this.price = null
      this.img = ''
      this.description = ''
    },
    changeImg () {
      const file = this.$refs.fileImg.files[0]
      this.img = file
    },
    printErrorNameProd ($name, $param) {
      if ($name === 'required') {
        return 'Укажите название товара'
      } else if ($name === 'minLength') {
        return 'Минимальная длинна названия товара ' + $param.min + ' символов'
      }
    },
    printErrorCount ($name, $param) {
      if ($name === 'required') {
        return 'Укажите количество товара, которое есть в наличие'
      } else if ($name === 'integer') {
        return 'Количество товара должно быть целым числом'
      }
    },
    printErrorPrice ($name, $param) {
      if ($name === 'required') {
        return 'Укажите цену, за одну еденицу товара'
      }
    },
    printErrorImg ($name, $param) {
      if ($name === 'isTrue') {
        return 'Пожалуйста, выберите изображение, соответствующее требованиям к формату'
      }
    },
    printErrorDescription ($name, $param) {
      if ($name === 'required') {
        return 'Добавьте описание товара'
      } else if ($name === 'minLength') {
        return 'Минимальная длинна описания товара ' + $param.min + ' символов'
      }
    }
  }
}
</script>

<style lang="scss">
  .eddit {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-input {
      width: 300px;
      font-size: 13px;
      padding: 6px 0 4px 10px;
      border: 1px solid #cecece;
      background: #F6F6f6;
      border-radius: 8px;
      margin-bottom: 10px;
      display: block;
    }

    &-button {
      padding: 7px 10px;
      border: none;
      border-radius: 15px;
      color: #ffffff;
      transition: all 0.5s ease-out;

      &:hover {
        padding: 10px 13px;
        cursor: pointer;
      }
    }

    &-label {
      display: block;
    }
  }

  .save {
    background: #006400;
  }
  .cancel {
    background: #808080;
    margin-top: 5px;
  }
</style>
