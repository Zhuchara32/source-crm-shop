<template>
  <form
    class="add"
    :class="{full: !isOpen}"
    @submit.prevent="submitAddProd"
  >
    <h2 class="add-heading">
      Заполните необходимые поля, для добавления товара
    </h2>

    <label for="typeProduct" class="add-label">
      Тип продукта:
    </label>
    <ul class="invalid-list">
      <li class="invalid-list__errors"
        v-for="(error, index) of v$.typeProduct.$errors"
        :key="index"
      >
        {{ printErrorTypeProd(error.$validator, error.$params) }}
      </li>
    </ul>
    <select
      name="typeProduct"
      id="typeProduct"
      class="add-input"
      v-model="typeProduct"
      :class="{ invalid: v$.typeProduct.$error }"
    >
      <option value="" disabled selected></option>
      <option
        v-for="(name, key) in typeProd"
        :key="key"
        :value="name"
      >
        {{ name }}
      </option>
    </select>

    <label for="nameProd" class="add-label">
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
      class="add-input"
      type="text"
      v-model="nameProd"
      id="nameProd"
      :class="{ invalid: v$.nameProd.$error }"
    >

    <label for="description" class="add-label">
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
      class="add-input"
      v-model="description"
      name="description"
      id="description"
      cols="30"
      rows="10"
      :class="{ invalid: v$.description.$error }"
    >
    </textarea>

    <label for="count" class="add-label">
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
      class="add-input"
      type="number"
      v-model="count"
      id="count"
      :class="{ invalid: v$.count.$error }"
    >

    <label for="price" class="add-label">
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
      class="add-input"
      v-model="price"
      id="price"
      :class="{ invalid: v$.price.$error }"
    >

    <label for="img" class="add-label">
      Загрузите изображение товара
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
      class="add-input"
      type="file"
      ref="fileImg"
      id="img"
      @change="addImg"
      :class="{ invalid: v$.img.$error }"
    >

    <button class="add-btn" type="submit">
      Сохранить товар
    </button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

export default {
  name: 'AddProduct',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      typeProduct: '',
      nameProd: '',
      count: null,
      price: null,
      img: '',
      description: '',
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
      typeProduct: { required },
      nameProd: { required, minLength: minLength(5) },
      count: { required, integer: v => Number.isInteger(v) },
      price: { required },
      img: { required, isTrue: v => this.fileType.includes(v.type) },
      description: { required, minLength: minLength(20) }
    }
  },
  computed: {
    ...mapGetters(['isOpen', 'typeProd'])
  },
  methods: {
    ...mapActions([
      'addImage'
    ]),
    async submitAddProd () {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      const formData = {
        typeProduct: this.typeProduct,
        nameProd: this.nameProd,
        count: this.count,
        price: this.price,
        img: this.img,
        description: this.description,
        confirmEddit: false,
        confirmDelete: false,
        confirmCart: false
      }
      console.log(formData)
      try {
        await this.addImage(formData)
        this.clearProd()
        this.v$.$reset()
        this.$message('Товар успешно добавлен')
      } catch (e) {}
    },
    clearProd () {
      this.typeProduct = ''
      this.nameProd = ''
      this.count = null
      this.price = null
      this.img = ''
      this.description = ''
    },
    addImg () {
      const file = this.$refs.fileImg.files[0]
      this.img = file
    },
    printErrorTypeProd ($name, $param) {
      if ($name === 'required') {
        return 'Из выпадающего списка, выбирете тип товара'
      }
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
      if ($name === 'required') {
        return 'Добавьте изображение товара'
      } else if ($name === 'isTrue') {
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
  .add {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 80vw;
    margin-left: 20vw;

    &-btn {
      background: #8A2BE2;
      padding: 7px 10px;
      border: none;
      border-radius: 15px;
      color: #ffffff;
      transition: all 0.5s ease-out;

      &:active {
        padding: 9px 12px;
      }

      &:hover {
        cursor: pointer;
      }
    }

    &-heading {
      margin: 10px auto;
    }

    &-input {
      width: 300px;
      font-size: 13px;
      padding: 6px 0 4px 10px;
      border: 1px solid #cecece;
      background: #F6F6f6;
      border-radius: 8px;
      margin-bottom: 10px;
    }
  }
</style>
