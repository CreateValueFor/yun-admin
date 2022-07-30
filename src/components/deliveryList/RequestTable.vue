<template lang="">
  <div class="w-1/3">
    <h2>{{ title }}</h2>
    <table class="delivery-type-count">
      <thead>
        <th>
          A
        </th>
        <th>
          B
        </th>
        <th>
          C
        </th>
        <th>
          D
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(productInfo, idx) in Object.keys(summary).sort()"
          :key="`${productInfo}-${idx}`"
        >
          <td>{{ idx + 1 }}</td>
          <td>
            {{
              `${summary[productInfo][0].Order.receiver} ${
                summary[productInfo].length > 1
                  ? summary[productInfo][summary[productInfo].length - 1].Order
                      .receiver
                  : ''
              }`
            }}
          </td>
          <td>{{ productInfo }}</td>
          <td>{{ summary[productInfo].length }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    summary: Object,
  },
}
</script>
<style lang="scss" scoped>
table {
  th {
    font-size: 12px;
  }
  tr {
    &.needCheck {
      background: #48bb78;
    }
  }
  td {
    font-size: 12px;
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    padding: 5px 8px;
  }
}
</style>
