<template>
  <div class="navbar-right">
    <a href="#" class="navbar-right__name" @click="isDropdown = !isDropdown">
      {{ info.name }}
      <font-awesome-icon class="icon" icon="caret-down" />
    </a>
    <ul class="navbar-right__list" v-show="isDropdown">
      <li class="navbar-right__item">
        <router-link href="#" to="/profile" class="navbar-right__link">
          Профиль
        </router-link>
      </li>
      <li class="navbar-right__item">
        <a
          href="#"
          class="navbar-right__link"
          @click.prevent="logout"
        >
        Выход
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavbarUsers',
  data () {
    return {
      isDropdown: false
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['goOut']),
    async logout () {
      await this.goOut()
      this.$router.push('/login?message=logout')
    }
  }
}
</script>
