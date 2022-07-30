<template>
  <div>
    <input
      @change="onChange"
      id="excel"
      type="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    />
    <label for="excel">엑셀파일 입력</label>
    <button @click="onSubmit">제출</button>
  </div>
</template>
<script>
export default {
  methods: {
    onSubmit() {
      console.log('asdf')
    },
    onChnage(e) {},
  },
}
</script>
<style lang="scss"></style>
