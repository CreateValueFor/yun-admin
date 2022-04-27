<template>
  <div class="flex">
    <div class="menu-tab w-1/3">
      <router-link to="/customer/calendar">
        배송 일정 변경
      </router-link>
    </div>
    <div class="menu-tab w-1/3">
      <router-link to="/customer/info">
        메뉴 구성 변경
      </router-link>
    </div>
    <div class="menu-tab w-1/3">
      <router-link to="/customer/delivery">
        배송 주소지 변경
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
}
</script>
<style lang="scss">
.menu-tab {
  background: #26331e;
  border: 0.7px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 10px 10px 0px 0px;
  font-family: 'Roboto';
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 0.875rem;

  /* identical to box height */

  color: #ffffff;
}
</style>
