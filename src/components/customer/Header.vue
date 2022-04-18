<template>
  <div>
    <div class="flex w-full justify-between px-8 py-10">
      <div class="flex items-center">
        <img src="@/assets/greenLogo.svg" alt="greenLogo" class="mr-12" />
        <h2>{{ userName }}님</h2>
      </div>
      <div>
        <div class="flex ">
          <img src="@/assets/customer/phone.svg" alt="phone" class="mr-3" />
          <p>{{ phone }}</p>
        </div>
        <div class="flex">
          <img src="@/assets/customer/salad.svg" alt="salad" class="mr-3" />
          <p>{{ program }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomerHeader',
  data() {
    return {
      phone: '010-7179-6841',
      program: '1일 1식 20일 새벽배송 프로그램',
      userName: '윤식단',
    }
  },
}
</script>
<style lang=""></style>
