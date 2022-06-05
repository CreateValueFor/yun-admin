<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div style="max-width: 800px; margin: 0 auto;">
      <Header v-if="header" :receiverInfo="receiverInfo" />

      <!-- <div
        class="w-full flex flex-col bg-gray-100 pl-0 lg:pl-64 min-h-screen"
        :class="sideBarOpen ? 'overlay' : ''"
        id="main-content"
      > -->
      <NavBar v-if="header" :receiverInfo="receiverInfo" />

      <!-- <div class="p-6 bg-gray-100 mb-20 flex-1 flex flex-col"> -->
      <router-view :receiverInfo="receiverInfo" />
      <!-- </div> -->

      <!-- <Footer /> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import customer from '../../api/customer'
import Header from './Header.vue'
import NavBar from './NavBar.vue'

export default {
  name: 'Customer',
  components: {
    Header,
    NavBar,
  },
  data() {
    return {
      header: false,
      receiverInfo: {},
    }
  },
  async mounted() {
    if (window.location.pathname.includes('login')) {
      this.header = false
    } else {
      if (!window.localStorage.getItem('YUN-TOKEN')) {
        this.$router.push({ name: 'Login' })
        this.header = false
        return
      } else {
        try {
          await customer.check()
        } catch (error) {
          localStorage.removeItem('YUN-TOKEN')
          window.location.reload()
        }
      }
      this.header = true
    }
  },
  watch: {
    $route(to, from) {
      from
      if (to.name !== 'Login') {
        this.header = true
      }
    },
  },
}
</script>
<style lang="scss">
* {
  font-family: 'Noto Sans KR';
}
.yun-customer-select,
.yun-customer-input {
  border: 1px solid #b3b3b3;
  /* background: black; */
  width: 120px;
  height: 20px;
  border-radius: 0px;
  box-sizing: border-box;
}
select {
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
