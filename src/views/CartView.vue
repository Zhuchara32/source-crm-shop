<template>
  <div class="cart">
    <router-link class="catalog" to="/">
      <p class="catalog-link">Вернуться к покупкам</p>
    </router-link>
    <CartItem
      v-for="(item, index) in cart"
      :key="item.uidProd"
      :cart_item_data="item"
      :idx="index"
      @deleteFromCart="deleteFromCart(index)"
      @incrementItem="increment(index)"
      @decrementItem="decrementItem(index)"
    />
    <div class="cart__total">
      <div class="total-app">
        <p class="total__name">Общая сумма:</p>
        <p>{{ cartTotalCost + ' $' }}</p>
      </div>
      <button
        class="total__btn"
        @click="CHANGE_ActiveModal"
      >
        Оформить покупку
      </button>
    </div>
    <teleport to="body">
      <ModalPurchase
        v-if="isActiveModal"
        :cart="cart"
      />
    </teleport>
  </div>
</template>

<script>
import CartItem from '../components/CartItem.vue'
import ModalPurchase from '../components/ModalPurchase.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CartView',
  components: {
    CartItem,
    ModalPurchase
  },
  computed: {
    ...mapGetters(['cart', 'isActiveModal']),
    cartTotalCost () {
      let result = []
      if (this.cart.length) {
        for (const item of this.cart) {
          result.push(item.price * item.quantity)
        }
        result = result.reduce((sum, el) => sum + el)
        return result
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions([
      'DELETEFromCart',
      'decrementItem',
      'incrementItem',
      'CHANGE_ActiveModal'
    ]),
    deleteFromCart (index) {
      this.DELETEFromCart(index)
    },
    increment (index) {
      this.incrementItem(index)
      if (this.cart[index].quantity === this.cart[index].count) {
        this.$message('У данного продавца не хватает товара на складе')
      }
    }
  }
}
</script>

<style lang="scss">
  .cart {
    min-height: calc(100vh - 60px);
    width: 96vw;;

    &__total {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      display: flex;
      justify-content: space-evenly;
      font-size: 20px;
      background: green;
      color: #ffffff;
    }
    .total {
      &-app {
        display: flex;
      }
      &__name {
        margin-right: 16px;
      }
      &__btn {
        border: none;
        border-radius: 8px;
        background: #F1C40F;
        padding: 10px;
        color: #ffffff;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .catalog {
      text-decoration: none;

      &-link {
        padding-bottom: 10px;
        text-align: left;
      }
    }
  }
</style>
