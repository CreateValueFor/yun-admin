<template>
  <div class="flex items-center justify-center">
    <div class="program-title-container flex mr-3">
      <img :src="require(`@/assets/customer/${img}.svg`)" :alt="img" />
      <h2 style="width: 63px; white-space:nowrap;" class="program-title">
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
<style lang="scss"></style>
