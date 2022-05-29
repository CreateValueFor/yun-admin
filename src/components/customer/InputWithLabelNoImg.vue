<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <div class="program-title-container flex mr-3">
        <!-- <img :src="require(`@/assets/customer/${img}.svg`)" :alt="img" /> -->
        <h2 class="input-title">{{ title }}</h2>
      </div>
      <input
        :name="name"
        class="yun-customer-input"
        type="text"
        :disabled="disabled"
        style="width: 80%; font-size: 10px; padding-left: 10px; white-space:nowrap"
        v-model="localValue"
      />
    </div>
    <div class="yun-label">{{ label }}</div>
  </div>
</template>
<script>
export default {
  name: 'InputWithLabelNoImg',
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
    value: {
      type: [String, Number],
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
      set(newVal) {
        this.$emit('onChange', { name: this.name, value: newVal })
      },
    },
  },
  methods: {
    onKeyUp() {
      this.$emit({ name: this.name, value: this.value })
    },
  },
}
</script>
<style lang="scss" scope>
.program-title {
  font-size: 0.75rem;
}
.input-title {
  font-family: 'Roboto';

  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #000000;
  margin-bottom: 6px;
}
</style>
