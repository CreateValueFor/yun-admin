<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">
      <Header v-if="header" />

      <!-- <div
        class="w-full flex flex-col bg-gray-100 pl-0 lg:pl-64 min-h-screen"
        :class="sideBarOpen ? 'overlay' : ''"
        id="main-content"
      > -->
      <!-- <Navbar /> -->

      <!-- <div class="p-6 bg-gray-100 mb-20 flex-1 flex flex-col"> -->
      <router-view />
      <!-- </div> -->

      <!-- <Footer /> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
  name: 'Customer',
  components: {
    Header,
  },
  data() {
    return {
      header: false,
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
    },
  },
}
</script>
<style lang="scss">
$y-green: '#26331e';
$y-red: '#9a1111';
$y-dark-blue: '#02204b';
$y-blue: '#002a5b';
* {
  font-family: 'Noto Sans KR';
}
</style>
