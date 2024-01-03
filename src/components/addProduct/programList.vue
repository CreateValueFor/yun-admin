<template>
  <div style="overflow: scroll;">
    <table>
      <thead>
        <th>프로그램명</th>
        <th>배송횟수</th>
        <th>하루 배달 제품수</th>
        <th>식단기간</th>
        <th width="200">수정</th>
      </thead>
      <tbody>
        <tr v-for="(program, idx) in searchList" :key="idx">
          <td>{{ program.name }}</td>
          <td>{{ program.deliveryCount }}</td>
          <td>{{ program.eatPerDay }}</td>
          <td>{{ program.day }}</td>
          <td>
            <button
              v-if="idx > 13"
              class="bg-green-500 w-full	rounded-lg px-6 py-2 text-white font-semibold shadow"
              @click="$emit('edit', idx)"
            >
              수정
            </button>
            <p v-else>수정 불가</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'ProgramList',
  props: {
    searchList: Array,
  },
  mounted() {
    console.log(this.searchList)
  },
}
</script>
<style lang="scss">
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
