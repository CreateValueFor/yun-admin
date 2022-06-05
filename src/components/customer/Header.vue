<template>
  <div>
    <div class="flex w-full justify-between px-8 py-10">
      <div class="flex items-center">
        <img src="@/assets/greenLogo.svg" alt="greenLogo" class="mr-4" />
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
        <div id="customer-logout" @click="logout">
          로그아웃
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import customer from '../../api/customer'
export default {
  name: 'CustomerHeader',

  async mounted() {
    const res = await customer.getCustomerInfo()

    const {
      receiver,
      receiverPhone,
      Package: { name },
    } = res.data
    this.phone =
      receiverPhone.substr(0, 3) +
      '-' +
      receiverPhone.substr(3, 4) +
      '-' +
      receiverPhone.substr(7, 4)
    this.userName = receiver
    this.program = name
  },
  data() {
    return {
      receiverInfo: {},
      phone: '',
      program: '',
      userName: '',
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('YUN-TOKEN')
      window.location.reload()
    },
  },
}
</script>
<style lang="scss">
#customer-logout {
  background: #26331e;
  color: #fff;
  display: block;
  border-radius: 5px;
  padding: 5px 8px;
  /* width: 80px; */
  width: 100%;
  text-align: center;
  font-size: 12px;
}
</style>
