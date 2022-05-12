<template>
  <div id="home" class="flex-1 flex flex-col">
    <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center text-blue-500">
          <a href="#" class="text-gray-700">Product</a>
          <svg
            class="fill-current w-3 h-3 mx-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
            />
          </svg>
        </li>
        <li class="flex items-center">
          <a href="#" class="text-gray-600">제품관리</a>
        </li>
      </ol>
    </nav>
    <div class="flex flex-wrap mb-3">
      <div class="flex w-1/2 mb-3">
        <p class="font-semibold w-32 text-lg">제품 추가</p>
        <input
          name="product"
          type="text"
          v-model="newProduct"
          placeholder="제품 추가"
          @keyup="onKeyUp"
          class="bg-white h-10 w-48 mr-3 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
        />
        <button
          class="bg-green-500 w-24	rounded-lg px-6 py-2 text-white font-semibold shadow"
          @click="createProduct"
        >
          생성
        </button>
      </div>

      <div class="flex w-1/2">
        <p class="font-semibold w-32 text-lg">식재료 생성</p>
        <input
          name="create"
          type="text"
          v-model="newIngredient"
          placeholder="식재료 생성"
          @keyup="onKeyUp"
          class="bg-white h-10 w-48 mr-3 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
        />
        <button
          class="bg-green-500 w-24	rounded-lg px-6 py-2 text-white font-semibold shadow"
        >
          생성
        </button>
      </div>
      <div class="flex w-1/2 mb-3">
        <p class="font-semibold w-32 text-lg">식재료 검색</p>
        <input
          name="search"
          type="text"
          v-model="ingredientKeyword"
          placeholder="식재료 검색"
          @keyup="onKeyUp"
          class="bg-white h-10 w-48 mr-3 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
        />
        <button
          class="bg-green-500 w-24	rounded-lg px-6 py-2 text-white font-semibold shadow"
          @click="searchIngredients"
        >
          검색
        </button>
      </div>
    </div>
    <div>
      <div v-if="searchIngredientsList.length">
        <button
          class="inline-block px-5 py-2 rounded-md mx-3"
          v-for="searchItem in searchIngredientsList"
          :class="[
            selectedProductIngredients.includes(searchItem.name)
              ? 'bg-red-200'
              : 'bg-green-200',
          ]"
          :key="searchItem.id"
          :disabled="selectedItemIdx === -1"
          @click="addIngredient(searchItem)"
        >
          {{ searchItem.name }} +
        </button>
      </div>
      <div v-else>검색 결과가 없습니다.</div>
    </div>
    <div class="flex justify-end mb-3">
      <button
        class=" w-48 rounded-lg px-6 py-2 text-white font-semibold shadow "
        :disabled="selectedItemIdx === -1"
        :class="{
          'bg-gray-200': selectedItemIdx === -1,
          'bg-green-500': selectedItemIdx !== -1,
        }"
        @click="onSave"
      >
        저장하기
      </button>
    </div>
    <div class="flex">
      <div class="w-1/5">
        <div
          class="border px-5 py-2 mx-3 rounded-lg mb-2 cursor-pointer hover:bg-blue-100"
          :class="{ 'bg-blue-200': selectedItemIdx === idx }"
          v-for="(product, idx) in productList"
          :key="`product-${idx}`"
          style="cursor:pointer"
          @click="selectProduct(idx)"
        >
          {{ product.name }}
        </div>
      </div>
      <div class="w-4/5">
        <div
          class="border px-5 py-2 mx-3 rounded-lg mb-2"
          v-for="(igd, idx) in selectedProductDetail.Ingredients"
          :key="`igd-${idx}`"
        >
          <button
            class="hover:opacity-50 bg-red-500 w-6 h-6 rounded-full mr-3 text-white"
            @click="deleteIngredient(igd.name)"
          >
            X
          </button>
          <span class="w-1/6 inline-block">{{ igd.name }} </span>
          <select
            name="type"
            class="bg-white h-8 w-1/6 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
            v-model="igd.Product_Ingredients.type"
          >
            <option value="topping">토핑</option>
            <option value="main">메인상품</option>
            <option value="carbo">탄수화물</option>
          </select>
          <input
            name="serch"
            type="text"
            v-model="igd.Product_Ingredients.amount"
            placeholder="값 입력"
            class="bg-white h-8 w-2/6 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
          />
          <input
            name="serch"
            type="text"
            v-model="igd.Product_Ingredients.unit"
            placeholder="단위 입력"
            class="bg-white h-8 w-1/6  xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
          />
        </div>
      </div>
    </div>
    <table>
      <thead></thead>
    </table>
  </div>
</template>
<script>
import api from '@/api/api.js'

export default {
  name: 'manage-product',
  data() {
    return {
      productList: [],
      ingredientList: [],
      newIngredient: '',
      newProduct: '',
      ingredientKeyword: '',
      selectedItemIdx: -1,
      selectedProductDetail: {},
      searchIngredientsList: [],
    }
  },
  computed: {
    selectedProductIngredients() {
      if (this.selectedItemIdx !== -1) {
        return this.selectedProductDetail.Ingredients.map((item) => item.name)
      } else {
        return []
      }
    },
  },
  async mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.ingredientList = await api.getAllIngredients()
      this.productList = await api.getAllProducts()
    },
    selectProduct(idx) {
      if (this.selectedItemIdx === idx) {
        this.selectedItemIdx = -1
        this.selectedProductDetail = {}
        return
      }
      this.selectedItemIdx = idx
      this.selectedProductDetail = this.productList[idx]
    },
    async createProduct() {
      const res = await api.createProduct(this.newProduct)
      if (res.success) {
        window.alert(this.newProduct + ' 제품이 추가되었습니다.')
        this.initialize()
      } else {
        window.alert('중복되는 제품입니다.')
      }
    },
    async createIngredient() {
      console.log(this.newIngredient)
      const res = await api.createIngredient({ name: this.newIngredient })
      if (res.success) {
        window.alert(this.newIngredient + ' 식재료가 추가되었습니다.')
      } else {
        window.alert('중복되는 식재료입니다.')
      }
      console.log(res)
    },
    async searchIngredients() {
      const { data } = await api.getIngredientsBySearch(this.ingredientKeyword)
      this.searchIngredientsList = data
    },
    async onKeyUp(e) {
      if (e.key === 'Enter') {
        if (e.target.name === 'search') {
          await this.searchIngredients()
        } else if (e.target.name === 'product') {
          await this.createProduct()
        } else {
          await this.createIngredient()
        }
      }
    },
    addIngredient(newIgd) {
      const { name, id } = newIgd
      if (this.selectedProductIngredients.includes(name)) {
        const idx = this.selectedProductDetail.Ingredients.findIndex(
          (item) => item.name === name
        )
        console.log(idx)
        this.$delete(this.selectedProductDetail.Ingredients, idx)
      } else {
        this.$set(
          this.selectedProductDetail.Ingredients,
          this.selectedProductDetail.Ingredients.length,
          {
            name,
            id,
            Product_Ingredients: { amount: 0, type: 'main', unit: '' },
          }
        )
      }
    },
    deleteIngredient(name) {
      const idx = this.selectedProductDetail.Ingredients.findIndex(
        (item) => item.name === name
      )
      this.$delete(this.selectedProductDetail.Ingredients, idx)
    },
    async onSave() {
      const res = await api.createProductIngredient(this.selectedProductDetail)

      if (res.success) {
        window.alert('입력하신 내용이 저장되었습니다.')
        this.initialize()
      } else {
        window.alert('시스템 에러 발생')
      }
    },
  },
}
</script>
<style lang="scss"></style>
