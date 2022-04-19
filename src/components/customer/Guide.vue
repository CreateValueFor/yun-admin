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
}
</style>
