<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style lang="scss">
table {
  thead {
    background: #4299e1;
  }
  tbody {
    tr {
      td {
        border-bottom: 1px solid #e2e8f0;
        border-right: 1px solid #e2e8f0;
        padding: 5px 7px;
      }
    }
  }
}
</style>
