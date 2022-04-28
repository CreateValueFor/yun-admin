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
          @click="search"
        >
          검색하기
        </button>
      </div>
    </div>
    <div v-if="showSummary">
      <div class="ingredient--summary">
        <h2 class="summary--title bg-green-500 text-white">식재료 별 준비량</h2>
        <div
          v-for="ingredient in Object.keys(ingredientPreparation)"
          :key="ingredient"
        >
          {{ `${ingredient} : ${ingredientPreparation[ingredient]}` }}
        </div>
      </div>
      <div class="menu--summary">
        <h2 class="summary--title bg-green-500 text-white">메뉴별 식재료</h2>
        <div class="flex">
          <div
            v-for="menu in Object.keys(menuPreparation)"
            :key="menu"
            class="w-1/5"
          >
            <div>{{ menuPreparation[menu].name }}</div>
            <div>{{ `기본 : ${menuPreparation[menu].count || 0}` }}</div>
            <div>{{ `단150 : ${menuPreparation[menu].count15 || 0}` }}</div>
            <div>{{ `단200 : ${menuPreparation[menu].count20 || 0} ` }}</div>
            <div
              v-for="igd in menuPreparation[menu].ingredients"
              :key="menu + igd"
            >
              {{
                `${igd.name}: ${igd.count || 0} / (${
                  igd.Product_Ingredients.type
                })`
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="delivery--text-whitesummary ">
        <h2 class="summary--title bg-green-500 text-white">배송 통계</h2>
        <div class="flex">
          <div class="w-1/2">
            <h2>새벽</h2>
            <div>{{ '1식 ' + deliveryPreparation.early1 }}</div>
            <div>{{ '2식 ' + deliveryPreparation.early2 }}</div>
            <div>{{ '3식 ' + deliveryPreparation.early3 }}</div>
          </div>
          <div class="w-1/2">
            <h2>일반</h2>
            <div>{{ '1식 ' + deliveryPreparation.day1 }}</div>
            <div>{{ '2식 ' + deliveryPreparation.day2 }}</div>
            <div>{{ '3식 ' + deliveryPreparation.day3 }}</div>
          </div>
        </div>
      </div>
    </div>

    <table v-if="searchList.length">
      <thead>
        <th>구매자명</th>
        <th>수취인명</th>
        <th>수취인연락처</th>
        <th>구매자연락처</th>
        <th>배송지</th>
        <th>(기본주소)</th>
        <th>(상세주소)</th>
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
          <td>{{ delivery.Order.entrancePassword }}</td>
          <td>{{ delivery.Order.deliveryMessage }}</td>
          <td>{{ delivery.deliveryDate }}</td>

          <td>{{ delivery.productInfo }}</td>
          <td>{{ delivery.productName }}</td>
          <td>
            {{ delivery.Order.CarboType.name }}
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
import TapMenu from '../components/order/TapMenu.vue'
// import Modal from '../components/order/Modal.vue'
// import { utils, writeFile } from 'xlsx'
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
      searchDate: '',
      ingredientPreparation: {},
      menuPreparation: {},
      deliveryPreparation: {},
      showSummary: {},
    }
  },
  mounted() {
    this.searchDate = '2022-05-02'
    this.products = {
      product1: 11,
      product2: 2,
      product3: 3,
      product4: 5,
      product5: 4,
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
    async downloadExcel() {
      // 오늘 치 식재료에 쓰이는 메뉴 정보 불러오기
      const products = await api.getProductDetails({
        products: this.dailyMenuIds,
      })

      const productInfos = {}

      const ingredientPreparation = {
        고구마: 0,
        현미밥: 0,
        '사과(토핑)': 0,
        '당근(토핑)': 0,
        '콩(토핑)': 0,
      }

      const deliveryCountPreparation = {
        early1: 0,
        early2: 0,
        early3: 0,
        day1: 0,
        day2: 0,
        day3: 0,
      }
      // const product1Preparation = {}
      // const product2Preparation = {}
      // const product3Preparation = {}
      // const product4Preparation = {}
      // const product5Preparation = {}

      products.forEach((item) => {
        productInfos[item.id] = {
          name: item.name,
          ingredients: item.Ingredients,
        }
      })
      //제품 배정해주기

      this.searchList.forEach((item) => {
        const tmpOrder = item.Order
        const carboAmount = item.Order.carboAmount
        const deliveryType = item.Order.deliveryType
        const eatPerDay = item.Order.Package.eatPerDay
        const carboType = item.Order.CarboType.name
        const proteinAmount = item.Order.proteinAmount
        const excludeIngredientNames = item.Order.Ingredients.map(
          (exclude) => exclude.name
        )
        // 배송, 하루 끼니 별 취합
        if (deliveryType === '새벽배송') {
          //새벽 배송
          if (eatPerDay === 1) {
            deliveryCountPreparation.early1 += 1
          } else if (eatPerDay === 2) {
            deliveryCountPreparation.early2 += 1
          } else {
            deliveryCountPreparation.early3 += 1
          }
        } else {
          // 일반 배송
          if (eatPerDay === 1) {
            deliveryCountPreparation.day1 += 1
          } else if (eatPerDay === 2) {
            deliveryCountPreparation.day2 += 1
          } else {
            deliveryCountPreparation.day3 += 1
          }
        }

        // const excludes = item.excldueMenus
        const deliveryMenus = []
        const deliveryCount = tmpOrder.Package.eatPerDay * 2
        // 제품 순회하면서 담긴 것만 배열에 담기
        let i = 0
        while (deliveryMenus.length !== deliveryCount) {
          if (item.excludeMenus.length) {
            // 제외 메뉴가 있을 경우
            const excludeMenuIds = item.excludeMenus.map((item) => item.id)
            if (
              !excludeMenuIds.includes(this.products[`product${(i % 5) + 1}`])
            ) {
              deliveryMenus.push(this.products[`product${(i % 5) + 1}`])
            }
          } else {
            deliveryMenus.push(this.products[`product${(i % 5) + 1}`])
          }

          i += 1
        }
        // 메뉴 취합 완료
        // 식재료 별 준비량 찾기

        // TODO 메뉴별 1.5인분 수 1인분 수 구분 필요

        deliveryMenus.forEach((item) => {
          // 각 제품 제조 갯수 초기화
          if (!productInfos[item].count && !productInfos[item].count15) {
            productInfos[item].count = 0
            productInfos[item].count15 = 0
            productInfos[item].count20 = 0
            // 고구마
            productInfos[item].sweetPotato = {
              count: 0,
              count15: 0,
              count20: 0,
            }
            // 고구마 + 현미밥
            productInfos[item].mixed = {
              count: 0,
              count15: 0,
              count20: 0,
            }
            // 현미밥
            productInfos[item].rice = {
              count: 0,
              count15: 0,
              count20: 0,
            }
          }

          // 단백질 취합량
          if (proteinAmount === 1) {
            productInfos[item].count += 1
          } else if (proteinAmount === 1.5) {
            productInfos[item].count15 += 1
          } else {
            productInfos[item].count20 += 1
          }

          // 탄수화물 취합량
          if (carboAmount === 1) {
            productInfos[item][custom.carboTypeFormatter(carboType)].count += 1
            // 식재료 별 준비량 파싱
            if (carboType === '고구마') {
              ingredientPreparation.고구마 += 1
            } else if (carboType === '현미밥') {
              ingredientPreparation.현미밥 += 1
            } else {
              ingredientPreparation.고구마 += 0.5
              ingredientPreparation.현미밥 += 0.5
            }
          } else if (carboAmount === 1.5) {
            productInfos[item][
              custom.carboTypeFormatter(carboType)
            ].count15 += 1

            // 식재료 별 준비량 파싱
            if (carboType === '고구마') {
              ingredientPreparation.고구마 += 1.5
            } else if (carboType === '현미밥') {
              ingredientPreparation.현미밥 += 1.5
            } else {
              ingredientPreparation.고구마 += 0.75
              ingredientPreparation.현미밥 += 0.75
            }
          } else {
            productInfos[item][
              custom.carboTypeFormatter(carboType)
            ].carboCount20 += 1
            // 식재료 별 준비량 파싱
            if (carboType === '고구마') {
              ingredientPreparation.고구마 += 2
            } else if (carboType === '현미밥') {
              ingredientPreparation.현미밥 += 2
            } else {
              ingredientPreparation.고구마 += 1
              ingredientPreparation.현미밥 += 1
            }
          }
          // 식재료 취합
          productInfos[item].ingredients = productInfos[item].ingredients.map(
            (igd) => {
              if (!igd.count) {
                igd.count = 0
              }
              // 초기화가 된 경우 식재료 종류에 따라 제조물량 더해주기
              if (igd.Product_Ingredients.type === 'main') {
                // 메인 메뉴인 경우
                if (proteinAmount === 1) {
                  igd.count += 1
                } else if (proteinAmount === 1.5) {
                  igd.count += 1.5
                } else {
                  igd.count += 2
                }
              } else if (igd.Product_Ingredients.type === 'carbo') {
                // 탄수화물인 경우
                if (carboAmount === 1) {
                  igd.count += 1
                } else if (carboAmount === 1.5) {
                  igd.count += 1.5
                } else {
                  igd.count += 2
                }
              } else if (igd.Product_Ingredients.type === 'topping') {
                if (
                  excludeIngredientNames.length &&
                  ((igd.name === '병아리콩' &&
                    excludeIngredientNames.includes('콩')) ||
                    excludeIngredientNames.includes(igd.name))
                ) {
                  console.log('토핑 제외', igd.name)
                } else {
                  // 식재료 별 준비량
                  if (igd.name === '병아리콩') {
                    ingredientPreparation['콩(토핑)'] += 1
                  }
                  if (igd.name === '사과') {
                    ingredientPreparation['사과(토핑)'] += 1
                  }
                  if (igd.name === '당근') {
                    ingredientPreparation['당근(토핑)'] += 1
                  }

                  igd.count += 1
                }
              }

              // 단백질인 경우
              return igd
            }
          )
        })

        // 메뉴 배정해주기
      })
      console.log('최종 productInfos', productInfos)
      this.menuPreparation = productInfos
      console.log('식재료 별 준비량', ingredientPreparation)
      this.ingredientPreparation = ingredientPreparation
      console.log('끼니 및 배송 종류별 준비량', deliveryCountPreparation)
      this.deliveryPreparation = deliveryCountPreparation

      // 새벽 팩수, 일반 팩수

      // // 식재료 별 준비량
      // let totalRoot = 0
      // let totalRice = 0
      // let totalToping = {
      //   apple: 0,
      //   carrot: 0,
      //   bean: 0,
      // }

      // this.searchList.forEach((item) => {
      //   if (item.productInfo.includes('-2')) {
      //     console.log(item.productInfo.split(':'))
      //   }
      // })
      this.showSummary = true
      return

      // const excelData = this.searchList.map((item) => {
      //   return {
      //     구매자명: item.Order.buyer,
      //     수취인명: item.Order.receiver,
      //     수취인연락처: item.Order.receiverPhone,
      //     구매자연락처: item.Order.buyerPhone,
      //     배송지: item.Order.address1 + item.Order.address2 || '',
      //     '(기본주소)': item.Order.address1,
      //     '(상세주소)': item.Order.address2,
      //     '공동현관 비밀번호': item.Order.entrancePassword,
      //     배송메세지: item.Order.deliveryMessage,
      //     상품정보: item.productInfo,
      //     상품명: item.productName,
      //     '탄수화물 구성': item.Order.CarboType.name,
      //     단백질량: item.Order.carboAmount,
      //     탄수화물량: item.Order.proteinAmount,
      //     제외메뉴: item.excludeProduct,
      //     제외토핑: item.excludeTopping,
      //     배송: item.Order.deliveryType,
      //   }
      // })
      // const excelDataEarly = utils.json_to_sheet(excelData)
      // const workBook = utils.book_new()
      // utils.book_append_sheet(workBook, excelDataEarly, '제조 물량')
      // writeFile(workBook, `${this.searchDate}-제조물량.xlsx`)
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

      const res = await api.postDeliveryList(this.searchDate, this.products)

      const makeList = []

      res.map((result) => {
        const { item } = result
        let isExcludeProduct = false
        let isSpecial = false
        let specialList = []
        let availableMenu = []

        if (item.Order.carboAmount !== 1) {
          isSpecial = true
          if (item.Order.carboAmount === 1.5) {
            specialList.push('탄150')
          } else if (item.Order.carboAmount === 2) {
            specialList.push('탄200')
          }
        }
        if (item.Order.carboType !== 1) {
          isSpecial = true
          if (item.Order.carboType === 2) {
            specialList.push('고구마 + 현미밥')
          } else if (item.Order.carboType === 3) {
            specialList.push('현미밥만')
          }
        }
        if (item.Order.proteinAmount !== 1) {
          isSpecial = true
          if (item.Order.proteinAmount === 1.5) {
            specialList.push('단150')
          } else if (item.Order.proteinAmount === 2) {
            specialList.push('단200')
          }
        }
        if (item.Order.Ingredients.length) {
          isSpecial = true
          const toppings = []
          item.Order.Ingredients.map((item) => {
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

        if (result.excludeProduct.length) {
          isExcludeProduct = true
          const excludeProductIds = result.excludeProduct.map((item) => item.id)
          availableMenu = this.dailyMenuIds.filter(
            (item) => !excludeProductIds.includes(item)
          )
        }

        let eatPerday
        if (item.Order.Package) {
          eatPerday = item.Order.Package.eatPerDay
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
        }

        availableMenu = availableMenu.slice(0, saladCount)

        let productInfo = `${eatPerday} ${
          isExcludeProduct ? '-2' : isSpecial ? '-1' : ''
        } ${specialList.join(' / ')} ${
          availableMenu.length
            ? ' / 메뉴 :' +
              availableMenu
                .map((item) => this.productList[item - 1].name)
                .join(' ')
            : ''
        }`.replace('//', '/')

        // 상품 정보 추가

        makeList.push({
          ...item,
          productInfo: productInfo.trim(),
          productName: item.Order.Package ? item.Order.Package.name : '오류',
          excludeProduct: item.Order.Products.map((item) => item.name).join(
            ','
          ),
          excludeTopping: item.Order.Ingredients.map((item) => item.name).join(
            ','
          ),
          excludeMenus: result.excludeProduct,
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
