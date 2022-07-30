<template>
  <div>
    <h2 class="summary--title bg-green-500 text-white">
      메뉴별 식재료(메인)
    </h2>
    <div class="flex" style="margin-bottom: 30px;">
      <div
        v-for="menu in Object.keys(mainPreparation)"
        :key="menu"
        class="w-1/5"
      >
        <div>{{ menuPreparation[menu].name }}</div>

        <div
          v-for="igd in mainPreparation[menu]"
          :key="menu + igd.name"
          class="summary-item summary-item-detail"
        >
          <div>
            <div>
              <div>
                {{ igd.name }}
                {{
                  `(${
                    igd.Product_Ingredients.type === 'carbo'
                      ? '탄수화물'
                      : igd.Product_Ingredients.type === 'topping'
                      ? '토핑'
                      : '메인'
                  })`
                }}
              </div>
            </div>
            <div>
              <div>
                {{
                  (igd.Product_Ingredients.amount * (igd.count || 0)).toFixed(
                    2
                  ) + igd.Product_Ingredients.unit
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mainPreparation: Object,
    menuPreparation: Object,
  },
}
</script>
<style lang="scss">
table {
  min-width: 1444px;
  &.delivery-type-count {
    min-width: auto;
  }
  th {
    font-size: 12px;
  }
  tr {
    &.needCheck {
      background: #48bb78;
    }
  }
  td {
    font-size: 12px;
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    padding: 5px 8px;
  }
}
.summary-item {
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
</style>
