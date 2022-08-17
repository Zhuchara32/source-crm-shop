<template>
  <div class="orders" :class="{full: !isOpen}">
    <h2 class="orders-heading">Мои заказы</h2>
    <ul class="orders-list">
      <ListOrders
        v-for="order in ordersArr"
        :key="order.idOrder"
        :order="order"
      />
    </ul>
  </div>
</template>

<script>
import ListOrders from '../components/ListOrders.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyOrders',
  components: {
    ListOrders
  },
  async mounted () {
    await this.fetchSales()
  },
  unmounted () {
    this.clearSales()
  },
  computed: {
    ...mapGetters(['isOpen', 'ordersArr'])
  },
  methods: {
    ...mapActions(['fetchSales', 'clearSales'])
  }
}
</script>

<style lang="scss">
  .orders {
    width: 80vw;
    text-align: center;
    margin-left: 20vw;

    &-heading {
      margin: 10px auto;
    }

    &-list {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
