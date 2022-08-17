<template>
  <nav class="navbar">
    <div class="navbar-app">
      <div class="navbar-left">
        <a href="#" class="navbar-link" @click.prevent="$emit('activeSidebar')">
          <font-awesome-icon class="big-icon" icon="bars" />
        </a>
      </div>

      <NavbarUsers
        v-show="uid"
      />

      <NavbarClient
        v-show="!uid"
      />
    </div>
  </nav>
</template>

<script>
import NavbarUsers from './NavbarUsers.vue'
import NavbarClient from './NavbarClient.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MainNavbar',
  components: {
    NavbarClient,
    NavbarUsers
  },
  computed: {
    ...mapGetters(['uid'])
  }
  // methods: {
  //   ...mapActions(['goOut']),
  //   async logout () {
  //     await this.goOut()
  //     this.$router.push('/login?message=logout')
  //   }
  // }
}
</script>

<style lang="scss">
  .navbar {
    background: #FFD700;
    height: 50px;
    padding: 0 30px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    &-app {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-link {
      text-decoration: none;
      color: #2c3e50;
    }

    &-right {
      display: flex;
      justify-content: space-around;

      &__salesman {
        padding-right: 10px;
        border-right: 1px solid #ffffff;
      }

      &__cart {
        padding-left: 10px;
      }

      &__name {
        text-decoration: none;
        color: #ffffff;
        position: relative;
        padding: 10px;
        border-radius: 5px;
        font-size: 15px;
        font-weight: 700;

        &:hover {
          background: #C0C0C0;
          color: #9370DB;
        }
      }

      &__list {
        list-style-type: none;
        position: absolute;
        top: 50px;
      }

      &__item {
        padding: 6px 20px;
        margin: 5px;
        border-radius: 5px;
        background: #C0C0C0;
      }

      &__link {
        text-decoration: none;
        color: #ffffff;

        &:hover {
          color: #9370DB;
        }
      }
    }
  }

  .big-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
</style>
