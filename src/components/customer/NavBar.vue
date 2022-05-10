<template>
  <div class="flex">
    <router-link
      class="menu-tab w-1/3"
      :class="{ selected: currentRoutes === 'calendar' }"
      to="/customer/calendar"
    >
      배송 일정 변경
    </router-link>
    <router-link
      class="menu-tab w-1/3"
      to="/customer/info"
      :class="{ selected: currentRoutes === 'info' }"
    >
      메뉴 구성 변경
    </router-link>
    <router-link
      class="menu-tab w-1/3"
      to="/customer/delivery"
      :class="{ selected: currentRoutes === 'delivery' }"
    >
      배송 주소지 변경
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  props: ['appData'],
  data() {
    return {
      currentRoutes: '',
    }
  },
  async mounted() {
    this.currentRoutes = window.location.pathname.split('/')[2]
  },
  watch: {
    $route(to, from) {
      this.currentRoutes = to.path.split('/')[2]
      from
    },
  },
}
</script>
<style lang="scss">
.menu-tab {
  /* background: #26331e; */
  border: 0.7px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 10px 10px 0px 0px;
  font-family: 'Roboto';
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 0.875rem;
  color: #e6e6e6;

  /* identical to box height */

  &.selected {
    background: #26331e;
    color: #ffffff;
  }
}
</style>
