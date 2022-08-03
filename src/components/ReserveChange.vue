<template>
  <div class="p-3">
    <div class="h-12 flex justify-end items-end">
      <button
        class="bg-orange-100 px-5 py-1 rounded-lg  mr-3 border"
        @click="removeReserve"
      >
        제거
      </button>
      <button
        @click="addReserve"
        class="bg-orange-100 px-5 py-1 rounded-lg  mr-3 border"
      >
        추가
      </button>
      <button
        @click="changeReserveDate"
        class="bg-orange-100 px-5 py-1 rounded-lg  border"
      >
        배송 요일 변경
      </button>
    </div>
    <h2 style="font-weight:500; font-size:1.25rem">{{ deliveryDay }}배송</h2>

    <hooper :vertical="true" style="height: 550px; margin-top: 50px;">
      <Slide style="height: 550px" v-for="monthIdx in 6" :key="monthIdx">
        <table class="table text-centere w-full">
          <thead>
            <th class="text-center" v-for="day in days" :key="day">
              {{ day }}
            </th>
          </thead>
          <tbody>
            <tr class="month-row">
              <td colspan="6">
                {{ `${months[monthIdx - 1]}월` }}
              </td>
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
    <button class="btn" @click="$emit('close')">취소</button>
    <button class="btn" @click="onSave">저장하기</button>
  </div>
</template>
<script>
// import VCalendar from '../../components/customer/VCalendar.vue'
import 'hooper/dist/hooper.css'
import { Hooper, Slide } from 'hooper'
import customer from '@/api/customer'
import api from '@/api/api'
import custom from '@/api/custom'

export default {
  components: { Hooper, Slide },
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
        4: [],
        5: [],
      },
      years: [],
      months: [],
      reservations: [],
      reserveDates: [],
      holidaies: [],
      lockDates: ['2022-05-23'],
      deliveryDay: '',
    }
  },
  computed: {
    remainDelivery() {
      return this.reservations.filter(
        (item) => item.delivered === false && item.locked === false
      ).length
    },
  },
  props: {
    orderId: Number,
  },

  async created() {
    await this.init()
  },
  methods: {
    async init() {
      // 네트워크 호출해서 초기데이터 세팅
      const res = await customer.getCustomerInfoAdmin(this.orderId)
      this.holidaies = (await customer.getHolidaysAdmin(this.orderId)).data.map(
        (item) => item.date
      )

      const {
        Package: { name },
        Reservations,
        deliveryType,
      } = res.data
      this.program = name
      this.isEarly = deliveryType === '새벽배송' || deliveryType === '직접배송'
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
      date.setMonth(date.getMonth() - 2)
      this.years.push(date.getFullYear())
      this.months.push(date.getMonth() + 1)

      for (let i = 0; i < 6; i++) {
        date.setMonth(date.getMonth() + 1)
        this.years.push(date.getFullYear())
        this.months.push(date.getMonth() + 1)
      }

      this.calendarData()
      const validReservations = this.reservations.filter(
        (reserve) => !reserve.holiday
      )

      const lastDeliveryDate = new Date(
        validReservations[validReservations.length - 1].deliveryDate
      )
      const day = await lastDeliveryDate.getDay()
      if ([1, 3].includes(day)) {
        this.deliveryDay = '월/수'
      } else {
        this.deliveryDay = '화/목'
      }
    },
    async changeReserveDate() {
      const confirm = window.confirm('배송 요일을 변경하시겠습니까?')
      if (!confirm) {
        return
      }

      await api.patchDeliveryDay(this.orderId)
      await this.init()
    },
    removeReserve() {
      console.log('remove')
      const reserves = this.reserveDates.sort().reverse()
      for (let i = 0; i < reserves.length; i++) {
        if (this.lockDates.includes(reserves[i])) {
          continue
        } else {
          this.reserveDates = this.reserveDates.filter(
            (item) => reserves[i] !== item
          )
          break
        }
      }
      console.log(this.reserveDates)
      this.calendarData()
    },

    addReserve() {
      const validReserves = this.reservations
        .filter((reserve) => !reserve.holiday && !reserve.locked)
        .sort()

      const newReserveDateObj = new Date(
        validReserves[validReserves.length - 1].deliveryDate
      )

      // 휴일 주간 날짜 다 배출
      const getHolidayTerm = () => {
        console.log(this.holidaies)
        const holidaies = []
        this.holidaies.forEach((item) => {
          holidaies.push(item)
          const curDate = new Date(item)
          if ([1, 3].includes(curDate.getDay())) {
            // 월 수 인 경우
            curDate.setDate(curDate.getDate() + 1)
            holidaies.push(curDate.toISOString().split('T')[0])
          } else {
            curDate.setDate(curDate.getDate() - 1)
            holidaies.push(curDate.toISOString().split('T')[0])
          }
        })
        return holidaies
      }

      console.log(getHolidayTerm())

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
          ) &&
          !getHolidayTerm().includes(
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
          newReserveDateObj.getDate() >= 10
            ? newReserveDateObj.getDate()
            : `0${newReserveDateObj.getDate()}`
        }`
      )

      this.calendarData()
    },

    lockDelivery(monthIdx, idx, secondIdx) {
      console.log(monthIdx, idx, secondIdx)
      //공휴일일 경우 해제 불가
      if (
        this.holidaies.includes(this.dates[monthIdx][idx][secondIdx].fullDay)
      ) {
        return window.alert('공휴일은 잠금 해제가 불가능합니다.')
      }

      // 잠금 처리
      if (this.dates[monthIdx][idx][secondIdx].locked) {
        console.log('locked')
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
      console.log('not locked')
      //잠금 진행
      this.lockDates.push(this.dates[monthIdx][idx][secondIdx].fullDay)
      this.addReserve()
      // 새로운 배송 일정 생성
      // const newReserveDateObj = new Date(
      //   this.reserveDates[this.reserveDates.length - 1]
      // )

      // this.$set(this.dates[monthIdx][idx][secondIdx], 'deliveryCandidate', true)
    },
    calendarData() {
      for (let i = 0; i < 6; i++) {
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
      const res = await customer.putReservationAdmin(
        {
          reserveDates: this.reserveDates,
          lockDates: this.lockDates,
        },
        this.orderId
      )
      if (res.success) {
        window.alert('정상적으로 저장되었습니다.')
        this.$emit('close')
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
    font-size: 10px;
    font-weight: 600;
  }
  .program-contents {
    font-weight: 300;
    font-size: 10px;
  }
  .program-label {
    color: #fff;
    display: inline;
    padding: 3px 5px;
    border-radius: 5px;
    font-size: 10px;
    line-height: 10px;
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
        text-align: end;
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
