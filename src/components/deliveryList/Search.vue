<template>
  <div class="flex flex-1 flex-wrap -mx-3 ">
    <div class="bg-white w-full p-3 rounded-lg">
      <div class="flex mb-3">
        <p class="font-semibold w-32 text-lg">배송날짜</p>
        <input
          name="serch"
          type="date"
          v-model="searchDate"
          placeholder="Search products..."
          class="bg-white h-10 w-64 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
        />
      </div>
      <div class="flex mb-3">
        <p class="font-semibold w-32 text-lg">제조메뉴</p>
        <select
          v-model="products.product1"
          class="bg-white mr-3 h-10 w-32  px-5 rounded-lg border text-sm focus:outline-none"
        >
          <option
            v-for="(product, idx) in productList"
            :key="idx"
            :disabled="product.disabled"
            :value="product.id"
            >{{ product.name }}</option
          >
        </select>
        <select
          v-model="products.product2"
          class="bg-white mr-3 h-10 w-32  px-5 rounded-lg border text-sm focus:outline-none"
        >
          <option
            v-for="(product, idx) in productList"
            :key="idx"
            :disabled="product.disabled"
            :value="product.id"
            >{{ product.name }}</option
          >
        </select>
        <select
          v-model="products.product3"
          class="bg-white mr-3 h-10 w-32  px-5 rounded-lg border text-sm focus:outline-none"
        >
          <option
            v-for="(product, idx) in productList"
            :key="idx"
            :disabled="product.disabled"
            :value="product.id"
            >{{ product.name }}</option
          >
        </select>
        <select
          v-model="products.product4"
          class="bg-white mr-3 h-10 w-32  px-5 rounded-lg border text-sm focus:outline-none"
        >
          <option
            v-for="(product, idx) in productList"
            :key="idx"
            :disabled="product.disabled"
            :value="product.id"
            >{{ product.name }}</option
          >
        </select>
        <select
          v-model="products.product5"
          class="bg-white h-10 w-32  px-5 rounded-lg border text-sm focus:outline-none"
        >
          <option
            v-for="(product, idx) in productList"
            :key="idx"
            :disabled="product.disabled"
            :value="product.id"
            >{{ product.name }}</option
          >
        </select>
      </div>
      <button
        class="bg-green-500 w-48	rounded-lg px-6 py-2 text-white font-semibold shadow"
        @click="$emit('click')"
        :disabled="loading"
      >
        {{ loading ? '로딩 중...' : '검색하기' }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchDate: String,
    products: Object,
    productList: Array,
    loading: Boolean,
  },
}
</script>
<style lang="scss" scoped></style>
