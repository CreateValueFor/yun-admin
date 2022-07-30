<template>
  <div>
    <h2 class="summary--title bg-green-500 text-white">
      메뉴별 식재료(댠백질/탄수화물)
    </h2>
    <div class="flex">
      <div
        v-for="menu in Object.keys(menuPreparation)"
        :key="menu"
        class="w-1/5"
      >
        <div>{{ menuPreparation[menu].name }}</div>
        <div class="summary-item">
          <div>{{ `단백질 총합` }}</div>
          <div>
            {{
              (menuPreparation[menu].count || 0) +
                (menuPreparation[menu].count15 * 1.5 || 0) +
                (menuPreparation[menu].count20 * 2 || 0)
            }}
          </div>
        </div>
        <div class="summary-item">
          <div>{{ `기본` }}</div>
          <div>{{ menuPreparation[menu].count || 0 }}</div>
        </div>
        <div class="summary-item">
          <div>
            {{ `단150` }}
          </div>
          <div>
            {{ menuPreparation[menu].count15 || 0 }}
          </div>
        </div>
        <div class="summary-item">
          <div>
            {{ `단200 ` }}
          </div>
          <div>
            {{ menuPreparation[menu].count20 || 0 }}
          </div>
        </div>
        <div v-if="menuPreparation[menu].sweetPotato">
          <div class="summary-item">
            <div>
              {{ `고구마 기본` }}
            </div>
            <div>
              {{ menuPreparation[menu].sweetPotato.count || 0 }}
            </div>
          </div>
          <div class="summary-item">
            <div>
              {{ `고구마 150` }}
            </div>
            <div>
              <div>
                {{ menuPreparation[menu].sweetPotato.count15 || 0 }}
              </div>
            </div>
          </div>
          <div class="summary-item">
            <div>
              고구마 200
            </div>
            <div>
              {{ menuPreparation[menu].sweetPotato.count20 || 0 }}
            </div>
          </div>
        </div>
        <div v-if="menuPreparation[menu].mixed">
          <div class="summary-item">
            <div>
              고구마 + 현미밥 기본
            </div>
            <div>
              {{ menuPreparation[menu].mixed.count || 0 }}
            </div>
          </div>
          <div class="summary-item">
            <div>
              고구마 + 현미밥 150
            </div>
            <div>
              {{ menuPreparation[menu].mixed.count15 || 0 }}
            </div>
          </div>
          <div class="summary-item">
            <div>
              고구마 + 현미밥 200
            </div>
            <div>
              {{ menuPreparation[menu].mixed.count20 || 0 }}
            </div>
          </div>
        </div>
        <div v-if="menuPreparation[menu].rice">
          <div class="summary-item">
            <div>
              현미밥 기본
            </div>
            <div>
              {{ menuPreparation[menu].rice.count || 0 }}
            </div>
          </div>
          <div class="summary-item">
            <div>
              현미밥 150
            </div>
            <div>
              {{ menuPreparation[menu].rice.count15 || 0 }}
            </div>
          </div>
          <div class="summary-item">
            <div>
              현미밥 200
            </div>
            <div>
              {{ menuPreparation[menu].rice.count20 || 0 }}
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
