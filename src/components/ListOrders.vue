<template>
  <li class="list-orders">
    <img
      class="list-orders__img"
      :src="order.downloadURL"
      alt="img product"
    >
    <div class="list-orders__app">
      <h6 class="list-orders__name">
        {{ order.nameProd }}
      </h6>
      <p class="list-orders__price">
        {{ order.price + '$' }}
      </p>
    </div>
    <div class="list-orders__info">
      <p>{{ order.nameBuyer }}</p>
      <p>
        {{ order.address }}
      </p>
      <p>
        {{ order.phone }}
      </p>
    </div>
    <div class="list-orders__quantity">
      <p>
        Количество:
      </p>
      <p>
        {{ order.quantity }}
      </p>
    </div>
    <div class="list-orders__status">
      <font-awesome-icon
        class="list-orders__icon"
        icon="circle-exclamation"
        v-show="!order.isDelivered"
      />
      <font-awesome-icon
        class="list-orders__icon"
        icon="circle-check"
        v-show="order.isDelivered"
      />
      <button
        class="list-orders__btn"
        :class="{ disabled: order.isDelivered }"
        :disabled="order.isDelivered"
        @click="activeDelivered(order.idOrder)"
      >
        Товар доставлен
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ListOrders',
  props: {
    order: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    ...mapActions(['activeDelivered'])
  }
}
</script>

<style lang="scss">
  .list-orders {
    width: 70vw;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 10px;
    background: #F1C40F;

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

    &__icon {
      font-size: 30px;
    }

    &__status {
      display: flex;
      flex-direction: column;
    }

    &__btn {
      border: none;
      border-radius: 5px;
      padding: 5px;
      background: #C0392B;
      color: #ffffff;
      margin-top: 10px;

      &:hover {
        cursor: pointer;
        // padding: 7px;
        background-image:     linear-gradient(
            to right,
            #E7484F,
            #F68B1D,
            #FCED00,
            #009E4F,
            #00AAC3,
            #732982
          );
        animation:slidebg 2s linear infinite;
      }
    }
  }
  @keyframes slidebg {
  to {
    background-position:20vw;
  }
}
  .disabled {
    border: none;
    border-radius: 5px;
    padding: 5px;
    background: grey;
    color: #ffffff;
    margin-top: 10px;

    &:hover {
      cursor: default;
      padding: 5px;
      background-image: none;
    }
  }
</style>
