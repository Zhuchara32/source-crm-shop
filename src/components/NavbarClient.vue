<template>
  <div class="navbar-right">
    <div class="navbar-right__salesman">
      <router-link
        to="/login"
        class="navbar-right__link"
      >
        Я - продавец
      </router-link>
    </div>
    <div class="navbar-right__cart">
      <router-link
        to="/cart"
        class="navbar-right__link"
      >
        <font-awesome-icon class="big-icon" icon="cart-shopping" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarClient'
}
</script>

<style lang="scss">

</style>
