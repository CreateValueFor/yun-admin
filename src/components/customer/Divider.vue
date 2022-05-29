<template>
  <div class="guide-title">
    <div class="guide-title-contents">
      {{ title }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Divider',
  props: {
    title: {
      type: String,
      require: true,
    },
  },
}
</script>
<style lang="scss">
.guide-title {
  font-size: 0.875rem;
  line-height: 1rem;

  color: #999999;
  position: relative;
  margin-bottom: 15px;
  margin-top: 70px;
  width: 100%;
  height: 0.7px;
  background: #e6e6e6;
  .guide-title-contents {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    top: 50%;
    width: 33%;
    min-width: 160px;
    height: 30px;
    border: 1px solid #e6e6e6;
    background: #fff;
    border-radius: 7px;
    transform: translate(-50%, -50%);
  }
}
</style>
