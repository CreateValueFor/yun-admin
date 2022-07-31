<template>
  <div class="flex">
    <RequestTable title="새벽배송" :summary="requestTableEarly" />
    <RequestTable title="직접배송" :summary="requestTableDirect" />
    <RequestTable title="일반배송" :summary="requestTableDay" />
  </div>
</template>
<script>
import RequestTable from '@/components/deliveryList/RequestTable.vue'
export default {
  components: {
    RequestTable,
  },
  props: {
    requestTableEarly: Object,
    requestTableDirect: Object,
    requestTableDay: Object,
  },
}
</script>
<style lang="scss" scoped></style>
