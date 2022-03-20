<template>
  <div id="home" class="flex-1 flex flex-col">
    <!-- breadcrumb -->
    <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center text-blue-500">
          <a href="#" class="text-gray-700">Home</a>
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
          <a href="#" class="text-gray-600">Dashboard</a>
        </li>
      </ol>
    </nav>
    <!-- breadcrumb end -->

    <tap-menu />

    <div class="flex justify-end mb-3">
      <button
        class="bg-green-500 w-48	rounded-lg px-6 py-2 text-white font-semibold shadow"
        @click="downloadExcel"
      >
        제조물량 다운로드
      </button>
    </div>
    <div class="flex flex-1 flex-wrap -mx-3 ">
      <div class="bg-white w-full p-3 rounded-lg">
        <div class="flex mb-3">
          <p class="font-semibold w-32 text-lg">업로드 날짜</p>
          <input
            name="serch"
            type="date"
            placeholder="Search products..."
            class="bg-white h-10 w-64 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
          />
        </div>
        <div class="flex mb-3">
          <p class="font-semibold w-32 text-lg">조건별 검색</p>
          <select
            class="bg-white h-10 w-64 mr-3 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
          >
            <option value="white">한얀색</option>
          </select>
          <input
            name="serch"
            type="search"
            placeholder="Search products..."
            class="bg-white h-10 w-64 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
          />
        </div>
        <div class="flex mb-3">
          <p class="font-semibold w-32 text-lg">배송날짜</p>
          <input
            name="serch"
            type="date"
            placeholder="Search products..."
            class="bg-white h-10 w-64 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
          />
        </div>
        <div class="flex mb-3">
          <p class="font-semibold w-32 text-lg">제조메뉴</p>
          <select
            v-model="products.product1"
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
          <select
            v-model="products.product2"
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
          <select
            v-model="products.product3"
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
          <select
            v-model="products.product4"
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
        <div class="flex mb-3">
          <p class="font-semibold w-32 text-lg">제조토핑</p>
          <select
            class="bg-white h-10 w-64 xl:w-64 px-5 rounded-lg border text-sm focus:outline-none"
          >
            <option value="white">한얀색</option>
          </select>
        </div>
        <button
          class="bg-green-500 w-48	rounded-lg px-6 py-2 text-white font-semibold shadow"
          @click="search"
        >
          검색하기
        </button>
      </div>
    </div>
    <table v-if="searchList.length">
      <thead>
        <th>구매자명</th>
        <th>수취인명</th>
        <th>수취인연락처</th>
        <th>배송지</th>
        <th>(기본주소)</th>
        <th>(상세주소)</th>
        <th>공동현관 비밀번호</th>
        <th>배송메세지</th>
        <th>시작일</th>
        <th>종료일</th>
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
        <tr v-for="(order, idx) in searchList" :key="idx">
          <td>{{ order.buyer }}</td>
          <td>{{ order.receiver }}</td>
          <td>{{ order.receiverPhone }}</td>
          <td>{{ order.address1 + order.address2 }}</td>
          <td>{{ order.address1 }}</td>
          <td>{{ order.address2 }}</td>
          <td>{{ order.entrancePassword }}</td>
          <td>{{ order.deliveryMessage }}</td>
          <td>{{ order.startDate }}</td>

          <td>{{ order.endDate }}</td>
          <td>{{ order.productInfo }}</td>
          <td>{{ order.productName }}</td>
          <td>{{ order.CarboType.name }}</td>
          <td>{{ order.carboAmount }}</td>
          <td>{{ order.proteinAmount }}</td>
          <td>{{ order.excludeProduct }}</td>
          <td>{{ order.excludeTopping }}</td>
          <td>{{ order.deliveryType }}</td>
          <td>{{ order.request }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TapMenu from '../components/order/TapMenu.vue'
// import Modal from '../components/order/Modal.vue'
import { utils, writeFile } from 'xlsx'
import custom from '@/api/custom.js'
import api from '@/api/api.js'
// import axios from 'axios'

export default {
  name: 'DashboardHome',
  components: { TapMenu },
  data() {
    return {
      searchList: [],
      productList: custom.productList,
      products: {
        product1: '',
        product2: '',
        product3: '',
        product4: '',
        product5: '',
      },
    }
  },
  watch: {
    products: {
      deep: true,
      handler() {
        this.productList = this.productList.map((item) => {
          if (
            [
              this.products.product1,
              this.products.product2,
              this.products.product3,
              this.products.product4,
            ].includes(item.id)
          ) {
            return {
              ...item,
              disabled: true,
            }
          } else {
            return {
              ...item,
              disabled: false,
            }
          }
        })

        // console.log(newVal)
      },
    },
  },

  computed: {
    dailyMenuIds() {
      return [
        this.products.product1,
        this.products.product2,
        this.products.product3,
        this.products.product4,
        this.products.product5,
      ]
    },
  },
  methods: {
    downloadExcel() {
      const workBook = utils.book_new()
      utils.book_append_sheet(workBook, this.searchList, '제조 물량')
      writeFile(workBook, 'test.xlsx')
    },
    async search() {
      // 제조 메뉴 선택 안할 경우 불가
      if (this.products.product1 === '') {
        return window.alert('제조메뉴를 선택해주세요')
      }
      if (this.products.product2 === '') {
        return window.alert('제조메뉴를 선택해주세요')
      }
      if (this.products.product3 === '') {
        return window.alert('제조메뉴를 선택해주세요')
      }
      if (this.products.product4 === '') {
        return window.alert('제조메뉴를 선택해주세요')
      }
      if (this.products.product5 === '') {
        return window.alert('제조메뉴를 선택해주세요')
      }

      const res = await api.getOrderList()
      const makeList = []

      res.map((item) => {
        let isExcludeProduct = false
        let isSpecial = false
        let specialList = []
        let availableMenu = []

        if (item.carboAmount !== 1) {
          isSpecial = true
          if (item.carboAmount === 1.5) {
            specialList.push('탄150')
          } else if (item.carboAmount === 2) {
            specialList.push('탄200')
          }
        }
        if (item.carboType !== 1) {
          isSpecial = true
          if (item.carboType === 2) {
            specialList.push('고구마 + 현미밥')
          } else if (item.carboType === 3) {
            specialList.push('현미밥만')
          }
        }
        if (item.proteinAmount !== 1) {
          isSpecial = true
          if (item.carboAmount === 1.5) {
            specialList.push('단150')
          } else if (item.carboAmount === 2) {
            specialList.push('단200')
          }
        }
        if (item.Ingredients.length) {
          isSpecial = true
          const toppings = []
          item.Ingredients.map((item) => {
            switch (item.id) {
              case 3:
                return
              case 37:
                return toppings.push('당근x')
              case 4:
                return toppings.push('콩x')
            }
          })
          specialList.push(toppings.join(' '))
        }
        if (item.Products.length) {
          isExcludeProduct = true
          const excludeProductIds = item.Products.map((item) => item.id)
          availableMenu = this.dailyMenuIds.filter(
            (item) => !excludeProductIds.includes(item)
          )
        }

        let eatPerday
        if (item.Package) {
          eatPerday = item.Package.eatPerDay
        } else {
          eatPerday = 'something wrong'
        }

        // 메뉴 구성 만들기
        const saladCount = eatPerday * 2
        const availableCount = availableMenu.length

        if (availableMenu.length && availableMenu.length < saladCount) {
          for (let i = 0; saladCount - availableMenu.length > 0; i++) {
            availableMenu.push(availableMenu[i % availableCount])
          }
          console.log(availableMenu, saladCount)
        }

        availableMenu = availableMenu.slice(0, saladCount)

        let productInfo = `${eatPerday}${
          isExcludeProduct ? '-2' : isSpecial ? '-1' : ''
        } ${specialList.join(' / ')} ${
          availableMenu.length
            ? ' / ' +
              availableMenu
                .map((item) => this.productList[item - 1].name)
                .join(' ')
            : ''
        }`

        // 상품 정보 추가

        makeList.push({
          ...item,
          productInfo,
          productName: item.Package ? item.Package.name : '오류',
          excludeProduct: item.Products.map((item) => item.name).join(','),
          excludeTopping: item.Ingredients.map((item) => item.name).join(','),
        })
      })
      this.searchList = makeList
    },
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
