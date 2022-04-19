<template>
  <div style="margin-bottom: 50px;">
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
    <divider title="나의 식단 일정" />
    <div class="program">
      <div class="program-container flex justify-between">
        <h2 class="program-title">식단 프로그램</h2>
        <div class="program-contents">{{ program }}</div>
        <div class="program-label" :class="{ early: isEarly, day: !isEarly }">
          {{ isEarly ? '새벽배송' : '일반배송' }}
        </div>
      </div>
      <div class="program-container flex justify-between">
        <h2 class="program-title">식단 종료일</h2>
        <div class="program-contents">{{ endDate }}</div>
        <div class="program-label" :class="{ early: isEarly, day: !isEarly }">
          {{ isEarly ? '새벽배송' : '일반배송' }}
        </div>
      </div>
    </div>
    <divider title="일정 변경하기" />
    <VCalendar />
    <img
      src="@/assets/customer/notice.svg"
      alt="notice"
      style="width: 224px; height : 20p;"
    />
    <button class="btn">저장하기</button>
  </div>
</template>
<script>
import Guide from '@/components/customer/Guide'
import Divider from '@/components/customer/Divider.vue'
import VCalendar from '../../components/customer/VCalendar.vue'

export default {
  components: { Guide, Divider, VCalendar },
  data() {
    return {
      program: '1일 1식 20일 프로그램',
      endDate: '2021년 12월 1일 수요일',
      isEarly: false,
    }
  },
}
</script>
<style lang="scss">
.program {
  margin: 50px auto;
  width: 80%;
}
.program-container {
  font-size: 1rem;
  line-height: 1.5rem;
  color: #000000;
  margin: 10px auto;

  align-items: center;
  .program-title {
    font-weight: 600;
  }
  .program-contents {
    font-weight: 300;
  }
  .program-label {
    color: #fff;
    display: inline;
    padding: 3px 5px;
    border-radius: 5px;
    &.early {
      background: #002a5b;
    }
    &.day {
      background: #26331e;
    }
  }
}
.btn {
  margin-top: 20px;
  width: 100px;
  float: right;
  height: 30px;
  background: #26331e;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 50px;
}
</style>
