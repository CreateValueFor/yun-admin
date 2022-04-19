<template>
  <div>
    <div>
      <img src="@/assets/customer/exclude.svg" alt="exclude" />
      <slot name="header">
        <h2 class="program-title">알러지 및<br />식재료 제외</h2>
      </slot>
      <select class="yun-customer-select" name="allergy" id="allergy">
        <option v-for="(item, idx) in ingredients" :key="idx">
          {{ item }}
        </option>
      </select>
      <button class="input-button">추가</button>
    </div>
    <h2 style="font-size:12px" class="program-title">
      {{ userName }}님이 제외하는 메뉴에요!
    </h2>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    options: {
      type: Array,
      require: true,
    },
  },
}
</script>
<style lang="scss"></style>
