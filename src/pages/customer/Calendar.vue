<template>
  <div class="p-5" style="margin-bottom: 50px;">
    <a
      href="https://www.notion.so/8a43dbefe2b544688a1bb4d3f41918af"
      class="input-button ml-auto"
      target="_blank"
      style="width : 115px"
    >
      윤식단 구독 지침서
    </a>
    <guide title="나의 배송 일정 관리하기" content="일정 변경하기">
      <slot>
        <div class="detail">
          배송정지 희망 날짜를 클릭하여 자물쇠를 잠궈주세요.<br />
          (날짜칸이 회색으로 변하면 정상 정지 입니다.)<br />
          잠긴 자물쇠 모양 을 한 번 더 클릭하면 잠금 이 해지되어 정상 배송이
          진행됩니다.<br /><br />
          변경 후 오른쪽 하단의 [저장하기]버튼 을 반드시 눌러주세요.<br />
          배송정지 반영 가 능 시점<br />
          월요일 배송 : 전 주 금요일 16시 전까지<br />
          화요일 배송 : 전 주 금요일 16시 전까지<br />
          수요일 배송 : 월요일 16시 전까지<br />
          목요일 배송 : 화요일 16시 전까지<br />
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
        <div style="width:40px"></div>
        <!-- <div
          class="program-label relative"
          :class="{ early: isEarly, day: !isEarly }"
        >
          남은배송
          <div
            class="absolute"
            style="
              right: 0;
              top: 50%;
              transform: translate(24px, -50%);
              color: #000;"
          >
            {{ remainDelivery }}회
          </div>
        </div> -->
      </div>
    </div>
    <divider title="일정 변경하기" />
    <hooper :vertical="true" style="height: 550px; margin-top: 50px;">
      <Slide style="height: 550px" v-for="monthIdx in 4" :key="monthIdx">
        <table class="table text-centere w-full">
          <thead>
            <th
              width="14.17%"
              class="text-center"
              v-for="day in days"
              :key="day"
            >
              {{ day }}
            </th>
          </thead>
          <tbody>
            <tr class="month-row">
              <td colspan="3"></td>
              <td colspan="1" class="text-center">
                {{ `${months[monthIdx - 1]}월` }}
              </td>
              <td colspan="3"></td>
            </tr>
            <tr
              v-for="(date, idx) in dates[monthIdx - 1]"
              :key="idx"
              class="relative"
            >
              <td
                v-for="(day, secondIdx) in date"
                :key="secondIdx"
                class="text-center align-top relative"
                :class="{
                  deliveryCandidate:
                    day.deliveryCandidate ||
                    ([1, 3].includes(secondIdx) &&
                      date[secondIdx + 1].deliveryCandidate) ||
                    ([2, 4].includes(secondIdx) &&
                      date[secondIdx - 1].deliveryCandidate),
                  locked:
                    day.locked ||
                    ([1, 3].includes(secondIdx) &&
                      date[secondIdx + 1].locked) ||
                    ([2, 4].includes(secondIdx) && date[secondIdx - 1].locked),
                }"
              >
                {{ day.day }}

                <div
                  style="top:17px; left: 0; right: 0; bottom:0"
                  class="absolute"
                  v-if="reserveDates.includes(day.fullDay)"
                >
                  {{
                    day.locked ||
                    ([1, 3].includes(secondIdx) &&
                      date[secondIdx + 1].locked) ||
                    ([2, 4].includes(secondIdx) && date[secondIdx - 1].locked)
                      ? holidaies.includes(day.fullDay)
                        ? '공휴일'
                        : 'Lock'
                      : '배송일'
                  }}
                  <div
                    class="absolute delivery-item "
                    style="left: 0%;
                      right: calc(-100% - 4px);
                      cursor: pointer;
                      z-index: 10;
                      top: 7px;  cursor:pointer;"
                    :style="{
                      transform: [2, 4].includes(secondIdx)
                        ? 'translateX(-50%)'
                        : '',
                    }"
                    @click="lockDelivery(monthIdx - 1, idx, secondIdx)"
                    :disabled="holidaies.includes(day.fullDay)"
                    v-if="
                      ([1, 2, 3, 4].includes(secondIdx) &&
                        reserveDates.includes(date[1].fullDay)) ||
                        reserveDates.includes(date[2].fullDay)
                    "
                  >
                    <div class="delivery-lock z-10">
                      <img
                        v-if="
                          day.locked ||
                            ([1, 3].includes(secondIdx) &&
                              date[secondIdx + 1].locked) ||
                            ([2, 4].includes(secondIdx) &&
                              date[secondIdx - 1].locked)
                        "
                        class="absolute "
                        style="left: 20%"
                        src="@/assets/customer/lock.svg"
                        alt="unLock"
                      />
                      <img
                        v-else
                        class="absolute "
                        style="left: 20%"
                        src="@/assets/customer/unLock.svg"
                        alt="unLock"
                      />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Slide>
    </hooper>

    <div class="flex items-start">
      <img class="mr-3" src="@/assets/notice.svg" alt="notice" />
      <span class="notice-text">
        9월 12일 ~ 9월 15일 윤식단 추석휴가로 [모든 배송]이 중단됩니다.
        <br /><br />
        10월 03일 개천절 [직접배송]이 중단됩니다. 전날 공휴일(개천절)로 인해
        10월 04일 [일반배송]이 중단됩니다.<br /><br />
        전날 공휴일(한글날)로 인해 10월 10일 [직접배송]이 중단됩니다.<br /><br />
        *다른 요일로 대체 배송이 이루어지지 않으며, 종료일이 연장되어
        진행됩니다.
      </span>
    </div>
    <button class="btn" @click="onSave">저장하기</button>
  </div>
</template>
<script>
import Guide from '@/components/customer/Guide'
import Divider from '@/components/customer/Divider.vue'
// import VCalendar from '../../components/customer/VCalendar.vue'
import 'hooper/dist/hooper.css'
import { Hooper, Slide } from 'hooper'
import customer from '../../api/customer'
import custom from '../../api/custom'

export default {
  components: { Guide, Divider, Hooper, Slide },
  data() {
    return {
      program: '1일 1식 20일 프로그램',
      endDate: '2021년 12월 1일 수요일',
      isEarly: false,
      days: ['일', '월', '화', '수', '목', '금', '토'],
      dates: {
        0: [],
        1: [],
        2: [],
        3: [],
      },
      years: [],
      months: [],
      reservations: [],
      reserveDates: [],
      holidaies: [],
      lockDates: ['2022-05-23'],
      notices: [
        '9월 12일 ~ 9월 15일 윤식단 추석휴가로 [모든 배송]이 중단됩니다.',

        '10월 03일 개천절 [직접배송]이 중단됩니다.',
        '전날 공휴일(개천절)로 인해 10월 04일 [일반배송]이 중단됩니다.',

        '전날 공휴일(한글날)로 인해 10월 10일 [직접배송]이 중단됩니다.',

        '*다른 요일로 대체 배송이 이루어지지 않으며, 종료일이 연장되어 진행됩니다.',
      ],
    }
  },
  computed: {
    remainDelivery() {
      return this.reservations.filter(
        (item) => item.delivered === false && item.locked === false
      ).length
    },
  },

  async created() {
    // 네트워크 호출해서 초기데이터 세팅
    const res = await customer.getCustomerInfo()
    this.holidaies = (await customer.getHolidays()).data.map(
      (item) => item.date
    )
    console.log(this.holidaies)
    const {
      Package: { name },
      Reservations,
      deliveryType,
    } = res.data
    this.program = name
    this.isEarly = deliveryType === '새벽배송'
    this.reservations = Reservations
    this.reserveDates = Reservations.map((item) => item.deliveryDate)
    this.lockDates = Reservations.filter((item) => item.locked).map(
      (item) => item.deliveryDate
    )
    const lastReservation = this.reservations[this.reservations.length - 1]

    const lastReserveTime = new Date(lastReservation.deliveryDate)
    const lastReserveYear = lastReserveTime.getFullYear()
    const lastReserveMonth = lastReserveTime.getMonth() + 1
    const lastReserveDate = lastReserveTime.getDate() + 1
    const lastReserveDay = custom.dayTranslate[lastReserveTime.getDay()]

    this.endDate = `${lastReserveYear}년 ${lastReserveMonth}월 ${lastReserveDate}일 ${lastReserveDay}요일`

    // 달력 만들기
    const date = new Date()
    date.setDate(15)
    this.years.push(date.getFullYear())
    this.months.push(date.getMonth() + 1)

    for (let i = 0; i < 3; i++) {
      date.setMonth(date.getMonth() + 1)

      this.years.push(date.getFullYear())
      this.months.push(date.getMonth() + 1)
    }

    this.calendarData()
  },
  methods: {
    lockDelivery(monthIdx, idx, secondIdx) {
      const compareDate = new Date()
      compareDate.setDate(compareDate.getDate() + 1)
      compareDate.setHours(17)
      compareDate.setMinutes(0)
      compareDate.setSeconds(0)

      const selectedDate = new Date(
        this.dates[monthIdx][idx][secondIdx].fullDay
      )

      if (compareDate > selectedDate) {
        return window.alert('해당 배송일정은 현재 수정이 불가합니다.')
      }
      //공휴일일 경우 해제 불가
      if (
        this.holidaies.includes(this.dates[monthIdx][idx][secondIdx].fullDay)
      ) {
        return window.alert('공휴일은 잠금 해제가 불가능합니다.')
      }

      // 잠금 처리
      if (this.dates[monthIdx][idx][secondIdx].locked) {
        //잠금 해제
        this.lockDates = this.lockDates.filter(
          (item) => item !== this.dates[monthIdx][idx][secondIdx].fullDay
        )
        let popedReserve = this.reserveDates.pop()
        while (this.lockDates.includes(popedReserve)) {
          this.lockDates = this.lockDates.filter(
            (item) => item !== popedReserve
          )
          popedReserve = this.reserveDates.pop()
        }

        this.$nextTick(() => {
          this.calendarData()
        })
        return
      }
      //잠금 진행
      this.lockDates.push(this.dates[monthIdx][idx][secondIdx].fullDay)

      // 새로운 배송 일정 생성
      // const newReserveDateObj = new Date(
      //   this.reserveDates[this.reserveDates.length - 1]
      // )
      const newReserveDateObj = new Date(
        this.dates[monthIdx][idx][secondIdx].fullDay
      )
      let notFlag = true
      while (notFlag) {
        const newReserveDay = newReserveDateObj.getDay()
        if ([1, 2].includes(newReserveDay)) {
          newReserveDateObj.setDate(newReserveDateObj.getDate() + 2)
        } else {
          newReserveDateObj.setDate(newReserveDateObj.getDate() + 5)
        }
        if (
          !this.reserveDates.includes(
            newReserveDateObj.toISOString().split('T')[0]
          )
        ) {
          notFlag = false
        }
      }

      this.reserveDates.push(
        `${newReserveDateObj.getFullYear()}-${
          newReserveDateObj.getMonth() + 1 >= 10
            ? newReserveDateObj.getMonth() + 1
            : `0${newReserveDateObj.getMonth() + 1}`
        }-${
          newReserveDateObj.getDate() + 1 >= 10
            ? newReserveDateObj.getDate()
            : `0${newReserveDateObj.getDate()}`
        }`
      )

      this.calendarData()

      // this.$set(this.dates[monthIdx][idx][secondIdx], 'deliveryCandidate', true)
    },
    calendarData() {
      for (let i = 0; i < 4; i++) {
        const [
          monthFirstDay,
          monthLastDate,
          lastMonthLastDate,
        ] = this.getFirstDayLastDate(this.years[i], this.months[i])

        this.$set(
          this.dates,
          i,
          this.getMonthOfDays(
            monthFirstDay,
            monthLastDate,
            lastMonthLastDate,
            this.years[i],
            this.months[i]
          )
        )
      }
    },
    getFirstDayLastDate(year, month) {
      const firstDay = new Date(year, month - 1, 1).getDay() // 이번 달 시작 요일
      const lastDate = new Date(year, month, 0).getDate() // 이번 달 마지막 날짜
      let lastYear = year
      let lastMonth = month - 1
      if (month === 1) {
        lastMonth = 12
        lastYear -= 1
      }
      const prevLastDate = new Date(lastYear, lastMonth, 0).getDate() // 지난 달 마지막 날짜
      return [firstDay, lastDate, prevLastDate]
    },
    getMonthOfDays(
      monthFirstDay,
      monthLastDate,
      prevMonthLastDate,
      curYear,
      curMonth
    ) {
      let day = 1
      let prevDay = prevMonthLastDate - monthFirstDay + 1
      const dates = []
      let weekOfDays = []
      while (day <= monthLastDate) {
        if (day === 1) {
          // 1일이 어느 요일인지에 따라 테이블에 그리기 위한 지난 셀의 날짜들을 구할 필요가 있다.
          for (let j = 0; j < monthFirstDay; j += 1) {
            const fullDay = `${curYear}-${
              curMonth === 1
                ? 12
                : curMonth - 1 >= 10
                ? curMonth - 1
                : `0${curMonth - 1}`
            }-${prevDay}`
            weekOfDays.push({
              day: prevDay,
              fullDay,
              deliveryCandidate: this.reserveDates.includes(fullDay),
              locked: this.lockDates.includes(fullDay),
            })
            prevDay += 1
          }
        }

        const fullDay = `${curYear}-${
          curMonth >= 10 ? curMonth : `0${curMonth}`
        }-${day >= 10 ? day : `0${day}`}`
        weekOfDays.push({
          day,
          fullDay,
          deliveryCandidate: this.reserveDates.includes(fullDay),
          locked: this.lockDates.includes(fullDay),
        })
        if (weekOfDays.length === 7) {
          // 일주일 채우면
          dates.push(weekOfDays)
          weekOfDays = [] // 초기화
        }
        day += 1
      }
      const len = weekOfDays.length
      if (len > 0 && len < 7) {
        for (let k = 1; k <= 7 - len; k += 1) {
          const fullDay = `${curYear}-${
            curMonth === 12
              ? 1
              : curMonth + 1 >= 10
              ? curMonth + 1
              : `0${curMonth + 1}`
          }-${k >= 10 ? k : `0${k}`}`
          weekOfDays.push({
            day: k,
            fullDay,
            deliveryCandidate: this.reserveDates.includes(fullDay),
            locked: this.lockDates.includes(fullDay),
          })
          // weekOfDays.push(k)
        }
      }
      if (weekOfDays.length > 0) dates.push(weekOfDays) // 남은 날짜 추가
      return dates
    },
    async onSave() {
      console.log(this.reserveDates)
      console.log(this.lockDates)
      const res = await customer.putReservation({
        reserveDates: this.reserveDates,
        lockDates: this.lockDates,
      })
      if (res.success) {
        window.alert('정상적으로 저장되었습니다.')
      }
      console.log(res)
    },
  },
}
</script>
<style lang="scss" scoped>
.program {
  margin: 50px auto;
  width: 80%;
}
.program-container {
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #000000;
  margin: 10px auto;

  align-items: center;
  .program-title {
    font-size: 12px;
    font-weight: 600;
  }
  .program-contents {
    font-weight: 300;
    font-size: 12px;
  }
  .program-label {
    color: #fff;
    display: inline;
    padding: 3px 5px;
    border-radius: 5px;
    font-size: 12px;
    line-height: 10px;
    &.early {
      background: #002a5b;
    }
    &.day {
      background: #26331e;
    }
  }
}

.notice-text {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #9a1111;
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
table {
  font-weight: 700;
  min-width: auto;
  thead {
    background: none;
  }
  th,
  td {
    font-size: 10px;
    background: transparent;
    border-bottom: 1px solid #e2e8f0;
    &:first-child {
      color: #9a1111;
    }
    &:last-child {
      color: #002a5b;
    }
  }
  tr {
    height: 75px;
    &.month-row {
      color: #000;
      height: 50px;
      font-weight: 700;
      vertical-align: middle;
      border-bottom: 1px solid #e2e8f0;
      td {
        text-align: center;
        font-size: 1rem;
        color: #000;
        border-right: none;
      }
    }
    td.deliveryCandidate {
      background: #f9f8f4;
      &.locked {
        background: #f6f6f6;
        .delivery-lock {
          background: #e6e6e6;
        }
      }
    }
    .delivery-item {
      top: 24px;
      bottom: 0;
      padding-top: 10px;
      &:first-child {
      }
      span {
        font-size: 10px;
        margin-bottom: 0px;
        margin-left: 2.5vw;
      }
      .delivery-lock {
        border-radius: 3px;
        height: 35px;
        margin: 0px 7px 5px 4px;
        background: #f1eee5;

        padding: 5px 10px;
        &.locked {
          background: #f6f6f6;
          background: #e6e6e6;
        }
      }
    }
  }
}
</style>
