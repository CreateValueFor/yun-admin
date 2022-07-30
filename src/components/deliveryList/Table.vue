<template>
  <div style="overflow: scroll;">
    <table v-if="searchList.length">
      <thead>
        <th>구매자명</th>
        <th>수취인명</th>
        <th>수취인연락처</th>
        <th>구매자연락처</th>
        <th>배송지</th>
        <th>(기본주소)</th>
        <th>(상세주소)</th>
        <th>우편번호</th>
        <th>구매자ID</th>
        <th>공동현관 비밀번호</th>
        <th>배송메세지</th>
        <th>시작일</th>
        <th>상품정보</th>
        <th>상품명</th>
        <th>탄수화물 구성</th>
        <th>탄수화물량</th>
        <th>단백질량</th>
        <th>제외메뉴</th>
        <th>제외토핑</th>
        <th>배송</th>
        <th>요청사항</th>
      </thead>
      <tbody>
        <tr v-for="(delivery, idx) in searchList" :key="idx">
          <td>{{ delivery.Order.buyer }}</td>
          <td>{{ delivery.Order.receiver }}</td>
          <td>{{ delivery.Order.receiverPhone }}</td>
          <td>{{ delivery.Order.buyerPhone }}</td>
          <td>{{ delivery.Order.address1 + delivery.Order.address2 }}</td>
          <td>{{ delivery.Order.address1 }}</td>
          <td>{{ delivery.Order.address2 }}</td>
          <td>{{ delivery.Order.postNumber }}</td>
          <td>{{ delivery.Order.naverId }}</td>
          <td>{{ delivery.Order.entrancePassword }}</td>
          <td>{{ delivery.Order.deliveryMessage }}</td>
          <td>{{ delivery.deliveryDate }}</td>
          <td>{{ delivery.productInfo }}</td>
          <td>{{ delivery.productName }}</td>
          <td>
            {{ delivery.Order.CarboType.name.replaceAll(' ', '') }}
          </td>
          <td>{{ delivery.Order.carboAmount }}</td>
          <td>{{ delivery.Order.proteinAmount }}</td>
          <td>{{ delivery.excludeProduct }}</td>
          <td>{{ delivery.excludeTopping }}</td>
          <td>{{ delivery.Order.deliveryType }}</td>
          <td>{{ delivery.Order.request }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    searchList: Array,
  },
}
</script>
<style lang="scss" scoped>
table {
  min-width: 1444px;

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
