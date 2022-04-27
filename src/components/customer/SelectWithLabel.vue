<template>
  <div class="flex items-center justify-center">
    <div class="program-title-container flex mr-3">
      <img
        style="margin-right:10px;"
        :src="require(`@/assets/customer/${img}.svg`)"
        :alt="img"
      />
      <h2 style="width: 63px" class="program-title">{{ title }}</h2>
    </div>
    <Select :options="options" :name="name" :value="value" />
    <div class="yun-label">{{ label }}</div>
  </div>
</template>
<script>
import Select from './Select.vue'

export default {
  name: 'InputWithLabel',
  components: { Select },
  props: {
    img: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    label: {
      type: String,
    },
    options: {
      type: Array,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onKeyUp() {
      this.$emit({ name: this.name, value: this.value })
    },
  },
}
</script>
<style lang="scss"></style>
