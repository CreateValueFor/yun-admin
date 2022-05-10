<template>
  <div class="flex customer-select">
    <select
      class="yun-customer-select"
      :name="name"
      :id="name"
      v-model="localValue"
    >
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
    <img
      src="@/assets/customer/selectConfirm.svg"
      class="ml-3"
      style="width: 20px; height: 20px; object-fit:cover; "
      alt="select"
    />
  </div>
</template>
<script>
export default {
  name: 'customer-select',
  props: {
    name: {
      type: String,
      require: true,
    },
    options: {
      type: Array,
      require: true,
    },
    value: {
      type: [String, Number],
      require: true,
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
.yun-customer-select {
  border: 1px solid #b3b3b3;
  /* background: black; */
  width: 120px;
  height: 20px;
  border-radius: 0px;
  font-size: 10px;

  padding-left: 5px;
  /* padding-top: -5px; */
}
select {
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
