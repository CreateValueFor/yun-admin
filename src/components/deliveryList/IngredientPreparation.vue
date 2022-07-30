<template>
  <div class="ingredient--summary" style="margin-bottom: 30px;">
    <h2 class="summary--title bg-green-500 text-white">식재료 별 준비량</h2>
    <div
      v-for="ingredient in Object.keys(ingredientPreparation)"
      :key="ingredient"
      class="summary-item"
    >
      {{
        `${ingredient} : ${ingredientPreparation[ingredient].amount.toFixed(
          2
        )} ${ingredientPreparation[ingredient].unit}`
      }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ingredientPreparation: Object,
  },
}
</script>
<style lang="scss" scoped></style>
