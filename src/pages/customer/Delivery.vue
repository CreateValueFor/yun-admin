<template>
  <div class="p-5">
    <a
      href="https://www.notion.so/8a43dbefe2b544688a1bb4d3f41918af"
      class="input-button ml-auto"
      target="_blank"
      style="width : 115px"
    >
      윤식단 구독 지침서
    </a>
    <guide title="나의 배송지 변경하기" content="배송지 정보">
      <slot>
        <div class="detail">
          본 페이지는 나의 배송지 정보를 관리하는 섹션입니다.<br /><br />
          변경된 배송지 정보는 2일 후 반영됩니다. <br />변경을 원하시는 주소지를
          식단 수령일 최소 2일 전, 오후 5시 이전으로 변경해주세요.
          <br /><br />직접배송 가능지역을 꼭 클릭하여 확인해주세요.<br />직접배송
          불가지역임에도 직접배송으로 신청하실 경우에는 배송이 이뤄지지 않을 수
          있습니다. <br /><br />[직접배송 가능지역 - 직접배송 프로그램]<br />
          [직접배송 불가능지역 - 일반배송 프로그램]<br /><br />
          일반배송으로 변경하실 경우 배송요일은 [매주 화요일 / 목요일]로
          고정됩니다.<br /><br />
          직접배송 주소지를 변경하실 경우에는 공동현관 비밀번호도 꼭
          확인해주세요.<br />정확한 출입방법 미/오기재 시 공동현관으로
          대응배송이 이뤄질 수 있습니다. <br /><br />직접배송 엘레베이터가 없는
          다층 건물의 경우 5층까지 문 앞 배송됩니다. <br />6층 이상 부터는 1층에
          대응배송되니 이 경우 카카오채널 ‘윤식단'을 통해 문의주세요.
          <br /><br />일반배송이 도착 예정일보다 하루라도 늦어질 시 100% 기간
          연장으로 도와드립니다.<br />문제 상황 발생 시 꼭 카카오채널 ‘윤식단'을
          통해 문의주세요.<br /><br />
          주소지 변경시 '시'에 대한 정확한 표기 부탁드립니다.<br />
          ex)인천'시', 서울'시'
        </div>
      </slot>
    </guide>
    <divider title="배송지 정보" style="margin-bottom:50px;" />

    <select-with-label-no-img
      :options="deliveryType"
      name="carboType"
      :value="selectedDeliveryType"
      @onChange="selectedDeliveryType = $event.value"
      img="bus"
      title="배송 형태"
      :disabled="true"
    />
    <div class="detail" style="text-align:center; margin:10px 0px 30px">
      배송지 변경 반영 가능 시점<br /><br />

      월요일 배송 : 전 주 금요일 16시 전까지<br />
      화요일 배송 : 전 주 금요일 16시 전까지<br />
      수요일 배송 : 월요일 16시 전까지<br />
      목요일 배송 : 화요일 16시 전까지
    </div>

    <!-- <hr style="width:200px; margin: 30px auto 30px; margin-top:30px;" /> -->
    <div class="relative">
      <input-with-label-no-img
        name="address1"
        :value="deliveryInfo.address1"
        title="기본주소"
        :disabled="true"
        img="home"
        style="margin-bottom:30px;"
      />
      <img
        @click="execDaumPostcode()"
        class="absolute"
        style="right: calc(10% - 23px); top: 20px"
        src="@/assets/customer/searchAddress.svg"
        alt="searchAddress"
      />
    </div>
    <input-with-label-no-img
      name="address2"
      :value="deliveryInfo.address2"
      @onChange="onChange"
      title="상세주소"
      img="home"
      style="margin-bottom:30px;"
    />

    <input-with-label-no-img
      name="entrancePassword"
      :value="deliveryInfo.entrancePassword"
      @onChange="onChange"
      title="공동현관 비밀번호"
      img="home"
      style=""
    />
    <div
      style="font-family: 'Roboto';
        font-size: 12px;
        line-height: 12px;
        color: #B3B3B3;
        width:80%
        
        
        display: flex;
        justify-content: center;
        margin: 0 auto;
        margin-top:6px;
        
        margin-bottom:30px;
        "
    >
      *새벽배송의 경우 공동현관 출입방 법 을 반드시 기재해주세요.<br />
      새벽시간에 건물자유출입이 불 가 할 경우, 1층에 대응배송이 이루어질 수
      있습니다.
    </div>
    <input-with-label-no-img
      title="배송메세지"
      img="message"
      @onChange="onChange"
      style="margin-bottom:30px;"
      name="deliveryMessage"
      :value="deliveryInfo.deliveryMessage"
    />
    <button class="btn" @click="onSave">저장하기</button>
  </div>
</template>
<script>
import Guide from '@/components/customer/Guide'
import Divider from '../../components/customer/Divider.vue'

import customer from '../../api/customer'
import InputWithLabelNoImg from '../../components/customer/InputWithLabelNoImg.vue'
import SelectWithLabelNoImg from '../../components/customer/SelectWithLabelNoImg.vue'

export default {
  name: 'Delivery',
  components: {
    Guide,
    Divider,

    InputWithLabelNoImg,
    SelectWithLabelNoImg,
  },
  async mounted() {
    const {
      data: {
        address1,
        address2,
        entrancePassword,
        deliveryMessage,
        deliveryType,
      },
    } = await customer.getCustomerInfo()
    this.selectedDeliveryType = deliveryType
    this.deliveryInfo = {
      address1,
      address2,
      entrancePassword,
      deliveryMessage,
    }
  },
  data() {
    return {
      deliveryType: ['직접배송', '일반배송', '새벽배송'],
      selectedDeliveryType: '',
      deliveryInfo: {
        address1: '',
        address2: '',
        entrancePassword: '',
        deliveryMessage: '',
      },
      postcode: '',
      address: '',
      extraAddress: '',
    }
  },
  methods: {
    onChange(e) {
      const { name, value } = e
      this.$set(this.deliveryInfo, name, value)
    },

    async onSave() {
      const res = await customer.postDelivery({
        ...this.deliveryInfo,
        deliveryType: this.selectedDeliveryType,
      })

      if (res.success) {
        window.alert('성공적으로 저장되었습니다.')
      }
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.$set(this.deliveryInfo, 'address1', data.address)
          if (this.extraAddress !== '') {
            this.extraAddress = ''
          }
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              this.extraAddress +=
                this.extraAddress !== ''
                  ? `, ${data.buildingName}`
                  : data.buildingName
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== '') {
              this.extraAddress = `(${this.extraAddress})`
            }
          } else {
            this.extraAddress = ''
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode
        },
      }).open()
    },
  },
}
</script>
<style lang="scss">
.detail {
  /* border-top: 0.7px solid #e6e6e6; */

  font-family: 'Roboto';

  font-size: 12px;
  line-height: 1rem;

  color: #999999;
}
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
