<template>
  <li class="client-item">
    <img
      class="client-item__img"
      :src="prod.downloadURL"
      alt="image"
    >
    <h6 class="client-item__name">
      {{ prod.nameProd }}
    </h6>
    <p class="client-item__price">
      Цена: {{ prod.price + ' usd'}}
    </p>
    <p class="client-item__description">
      Описание товара:
      {{ cutDescription() }}
    </p>
    <button
      class="client-item__btn"
      @click="addToCart"
    >
      Купить
    </button>
  </li>
</template>

<script>
export default {
  name: 'ClientList',
  props: [
    'prod'
  ],
  methods: {
    addToCart () {
      this.$emit('addToCart', this.prod)
    },
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
  .client-item {
    width: 25vw;
    padding: 10px;
    margin: 10px auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: .3s;
    border-radius: 10px;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
      cursor: pointer;
    }

    &__img {
      width: 200px;
      height: 200px;
      border-radius: 15px;
    }

    &__name {
      font-size: 16px;
      margin: 10px auto;
    }

    &__price {
      color: #008000;
    }

    &__description {
      width: 100%;
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
      background: #FF7F50;

      &:hover {
        padding: 7px 10px;
        cursor: pointer;
      }
    }
  }
</style>
