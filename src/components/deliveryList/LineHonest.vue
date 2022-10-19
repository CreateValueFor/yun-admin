<template>
  <div class="ingredient--summary" style="margin-bottom: 30px;">
    <h2 class="summary--title bg-green-500 text-white">라인 어니스트 취합량</h2>
    <div>
      <p>전체 팩 수 : {{ lineHonest.totalPacks }}</p>
      <p>새벽 배송 : {{ lineHonest.early }}건</p>
      <p>직접 배송 : {{ lineHonest.direct }}건</p>
      <p>일반 배송 : {{ lineHonest.day }}건</p>
      <div v-for="igd in lgds" :key="igd.name" class="summary-item">
        {{ `${igd.name} : ${igd.amount * lineHonest.totalPacks}g` }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lineHonest: Object,
  },
  data() {
    return {
      lgds: [
        {
          name: '닭가슴살',
          amount: 100,
        },
        {
          name: '고구마',
          amount: 100,
        },
        {
          name: '토마토',
          amount: 80,
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped></style>
