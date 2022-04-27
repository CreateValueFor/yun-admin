<template>
  <div style="padding-top: 50px; padding-bottom:100px;">
    <div class="flex items-center">
      <div class="flex items-center">
        <img
          src="@/assets/customer/exclude.svg"
          alt="exclude"
          class="mr-3"
          style="width:15px; height:15px; object-fit:none;"
        />
        <slot>
          <h2 style="width:70px" class="program-title">{{ title }}</h2>
        </slot>
      </div>
      <div class="mr-3" style="position:relative; width:50%">
        <!-- <select class="yun-customer-select" name="allergy" id="allergy">
          <option v-for="(item, idx) in ingredients" :key="idx">
            {{ item }}
          </option>
        </select> -->
        <Select :options="selectedList" :name="name" :value="value" />
        <div style="font-size:12px;position:absolute; top:50px;width: 100%;">
          <h2 class="program-title">
            {{ userName }}님이 제외하는 {{ type }}에요!
          </h2>
          <div>
            <div v-for="item in selectedList" :key="item" class="selected-item">
              # {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div style="position:relative; margin-top: -10px;">
        <button
          style="height:30px; border: 1px solid #e6e6e6; "
          class="input-button"
        >
          추가
        </button>
        <div
          class="yun-label"
          style="width:50px; line-height: .75rem; margin-left:0; position:absolute; top: 35px"
        >
          {{ label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Select from '@/components/customer/Select.vue'

export default {
  components: { Select },
  props: {
    title: {
      type: String,
    },
    options: {
      type: Array,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    label: {
      type: String,
    },
    userName: {
      type: String,
      require: true,
    },
    selectedList: {
      type: Array,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>
<style lang="scss">
.selected-item {
  background: #000;
  color: #fff;
  padding: 4px 10px;
  border-radius: 15px;
  display: inline;
}
</style>
