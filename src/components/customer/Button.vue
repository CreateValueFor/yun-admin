<template>
  <button
    class="yun-btn"
    :class="{ 'btn-primary': primary }"
    @click="onClick"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>
<script>
export default {
  name: 'yun-button',
  props: {
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onClick() {
      this.$emit('onClick')
    },
  },
}
</script>
<style lang="scss">
$y-green: #26331e;
$y-red: #9a1111;
$y-dark-blue: #02204b;
$y-blue: #002a5b;

.yun-btn {
  border-radius: 8px;
}

.btn-primary {
  background: $y-green;
  color: #fff;
}
</style>
