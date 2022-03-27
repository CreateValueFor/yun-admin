<template>
  <input
    class="yun-input"
    :type="type"
    v-model="value"
    :placeholder="placeholder"
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
