<template>
  <div class="p-6 w-full">
    <p class="my-16 text-xl text-center font-semibold  block">
      윤식단 '수령자' 정보를 입력해주세요.
    </p>
    <div class="flex flex-col w-full">
      <Input
        :value="loginData.receiver"
        placeholder="실수령자 성명을 입력해주세요."
        class="mb-6 h-16 px-3"
        name="receiver"
        @onChange="onChange"
      />
      <Input
        :value="loginData.receiverPhone"
        class="mb-6 h-16 px-3"
        placeholder="실수령자 연락처를 입력해주세요,(-표시 제외, 안심번호 사용시 안심번호 작성)"
        name="receiverPhone"
        @onChange="onChange"
      />
      <Input
        :value="loginData.naverId"
        class="h-16 px-3 mb-2"
        placeholder="네이버 아이디 앞 2자리를 입력해주세요. (자사몰 주문시 자사몰 아이디 앞 2자리)"
        name="naverId"
        @onChange="onChange"
      />
      <div class="login-info" style="font-size: 6px;">
        <p>- '주문자'정보로는 로그인이 어렵습니다.</p>
        <p>
          - '실수령자' 성명/실수령자 연락처/주문한 네이버 아이디 (앞 2자리)를
          입력해주세요.
        </p>
      </div>
      <Button
        :disabled="false"
        label="로그인"
        class="h-20 text-xl mt-16 mb-3"
        @click="onClick"
        @onClick="onClick"
      />
      <div class="flex items-center">
        <label for="keepLogin" class="text-lg flex w-full flex items-center">
          <img
            :src="keepLogin ? loginImage.checked : loginImage.notChecked"
            alt="keep-login"
            class="w-12 h-12 mr-3 mb-1"
            style="width:17px; height: 17px;"
          />
          <span style="mb-0">로그인 정보 저장</span>
        </label>

        <input
          id="keepLogin"
          v-model="keepLogin"
          type="checkbox"
          class="mr-3"
        />
      </div>
    </div>
    <img
      style="width:150px; margin:0 auto"
      src="../../assets/로고.svg"
      alt="logo"
    />
  </div>
</template>
<script>
import Input from '@/components/customer/Input.vue'
import Button from '../../components/customer/Button.vue'
import customer from '@/api/customer.js'

export default {
  name: 'Login',
  components: { Input, Button },
  mounted() {
    const token = localStorage.getItem('YUN-TOKEN')
    if (token) {
      this.$router.push({ name: 'CustomerCalendar' })
    }
  },
  data() {
    return {
      loginData: {
        receiver: '',
        receiverPhone: '',
        naverId: '',
      },
      keepLogin: false,
      loginImage: {
        checked: require('../../assets/loginChecked.svg'),
        notChecked: require('../../assets/loginNotChecked.svg'),
      },
    }
  },
  methods: {
    onChange(event) {
      console.log(event)
      const { name, value } = event
      this.$set(this.loginData, name, value)
    },

    async onClick() {
      // 로그인 요청
      const res = await customer.login(this.loginData)
      if (res.success) {
        this.$router.push({ name: 'CustomerCalendar' })
      } else {
        window.alert('입력하신 정보로 등록된 수령자가 없습니다.')
      }
      console.log(res)
      // 성공했을 경우 세션에 저장
      // if(this.keepLogin)

      // 로그인 정보 저장 시 세션 저장
      // else

      console.log('login')
    },
  },
}
</script>
<style lang="scss" scoped>
.login-info {
  color: #d2d2d2;
}
#keepLogin {
  position: relative;
  opacity: 0;
  &::before {
    content: '';
    position: absolute;

    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #e6e6e6;
  }
}
</style>
