<template>
  <modal v-if="show">
    <h3 slot="header">주문 업로드 설정</h3>
    <div slot="body" class="flex">
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
        <div class="mt-3">10일 프로그램 - {{ orderCount.early10 }}개</div>
        <input
          v-model="uploadOption.early10"
          class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
          type="date"
          max="9999-12-31"
          id="program-10-early"
        />
        <div class="mt-3">20일 프로그램 - {{ orderCount.early20 }}개</div>
        <input
          v-model="uploadOption.early20"
          class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
          type="date"
          max="9999-12-31"
          id="program-20-early"
        />
      </div>
      <div class="w-1/2 p-3">
        <h3>일반배송(화, 목 배송)</h3>
        <div class="mt-3">10일 프로그램 - {{ orderCount.day10 }}개</div>
        <input
          v-model="uploadOption.day10"
          class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
          type="date"
          max="9999-12-31"
          id="program-10-day"
        />
        <div class="mt-3">20일 프로그램 - {{ orderCount.day20 }}개</div>
        <input
          v-model="uploadOption.day20"
          class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
          type="date"
          max="9999-12-31"
          id="program-20-day"
        />
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
export default {
  components: { Modal },
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
