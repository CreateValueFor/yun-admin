<template>
  <div class="lg:flex justify-start items-center mb-6">
    <router-link to="/order">
      <button
        class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold mr-3 shadow"
      >
        주문 업로드
      </button>
    </router-link>
    <router-link to="/order-list">
      <button
        class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold mr-3 shadow"
      >
        주문 리스트
      </button>
    </router-link>
    <button
      class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold  shadow"
    >
      주문 취소 리스트
    </button>
  </div>
</template>
<script>
export default {
  name: 'OrderTapMenu',
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="scss" scoped></style>
