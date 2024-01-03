<template lang="">
  <div>
    <modal v-if="show" @close="$emit('close')" @submit="updateOrder">
      <h3 slot="header">{{ editMode ? '프로그램 수정' : '프로그램 추가' }}</h3>
      <div slot="body">
        <div class="flex items-end">
          <div class="px-3">
            프로그램명
            <input
              v-model="name"
              class="mt-3 bg-white h-10 w-64 px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="buyer"
            />
          </div>
          <div class="w-1/3 px-3">
            배송횟수
            <input
              v-model="deliveryCount"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="number"
              id="receiver"
            />
          </div>
          <div class="w-1/3 px-3">
            하루 배달 제품 수
            <input
              v-model="eatPerDay"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="number"
              id="buyer"
            />
          </div>
          <div class="w-1/3 px-3">
            식단기간
            <input
              v-model="day"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="number"
              id="buyer"
            />
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from './Modal.vue'

export default {
  components: { Modal },
  props: {
    show: Boolean,
    modalData: Object,
    editMode: Boolean,
  },
  data() {
    return {
      name: '',
      deliveryCount: 0,
      eatPerDay: 0,
      day: 0,
    }
  },
  mounted() {
    console.log(this.editMode)
    if (this.editMode) {
      console.log('수정')
      this.name = this.modalData.name
      this.deliveryCount = this.modalData.deliveryCount
      this.eatPerDay = this.modalData.eatPerDay
      this.day = this.modalData.day
    }
    console.log(this.modalData)
  },
  methods: {
    updateOrder() {
      this.$emit('submit', {
        name: this.name,
        deliveryCount: this.deliveryCount,
        eatPerDay: this.eatPerDay,
        day: this.day,
      })
    },
  },
}
</script>
<style lang="scss">
nput[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
