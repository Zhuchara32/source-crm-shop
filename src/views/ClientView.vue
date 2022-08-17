<template>
  <div class="client" :class="{full: !isOpen}">
    <ul class="client-list">
      <ClientList
        v-for="prod in chackFilter"
        :key="prod.uidProd"
        :prod="prod"
        @addToCart="addToCart"
      />
    </ul>
  </div>
</template>

<script>
import ClientList from '../components/ClientList.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ClientView',
  components: {
    ClientList
  },
  computed: {
    ...mapGetters(['isOpen', 'arrForUsers', 'objFilterArrUsers', 'filterArrForUsers']),
    chackFilter () {
      const arrValues = Object.values(this.objFilterArrUsers)
      const arrNull = arrValues.filter(el => el === null)
      if (arrNull.length < 4) {
        return this.filterArrForUsers
      } else {
        return this.arrForUsers
      }
    }
  },
  async mounted () {
    await this.fetchProdForUsers()
  },
  methods: {
    ...mapActions(['fetchProdForUsers', 'ADD_ToCart']),
    addToCart (arg) {
      this.ADD_ToCart(arg)
      this.$message('Товар добавлен в корзину')
    }
  }
}
</script>

<style lang="scss">
  .client {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    margin-left: 20vw;

    &-list {
      list-style-type: none;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  .full {
    width: 100vw !important;
    margin: 0 !important;
  }
</style>
