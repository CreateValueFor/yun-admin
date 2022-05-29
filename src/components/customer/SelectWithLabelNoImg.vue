<template>
  <div class="flex flex-col items-center justify-center">
    <div class="program-title-container flex mr-3">
      <h2 style="width: 63px; white-space:nowrap;" class="select-title">
        {{ title }}
      </h2>
    </div>
    <Select
      @onChange="$emit('onChange', $event)"
      :options="options"
      :name="name"
      :value="localValue"
    />
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
  computed: {
    localValue: {
      get() {
        return this.value
      },
      // set(newVal) {
      //   this.$emit('onChange', { name: this.name, value: newVal })
      // },
    },
  },
}
</script>
<style lang="scss">
.select-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  color: #000000;
  margin-bottom: 6px;
}
</style>
