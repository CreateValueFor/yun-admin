<template>
  <div>
    <guide title="나의 배송 일정 관리하기" content="일정 변경하기">
      <slot>
        <div class="detail">
          본 페이지는 나의 배송일정을 관리하는 섹션입니다.<br />
          하단 달력을 통해 프로그램 별 기본 셋팅된 배송 진행일자 확인이
          가능합니다.<br /><br />
          배송 정지를 원하시는 날짜는 달력 내 열쇠를 클릭하여 잠궈주세요.<br />
          배송 진행을 원하시는 날짜는 달력 내 열쇠를 한번 더 클릭하여
          풀어주세요.<br /><br />
          변경이 가능한 일자는 수령일 최소 2일 전 오후 5시까지입니다. 변경이
          불가한 일자는 달력 클릭이 불가합니다.<br /><br />
          새벽배송은 공휴일 포함 정상 배송되며, 일반배송은 택배사 휴무로 인해
          공휴일 배송이 불가합니다.<br /><br />
          공휴일 일정과 관련하여 배송지 혹은 배송일자 변경이 필요하실 경우
          수령일 최소 2일 전 미리 조정해주세요.<br /><br />
          배송일정 장기 중단은 선택하시는 만큼 가능합니다.<br />
          필요하신 중단 일자는 달력 내 열쇠를 잠궈주세요.
        </div>
      </slot>
    </guide>
  </div>
</template>
<script>
import Guide from '@/components/customer/Guide'
// import Guide from '../../components/customer/Guide.vue'

export default {
  components: { Guide },
}
</script>
<style lang=""></style>
