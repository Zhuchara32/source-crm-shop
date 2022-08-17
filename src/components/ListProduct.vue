<template>
  <li class="list-product">
    <div
      class="list-product__app"
      v-show="!prod.confirmEddit"
    >
      <img
        class="list-product__img"
        :src="prod.downloadURL"
        alt="image"
      >
      <h6 class="list-product__name">
        {{ prod.nameProd }}
      </h6>
      <p class="list-product__price">
        Цена: {{ prod.price + ' $' }}
      </p>
      <p class="list-product__count">
        Количество: {{ prod.count + ' шт' }}
      </p>
      <p class="list-product__discription">
        {{ cutDescription() }}
      </p>
      <button
        class="list-product__btn eddit-btn"
        @click="changeConfirmEddit(id)"
      >
        Изменить
      </button>
      <button
        class="list-product__btn delete"
        @click="deleteProd(id)"
      >
        Удалить
      </button>
    </div>
    <EdditProduct
        :prod="prod"
        :id="id"
        v-show="prod.confirmEddit"
      />
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import EdditProduct from './EdditProduct.vue'

export default {
  components: {
    EdditProduct
  },
  props: [
    'prod',
    'id'
  ],
  methods: {
    ...mapActions(['changeConfirmEddit', 'deleteProd']),
    cutDescription () {
      const arrDesc = this.prod.description.split('')
      if (arrDesc.length < 150) {
        return this.prod.description
      } else {
        arrDesc.splice(150, arrDesc.length - 150, '.', '.', '.')
        return arrDesc.join('')
      }
    }
  }
}
</script>

<style lang="scss">
  .list-product {
    padding: 10px;
    margin: 10px auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: .3s;
    border-radius: 10px;
    width: 40vw;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
      cursor: pointer;
    }

    &__img {
      width: 200px;
      height: 200px;
    }

    &__name {
      font-size: 16px;
      margin: 10px auto;
    }

    &__price {
      color: #008000;
    }

    &__count {
      margin: 10px auto;
    }

    &__description {
      width: 100px;
      font-size: 12px;
    }

    &__btn {
      padding: 5px 8px;
      border: none;
      border-radius: 5px;
      margin: 10px auto;
      font-size: 16px;
      color: #ffffff;
      transition: .3s;

      &:hover {
        padding: 7px 10px;
        cursor: pointer;
      }
    }
  }

  .eddit-btn {
    background: #00FFFF;
  }
  .delete {
    background: #FF0000;
    margin-left: 5px;
  }
</style>
