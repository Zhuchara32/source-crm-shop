<template>
  <div class="cart-item">
    <img
      :src="cart_item_data.downloadURL"
      alt="img"
      class="cart-item__img"
    >
    <div class="cart-item__app">
      <h6 class="cart-item__name">
        {{ cart_item_data.nameProd }}
      </h6>
      <p class="cart-item__price">
        {{ cart_item_data.price + ' $' }}
      </p>
      <p class="cart-item__description">
        {{ cart_item_data.description }}
      </p>
    </div>
    <div class="cart-item__quantity">
      <p>Количество</p>
      <span>
        <span class="quantity__btn" @click="decrementItem">-</span>
          {{ cart_item_data.quantity }}
        <span class="quantity__btn" @click="incrementItem">+</span>
      </span>
    </div>
    <button
      class="cart-item__btn"
      @click="deleteFromCart"
    >
      Удалить
    </button>
  </div>
</template>

<script>

export default {
  name: 'CartItem',
  props: {
    cart_item_data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    deleteFromCart () {
      this.$emit('deleteFromCart')
    },
    decrementItem () {
      this.$emit('decrementItem')
    },
    incrementItem () {
      this.$emit('incrementItem')
    }
  }
}
</script>

<style lang="scss">
  .cart-item {
    width: 96vw;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 10px;
    background: #F1C40F;

    &__app {
      width: 50vw;
    }

    &__img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
    }

    &__name {
      font-size: 16px;
    }

    &__price {
      color: #008000;
      margin: 5px auto;
    }

    &__btn {
      border: none;
      border-radius: 5px;
      padding: 5px;
      background: #C0392B;
      color: #ffffff;

      &:hover {
        cursor: pointer;
        padding: 7px;
      }
    }

    .quantity__btn {
      cursor: pointer;
      color: #2E86C1;
    }
    .quantity__show {
      justify-self: flex-end;
    }
  }
</style>
