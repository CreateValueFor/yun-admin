<template>
  <div class="w-full" style="padding-top: 50px; padding-bottom:100px;">
    <div class=" items-center">
      <div class="flex items-center justify-center" style="margin-bottom:26px">
        <img
          src="@/assets/customer/excludeIcon.svg"
          alt="exclude"
          class="mr-3"
        />
        <h2 class="program-title" style="font-size:14px;">{{ title }}</h2>
      </div>
      <div
        class="yun-label text-center"
        style="margin: 0px auto 10px; max-width: 230px; font-size:12px; line-height: 12px"
      >
        {{ label }}
      </div>
      <div class="w-full" style="position:relative;">
        <div class="flex justify-center" style="transform: translateX(47px)">
          <Select
            :options="options"
            :name="name"
            :value="value"
            @onChange="value = $event.value"
          />
          <button
            style="height:20px; border: 1px solid #e6e6e6; "
            class="input-button"
            @click="$emit('add', { name, value })"
          >
            추가
          </button>
        </div>
        <div style="font-size:12px;width: 100%;margin-top: 60px;">
          <h2 class="program-title text-center">
            {{ userName }}님이 제외하는 {{ type }}에요!
          </h2>
          <div
            style="margin: 14px auto 0px;max-width:300px;"
            class="flex flex-wrap justify-center"
          >
            <div
              v-for="item in selectedList"
              :key="item"
              class="selected-item"
              @click="$emit('remove', { name, value: item })"
            >
              # {{ item }}
            </div>
          </div>
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
<style lang="scss" scoped>
.selected-item {
  background: #000;
  color: #fff;
  padding: 0px 10px;
  margin: 2px;
  font-size: 10px;
  border-radius: 15px;
  display: inline;
  position: relative;
}
.input-button {
  margin-left: 10px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.5rem;
  background: #e6e6e6;
  border: 1px solid #fff;
  color: #555555;
}
</style>
