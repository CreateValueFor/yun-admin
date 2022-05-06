<template>
  <input
    class="yun-input"
    :type="type"
    v-model="localValue"
    :placeholder="placeholder"
    :name="name"
  />
</template>
<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
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
}
</script>
<style lang="scss">
.yun-input {
  border: 1px solid #e6e6e6;
  border-radius: 5px;
}
input::placeholder {
  color: #d2d2d2;
}
</style>
