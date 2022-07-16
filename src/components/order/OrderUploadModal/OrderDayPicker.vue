<template>
  <div class="order-day-picker--container">
    <div class="mt-3">{{ during }}일 프로그램 - {{ count }}개</div>
    <input
      :value="value"
      ref="dayPicker"
      class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
      type="date"
      @input="onInput"
      max="9999-12-31"
      id="program-20-early"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
    },
    count: {
      type: Number,
    },
    during: {
      type: String,
    },
  },
  data() {
    return {
      text: this.value,
    }
  },
  mounted() {
    if (this.value) {
      this.text = this.value
    }
  },
  watch: {
    value(val) {
      this.text = val
    },
  },
  methods: {
    onInput(e) {
      let text = e.target.value
      this.text = text
      this.$emit('input', text)
    },
  },
}
</script>
<style lang="scss"></style>
