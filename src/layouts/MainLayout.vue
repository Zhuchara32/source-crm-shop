<template>
  <div class="main">

    <MainNavbar
      @activeSidebar="sidebarACTIVE"
    />

    <div class="main-app">
      <MainSidebar v-show="isOpen"/>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue'
import MainSidebar from '@/components/MainSidebar.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    MainNavbar,
    MainSidebar
  },
  async mounted () {
    if (!Object.keys(this.info).length) {
      await this.fetchInfo()
    }
  },
  computed: {
    ...mapGetters(['isOpen', 'info'])
  },
  methods: {
    ...mapActions(['sidebarACTIVE', 'fetchInfo'])
  }
}
</script>

<style lang="scss">
  .main {
    height: 100vh;

    &-app {
      margin-top: 50px;
      width: 100%;
      display: flex;
    }
  }
</style>
