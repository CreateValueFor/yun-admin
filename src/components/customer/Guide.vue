<template>
  <div>
    <h1 class="page--header">
      {{ title }}
    </h1>
    <div class="page--guide py-5" style="padding-bottom:50px;">
      <div class="flex items-center mb-10">
        <img
          src="@/assets/customer/questionMark.svg"
          alt="question"
          style="width:15px; height:15px; margin-right:4px;"
        />
        <p style="font-size:1rem">수정을 위한 가이드</p>
      </div>
      <slot> </slot>
      <div class="guide-title">
        <div class="guide-title-contents">
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
}
</script>
<style lang="scss">
.page--header {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  /* identical to box height */

  color: #000000;
  margin: 30px auto;
  text-align: center;
}
.page--guide {
  border-top: 0.7px solid #e6e6e6;

  font-family: 'Roboto';

  font-size: 12px;
  line-height: 1rem;

  color: #999999;
  .detail {
    padding-left: 1rem;
  }
  .guide-title {
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
      height: 30px;
      border: 1px solid #e6e6e6;
      background: #fff;
      border-radius: 18px;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
