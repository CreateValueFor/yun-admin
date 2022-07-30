<template>
  <div class="delivery--text-whitesummary ">
    <h2 class="summary--title bg-green-500 text-white">배송 통계</h2>
    <div class="flex">
      <div class="w-1/3">
        <h2>새벽</h2>
        <div>{{ '1식 ' + deliveryPreparation.early1 }}건</div>
        <div>{{ '2식 ' + deliveryPreparation.early2 }}건</div>
        <div>{{ '3식 ' + deliveryPreparation.early3 }}건</div>
        <div>{{ '총 팩수 ' + deliveryPreparation.earlyTotal }}개</div>
      </div>
      <div class="w-1/3">
        <h2>직접</h2>
        <div>{{ '1식 ' + deliveryPreparation.direct1 }}건</div>
        <div>{{ '2식 ' + deliveryPreparation.direct2 }}건</div>
        <div>{{ '3식 ' + deliveryPreparation.direct3 }}건</div>
        <div>{{ '총 팩수 ' + deliveryPreparation.directTotal }}개</div>
      </div>
      <div class="w-1/3">
        <h2>일반</h2>
        <div>{{ '1식 ' + deliveryPreparation.day1 }}건</div>
        <div>{{ '2식 ' + deliveryPreparation.day2 }}건</div>
        <div>{{ '3식 ' + deliveryPreparation.day3 }}건</div>
        <div>{{ '총 팩수 ' + deliveryPreparation.dayTotal }}개</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    deliveryPreparation: Object,
  },
}
</script>
<style lang="scss" scoped></style>
