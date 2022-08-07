<template>
  <div style="overflow:scroll">
    <div style="min-width: 980px">
      <h2>배송 불가일 설정</h2>
      <div class="flex">
        <p class="font-semibold w-32 text-lg">배송 불가일 추가</p>
        <input
          type="date"
          name="date"
          v-model="newHoliday"
          placeholder="Search products..."
          class="bg-white h-10 w-64 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
        />
        <p class="font-semibold w-32 text-lg">배송 불가 타입</p>
        <select
          v-model="newHolidayType"
          class="bg-white h-10 w-64 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
        >
          <option value="새벽배송">새벽배송</option>
          <option value="일반배송">일반배송</option>
          <option value="직접배송">직접배송</option>
        </select>
        <button
          class="bg-green-500 w-48	rounded-lg px-6 py-2 text-white font-semibold shadow"
          @click="createHoliday"
        >
          공휴일 생성
        </button>
      </div>
      <div>
        <p>공휴일 목록</p>
        <div
          v-for="day in holidays"
          :key="day.id"
          class="px-3 py-1 border rounded-md my-3 flex items-center"
        >
          {{ day.date }} {{ day.target }}
          <div
            class="ml-3 cursor-pointer hover:opacity-70 bg-red-200 w-5 h-5 flex items-center justify-center rounded-full"
            @click="deleteHoliday(day.date, day.target)"
          >
            x
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'

export default {
  name: 'calendar',
  data() {
    return {
      newHoliday: '',
      newHolidayType: '',
      holidays: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.holidays = (await api.getHolidays()).data
    },

    async createHoliday() {
      if (!this.newHoliday || !this.newHolidayType) {
        return window.alert('값이 누락되었습니다.')
      }
      const res = await api.postHoliday({
        date: this.newHoliday,
        target: this.newHolidayType,
      })
      console.log(res)
      if (res.success) {
        window.alert('공휴일 추가 성공')
        this.init()
      }
    },
    async deleteHoliday(date, target) {
      const res = await api.deleteHoliday(date, target)
      if (res.success) {
        window.alert('공휴일 삭제 완료')
        this.init()
      }
    },
  },
}
</script>
<style lang="scss"></style>
