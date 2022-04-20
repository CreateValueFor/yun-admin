<template>
  <div class="p-5">
    <guide title="나의 배송지 변경하기" content="배송지 정보">
      <slot>
        <div class="detail">
          본 페이지는 나의 배송지 정보를 관리하는 섹션입니다.<br /><br />
          변경된 배송지 정보는 2일 후 반영됩니다. <br />변경을 원하시는 주소지를
          식단 수령일 최소 2일 전, 오후 5시 이전으로 변경해주세요.
          <br /><br />새벽배송 가능지역을 꼭 클릭하여 확인해주세요.<br />새벽배송
          불가지역임에도 새벽배송으로 신청하실 경우에는 배송이 이뤄지지 않을 수
          있습니다. <br /><br />[새벽배송 가능지역 - 새벽배송 프로그램]<br />
          [새벽배송 불가능지역 - 일반배송 프로그램]<br /><br />
          일반배송으로 변경하실 경우 배송요일은 [매주 화요일 / 목요일]로
          고정됩니다.<br /><br />
          새벽배송 주소지를 변경하실 경우에는 공동현관 비밀번호도 꼭
          확인해주세요.<br />정확한 출입방법 미/오기재 시 공동현관으로
          대응배송이 이뤄질 수 있습니다. <br /><br />새벽배송 엘레베이터가 없는
          다층 건물의 경우 5층까지 문 앞 배송됩니다. <br />6층 이상 부터는 1층에
          대응배송되니 이 경우 카카오채널 ‘윤식단'을 통해 문의주세요.
          <br /><br />일반배송이 도착 예정일보다 하루라도 늦어질 시 100% 기간
          연장으로 도와드립니다.<br />문제 상황 발생 시 꼭 카카오채널 ‘윤식단'을
          통해 문의주세요.
        </div>
      </slot>
    </guide>
    <divider title="배송지 정보" />
    <div class="input-row">
      <div class="input-title">
        <img src="@/assets/customer/carbo.svg" alt="carbo" />
        <h2 class="program-title">탄수화물 구성</h2>
      </div>
      <Select
        :options="deliveryType"
        name="carboType"
        :value="selectedDeliveryType"
      />
      <!-- <div class="yun-label">단순 무게 (그램/g) 기준입니다.</div> -->
    </div>
  </div>
</template>
<script>
import Select from '@/components/customer/Select'
import Guide from '@/components/customer/Guide'
import Divider from '../../components/customer/Divider.vue'

export default {
  name: 'Delivery',
  components: { Guide, Divider, Select },
  data() {
    return {
      deliveryType: ['새벽배송', '일반배송'],
      selectedDeliveryType: '일반배송',
    }
  },
}
</script>
<style lang="scss">
.input-row {
  display: flex;
  align-items: center;
  .input-title {
    display: flex;
    align-items: center;
    width: 33%;
    img {
      width: 35px;
      object-fit: none;
    }
  }
  .customer-select {
    display: flex;
    align-items: center;
    .yun-customer-select {
      width: 150px;
    }
    .yun-customer-select + img {
      margin-top: 10px;
    }
  }
}
</style>
