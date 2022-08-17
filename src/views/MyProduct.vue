<template>
  <div class="product" :class="{full: !isOpen}">
    <h2 class="product-heading">Ваши товары</h2>
    <ul class="product-list">
      <ListProduct
        v-for="prod in prodArr"
        :key="prod.id"
        :prod="prod"
        :id="prod.id"
      />
    </ul>
  </div>
</template>

<script>
import ListProduct from '../components/ListProduct.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyProduct',
  components: {
    ListProduct
  },
  async mounted () {
    await this.fetchProd()
  },
  unmounted () {
    this.clearArr()
  },
  computed: {
    ...mapGetters(['isOpen', 'prodArr'])
  },
  methods: {
    ...mapActions(['fetchProd', 'clearArr'])
  }
}
</script>

<style lang="scss">
  .product {
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
  .full {
    width: 100vw !important;
    margin: 0 !important;
  }
</style>
