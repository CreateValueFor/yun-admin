<template lang="">
  <div>
    <modal v-if="show" @close="$emit('close')" @submit="updateOrder">
      <h3 slot="header">주문 수정</h3>
      <div slot="body">
        <div class="flex">
          <div class="w-1/3 px-3">
            구매자명
            <input
              v-model="modalData.buyer"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="buyer"
            />
          </div>
          <div class="w-1/3 px-3">
            수취인명
            <input
              v-model="modalData.receiver"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="receiver"
            />
          </div>
          <div class="w-1/3 px-3">
            수취인연락처
            <input
              v-model="modalData.receiverPhone"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="buyer"
            />
          </div>
          <div class="w-1/3 px-3">
            구매자연락처
            <input
              v-model="modalData.buyerPhone"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="buyer"
            />
          </div>
        </div>
        <div class="flex mt-3">
          <div class="w-1/2  px-3">
            기본주소
            <input
              v-model="modalData.address1"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="address1"
            />
          </div>
          <div class="w-1/2  px-3">
            상세주소
            <input
              v-model="modalData.address2"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="address2"
            />
          </div>
        </div>
        <div class="flex mt-3">
          <div class="w-1/2 px-3">
            공동현관 비밀번호
            <input
              v-model="modalData.entrancePassword"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="entrancePassword"
            />
          </div>
          <div class="w-1/2 px-3">
            <div>상품명</div>
            <select
              v-model="modalData.package"
              class="mt-3 bg-white h-10 w-full  px-5 rounded-lg border text-sm focus:outline-none"
            >
              <option>1일 1식 10일 프로그램</option>
              <option>1일 2식 10일 프로그램</option>
              <option>1일 3식 10일 프로그램</option>
              <option>1일 1식 20일 프로그램</option>
              <option>1일 2식 20일 프로그램</option>
              <option>1일 3식 20일 프로그램</option>
              <option>1일 4식 20일 프로그램</option>
            </select>
          </div>
        </div>

        <div class="flex mt-3">
          <div class="w-1/2 px-3">
            제외토핑
            <div>
              <label for="excludeCarrotTopping">당근</label>
              <input
                v-model="modalData.excludeToppingObject.carrot"
                class=" mx-3 bg-white rounded-lg border text-sm focus:outline-none"
                type="checkbox"
                id="excludeCarrotTopping"
              />
              <label for="excludeBeanTopping">콩</label>
              <input
                v-model="modalData.excludeToppingObject.bean"
                class=" ml-3 bg-white rounded-lg border text-sm focus:outline-none"
                type="checkbox"
                id="excludeBeanTopping"
              />
            </div>
          </div>
          <div class="w-1/2 ">
            탄수화물구성
            <div>
              <label for="sweetPotato">고구마</label>
              <input
                v-model="modalData.carboType"
                value="고구마"
                class=" mx-1 bg-white rounded-lg border text-sm focus:outline-none"
                type="radio"
                id="sweetPotato"
              />
              <label for="mixed">고구마 + 현미밥</label>
              <input
                v-model="modalData.carboType"
                value="고구마 + 현미밥"
                class=" mx-1 bg-white rounded-lg border text-sm focus:outline-none"
                type="radio"
                id="mixed"
              />
              <label for="rice">현미밥</label>
              <input
                v-model="modalData.carboType"
                value="현미밥"
                class=" ml-1 bg-white rounded-lg border text-sm focus:outline-none"
                type="radio"
                id="rice"
              />
            </div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="w-1/2">
            단백질량
            <select
              v-model="modalData.proteinAmount"
              class="bg-white h-10 w-32  px-5 rounded-lg border text-sm focus:outline-none"
            >
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
            </select>
          </div>
          <div class="w-1/2">
            탄수화물량
            <select
              v-model="modalData.carboAmount"
              class="bg-white h-10 w-32  px-5 rounded-lg border text-sm focus:outline-none"
            >
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
            </select>
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
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.modalData)
  },
  methods: {
    updateOrder() {
      this.$emit('submit', this.modalData)
    },
  },
}
</script>
<style lang=""></style>
