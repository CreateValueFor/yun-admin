<template>
  <modal v-if="show">
    <h3 slot="header">주문 업로드 설정</h3>
    <div slot="body" class="flex">
      <div class="w-1/2 p-3 border-r">
        <h3>직접배송</h3>
        <div class="mt-3">
          <input
            type="radio"
            v-model="uploadOption.directType"
            name="deliveryDateDirect"
            value="mw"
            id="mw-date-direct"
          />
          <label for="mw-date-direct" class="mr-3">월/수</label>
          <input
            type="radio"
            v-model="uploadOption.directType"
            name="deliveryDateDirect"
            value="tt"
            id="tt-date-direct"
          />
          <label for="tt-date-direct">화/목</label>
        </div>

        <order-day-picker
          v-model="uploadOption.direct"
          :count="orderCount.direct"
          during="2"
          all
        />

        <!-- <order-day-picker
          v-model="uploadOption.direct2"
          :count="orderCount.direct2"
          during="2"
        />
        <order-day-picker
          v-model="uploadOption.direct4"
          :count="orderCount.direct4"
          during="4"
        />
        <order-day-picker
          v-model="uploadOption.direct10"
          :count="orderCount.direct10"
          during="10"
        />
        <order-day-picker
          v-model="uploadOption.direct20"
          :count="orderCount.direct20"
          during="20"
        /> -->
      </div>

      <div class="w-1/2 p-3 border-r">
        <h3>새벽배송</h3>
        <div class="mt-3">
          <input
            type="radio"
            v-model="uploadOption.earlyType"
            name="deliveryDate"
            value="mw"
            id="mw-date"
          />
          <label for="mw-date" class="mr-3">월/수</label>
          <input
            type="radio"
            v-model="uploadOption.earlyType"
            name="deliveryDate"
            value="tt"
            id="tt-date"
          />
          <label for="tt-date">화/목</label>
        </div>

        <order-day-picker
          v-model="uploadOption.early"
          :count="orderCount.early"
          during="2"
          all
        />
        <!-- <order-day-picker
          v-model="uploadOption.early2"
          :count="orderCount.early2"
          during="2"
        />
        <order-day-picker
          v-model="uploadOption.early4"
          :count="orderCount.early4"
          during="4"
        />
        <order-day-picker
          v-model="uploadOption.early10"
          :count="orderCount.early10"
          during="10"
        />
        <order-day-picker
          v-model="uploadOption.early20"
          :count="orderCount.early20"
          during="20"
        /> -->
      </div>

      <div class="w-1/2 p-3">
        <h3>일반배송(화, 목 배송)</h3>
        <order-day-picker
          v-model="uploadOption.day"
          :count="orderCount.day"
          during="2"
          all
        />
        <!-- <order-day-picker
          v-model="uploadOption.day2"
          :count="orderCount.day2"
          during="2"
        />
        <order-day-picker
          v-model="uploadOption.day4"
          :count="orderCount.day4"
          during="4"
        />
        <order-day-picker
          v-model="uploadOption.day10"
          :count="orderCount.day10"
          during="10"
        />
        <order-day-picker
          v-model="uploadOption.day20"
          :count="orderCount.day20"
          during="20"
        /> -->
      </div>
    </div>
    <div slot="footer" class="flex justify-end">
      <button
        class="bg-white shadow border rounded-lg px-6 py-2 mr-3"
        @click="$emit('close')"
      >
        취소
      </button>
      <button
        @click="$emit('submit')"
        :disabled="loading"
        class="bg-green-500 shadow rounded-lg px-6 py-2 text-white"
      >
        <svg
          v-if="loading"
          class="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        >
          <!-- ... -->
        </svg>
        <span v-else>
          업로드
        </span>
      </button>
    </div>
  </modal>
</template>
<script>
import Modal from './Modal.vue'
import OrderDayPicker from './OrderUploadModal/OrderDayPicker.vue'
export default {
  components: { Modal, OrderDayPicker },
  name: 'order-upload-modal',
  props: {
    show: Boolean,
    uploadOption: Object,
    orderCount: Object,
    loading: Boolean,
  },
}
</script>
<style lang="scss"></style>
