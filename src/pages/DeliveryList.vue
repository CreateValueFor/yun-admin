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
        class="bg-gray-500 w-48 mr-3	rounded-lg px-6 py-2 text-white font-semibold shadow"
        @click="downloadExcel"
      >
        배송리스트 다운로드
      </button>
      <button
        class="bg-green-500 w-48	rounded-lg px-6 py-2 text-white font-semibold shadow"
        @click="deliverySummary"
      >
        제조물량 간략보기
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
          :disabled="loading"
        >
          {{ loading ? '로딩 중...' : '검색하기' }}
        </button>
      </div>
    </div>
    <div v-if="showSummary">
      <div class="ingredient--summary">
        <h2 class="summary--title bg-green-500 text-white">식재료 별 준비량</h2>
        <div
          v-for="ingredient in Object.keys(ingredientPreparation)"
          :key="ingredient"
          class="summary-item"
        >
          {{
            `${ingredient} : ${ingredientPreparation[ingredient].amount.toFixed(
              2
            )} ${ingredientPreparation[ingredient].unit}`
          }}
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
            <div class="summary-item">
              <div>{{ `단백질 총합` }}</div>
              <div>
                {{
                  (menuPreparation[menu].count || 0) +
                    (menuPreparation[menu].count15 * 1.5 || 0) +
                    (menuPreparation[menu].count20 * 2 || 0)
                }}
              </div>
            </div>

            <div
              v-for="igd in menuPreparation[menu].ingredients"
              :key="menu + igd.name"
              class="summary-item summary-item-detail"
            >
              <div>
                <div>
                  {{ igd.name }}

                  {{
                    `(${
                      igd.Product_Ingredients.type === 'carbo'
                        ? '탄수화물'
                        : igd.Product_Ingredients.type === 'topping'
                        ? '토핑'
                        : '메인'
                    })`
                  }}
                </div>
                <!-- <div>
                  단위 :
                  {{
                    igd.Product_Ingredients.amount.toFixed(2) +
                      igd.Product_Ingredients.unit
                  }}
                </div> -->
              </div>

              <div>
                <!-- <div>{{ igd.count || 0 }}</div> -->
                <div>
                  {{
                    (igd.Product_Ingredients.amount * (igd.count || 0)).toFixed(
                      2
                    ) + igd.Product_Ingredients.unit
                  }}
                </div>
              </div>
            </div>

            <div class="summary-item">
              <div>{{ `기본` }}</div>
              <div>{{ menuPreparation[menu].count || 0 }}</div>
            </div>
            <div class="summary-item">
              <div>
                {{ `단150` }}
              </div>
              <div>
                {{ menuPreparation[menu].count15 || 0 }}
              </div>
            </div>
            <div class="summary-item">
              <div>
                {{ `단200 ` }}
              </div>
              <div>
                {{ menuPreparation[menu].count20 || 0 }}
              </div>
            </div>
            <div v-if="menuPreparation[menu].sweetPotato">
              <div class="summary-item">
                <div>
                  {{ `고구마 기본` }}
                </div>
                <div>
                  {{ menuPreparation[menu].sweetPotato.count || 0 }}
                </div>
              </div>
              <div class="summary-item">
                <div>
                  {{ `고구마 150` }}
                </div>
                <div>
                  <div>
                    {{ menuPreparation[menu].sweetPotato.count15 || 0 }}
                  </div>
                </div>
              </div>
              <div class="summary-item">
                <div>
                  고구마 200
                </div>
                <div>
                  {{ menuPreparation[menu].sweetPotato.count20 || 0 }}
                </div>
              </div>
            </div>
            <div v-if="menuPreparation[menu].mixed">
              <div class="summary-item">
                <div>
                  고구마 + 현미밥 기본
                </div>
                <div>
                  {{ menuPreparation[menu].mixed.count || 0 }}
                </div>
              </div>
              <div class="summary-item">
                <div>
                  고구마 + 현미밥 150
                </div>
                <div>
                  {{ menuPreparation[menu].mixed.count15 || 0 }}
                </div>
              </div>
              <div class="summary-item">
                <div>
                  고구마 + 현미밥 200
                </div>
                <div>
                  {{ menuPreparation[menu].mixed.count20 || 0 }}
                </div>
              </div>
            </div>
            <div v-if="menuPreparation[menu].rice">
              <div class="summary-item">
                <div>
                  현미밥 기본
                </div>
                <div>
                  {{ menuPreparation[menu].rice.count || 0 }}
                </div>
              </div>
              <div class="summary-item">
                <div>
                  현미밥 150
                </div>
                <div>
                  {{ menuPreparation[menu].rice.count15 || 0 }}
                </div>
              </div>
              <div class="summary-item">
                <div>
                  현미밥 200
                </div>
                <div>
                  {{ menuPreparation[menu].rice.count20 || 0 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="delivery--text-whitesummary ">
        <h2 class="summary--title bg-green-500 text-white">배송 통계</h2>
        <div class="flex">
          <div class="w-1/3">
            <h2>새벽</h2>
            <div>{{ '1식 ' + deliveryPreparation.early1 }}건</div>
            <div>{{ '2식 ' + deliveryPreparation.early2 }}건</div>
            <div>{{ '3식 ' + deliveryPreparation.early3 }}건</div>
            <div>{{ '총 팩수 ' + deliveryPreparation.earlyTotal }}개</div>
          </div>
          <div class="w-1/3">
            <h2>직접</h2>
            <div>{{ '1식 ' + deliveryPreparation.direct1 }}건</div>
            <div>{{ '2식 ' + deliveryPreparation.direct2 }}건</div>
            <div>{{ '3식 ' + deliveryPreparation.direct3 }}건</div>
            <div>{{ '총 팩수 ' + deliveryPreparation.directTotal }}개</div>
          </div>
          <div class="w-1/3">
            <h2>일반</h2>
            <div>{{ '1식 ' + deliveryPreparation.day1 }}건</div>
            <div>{{ '2식 ' + deliveryPreparation.day2 }}건</div>
            <div>{{ '3식 ' + deliveryPreparation.day3 }}건</div>
            <div>{{ '총 팩수 ' + deliveryPreparation.dayTotal }}개</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex" v-if="showSummary">
      <div class="w-1/3">
        <h2>새벽배송</h2>
        <table>
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
              v-for="(productInfo, idx) in Object.keys(
                requestTableEarly
              ).sort()"
              :key="`${productInfo}-${idx}`"
            >
              <td>{{ idx + 1 }}</td>
              <td>
                {{
                  `${requestTableEarly[productInfo][0].Order.receiver} ${
                    requestTableEarly[productInfo].length > 1
                      ? requestTableEarly[productInfo][
                          requestTableEarly[productInfo].length - 1
                        ].Order.receiver
                      : ''
                  }`
                }}
              </td>
              <td>{{ productInfo }}</td>
              <td>{{ requestTableEarly[productInfo].length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-1/3">
        <h2>직접배송</h2>
        <table>
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
              v-for="(productInfo, idx) in Object.keys(
                requestTableDirect
              ).sort()"
              :key="`${productInfo}-${idx}`"
            >
              <td>{{ idx + 1 }}</td>
              <td>
                {{
                  `${requestTableDirect[productInfo][0].Order.receiver} ${
                    requestTableDirect[productInfo].length > 1
                      ? requestTableDirect[productInfo][
                          requestTableDirect[productInfo].length - 1
                        ].Order.receiver
                      : ''
                  }`
                }}
              </td>
              <td>{{ productInfo }}</td>
              <td>{{ requestTableDirect[productInfo].length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-1/3">
        <h2>일반배송</h2>
        <table>
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
              v-for="(productInfo, idx) in Object.keys(requestTableDay).sort()"
              :key="`${productInfo}-${idx}`"
            >
              <td>{{ idx + 1 }}</td>
              <td>
                {{
                  `${requestTableDay[productInfo][0].Order.receiver} ${
                    requestTableDay[productInfo].length > 1
                      ? requestTableDay[productInfo][
                          requestTableDay[productInfo].length - 1
                        ].Order.receiver
                      : ''
                  }`
                }}
              </td>
              <td>{{ productInfo }}</td>
              <td>{{ requestTableDay[productInfo].length }}</td>
            </tr>
          </tbody>
        </table>
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
      searchDate: '',
      ingredientPreparation: {},
      menuPreparation: {},
      deliveryPreparation: {},
      showSummary: false,
      requestTableEarly: {},
      requestTableDay: {},
      requestTableDirect: {},
      loading: false,
    }
  },
  async mounted() {
    this.productList = await api.getAllProducts()
    // this.searchDate = '2022-06-01'
    // this.products = {
    //   product1: 19,
    //   product2: 3,
    //   product3: 8,
    //   product4: 1,
    //   product5: 2,
    // }
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
    initialize() {
      this.ingredientPreparation = {}
      this.menuPreparation = {}
      this.deliveryPreparation = {}
      this.requestTableEarly = {}
      this.requestTableDay = {}
      this.requestTableDirect = {}
      this.searchList = []
    },
    async deliverySummary() {
      // 오늘 치 식재료에 쓰이는 메뉴 정보 불러오기
      const products = await api.getProductDetails({
        products: this.dailyMenuIds,
      })

      const productInfos = {}

      const ingredientPreparation = {
        고구마: 0,
        현미밥: 0,
        '고구마+현미밥': 0,
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
        direct1: 0,
        direct2: 0,
        direct3: 0,

        earlyTotal: 0,
        dayTotal: 0,
        directTotal: 0,
      }

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
        } else if (deliveryType === '직접배송') {
          // 일반 배송
          if (eatPerDay === 1) {
            deliveryCountPreparation.direct1 += 1
          } else if (eatPerDay === 2) {
            deliveryCountPreparation.direct2 += 1
          } else {
            deliveryCountPreparation.direct3 += 1
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
          if (i > 100) {
            window.alert(
              `${item.Order.receiver}님께 배송 가능한 메뉴가 없어 식재료 준비량에 합산되지 않습니다.`
            )
            break
          }

          if (item.excludeMenus.length) {
            // 제외 메뉴가 있을 경우
            const excludeMenuIds = item.excludeMenus.map((item) => item.id)

            if (
              !excludeMenuIds.includes(this.products[`product${(i % 5) + 1}`])
            ) {
              deliveryMenus.push(this.products[`product${(i % 5) + 1}`])
            }
          } else {
            // 제외메뉴 없을 경우 그냥 하나씩 넣어주기
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
              // ingredientPreparation.고구마 += 0.5
              // ingredientPreparation.현미밥 += 0.5
              ingredientPreparation['고구마+현미밥'] += 1
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
              // ingredientPreparation.고구마 += 0.75
              // ingredientPreparation.현미밥 += 0.75
              ingredientPreparation['고구마+현미밥'] += 1
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
              // ingredientPreparation.고구마 += 1
              // ingredientPreparation.현미밥 += 1
              ingredientPreparation['고구마+현미밥'] += 2
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
                  !(
                    excludeIngredientNames.length &&
                    ((igd.name === '병아리콩' &&
                      excludeIngredientNames.includes('콩')) ||
                      excludeIngredientNames.includes(igd.name))
                  )
                ) {
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

      Object.keys(productInfos).forEach((menu) => {
        console.log(productInfos[menu].ingredients)
        productInfos[menu].ingredients = [
          ...productInfos[menu].ingredients.filter(
            (igd) => igd.Product_Ingredients.type === 'main'
          ),
          ...productInfos[menu].ingredients.filter(
            (igd) => igd.Product_Ingredients.type !== 'main'
          ),
        ]
      })

      this.menuPreparation = productInfos
      console.log('menuPreparation', this.menuPreparation)
      const filteredIngredientPreparation = {}

      Object.keys(productInfos).forEach((menu) => {
        productInfos[menu].ingredients.forEach((igd) => {
          if (!filteredIngredientPreparation[igd.name]) {
            if (igd.Product_Ingredients.type === 'carbo') {
              filteredIngredientPreparation[igd.name] = {
                name: igd.name,
                amount: igd.count * igd.Product_Ingredients.amount,
                priority: 1,
                unit: igd.Product_Ingredients.unit,
                // amount: igd.Product_Ingredients.amount,
                duplicate: false,
              }
            } else if (igd.Product_Ingredients.type === 'topping') {
              filteredIngredientPreparation[igd.name] = {
                name: igd.name,

                priority: 2,
                unit: igd.Product_Ingredients.unit,
                amount: igd.count * igd.Product_Ingredients.amount,
                duplicate: false,
              }
            } else {
              filteredIngredientPreparation[igd.name] = {
                name: igd.name,

                priority: 3,
                unit: igd.Product_Ingredients.unit,
                amount: igd.count * igd.Product_Ingredients.amount,
                duplicate: false,
              }
            }
          } else {
            filteredIngredientPreparation[igd.name].duplicate = true
            filteredIngredientPreparation[igd.name].amount +=
              igd.count * igd.Product_Ingredients.amount
          }
        })
      })

      this.ingredientPreparation = filteredIngredientPreparation
      // this.ingredientPreparation = ingredientPreparation

      deliveryCountPreparation.earlyTotal =
        deliveryCountPreparation.early1 * 2 +
        deliveryCountPreparation.early2 * 4 +
        deliveryCountPreparation.early3 * 6
      deliveryCountPreparation.directTotal =
        deliveryCountPreparation.direct1 * 2 +
        deliveryCountPreparation.direct2 * 4 +
        deliveryCountPreparation.direct3 * 6

      deliveryCountPreparation.dayTotal =
        deliveryCountPreparation.day1 * 2 +
        deliveryCountPreparation.day2 * 4 +
        deliveryCountPreparation.day3 * 6

      this.deliveryPreparation = deliveryCountPreparation

      this.showSummary = true
      return
    },
    downloadExcel() {
      if (!this.showSummary) {
        window.alert('먼저 제조물량 간략보기 버튼을 눌러주세요.')
      }
      const excelData = this.searchList.map((item) => {
        return {
          구매자명: item.Order.buyer,
          수취인명: item.Order.receiver,
          수취인연락처: item.Order.receiverPhone,
          구매자연락처: item.Order.buyerPhone,
          배송지: `${item.Order.address1} ${item.Order.address2}` || '',
          '(기본주소)': item.Order.address1,
          '(상세주소)': item.Order.address2,
          '공동현관 비밀번호': item.Order.entrancePassword,
          배송메세지: item.Order.deliveryMessage,
          배송일: item.deliveryDate,
          상품정보: item.productInfo,
          상품명: item.productName,
          '탄수화물 구성': item.Order.CarboType.name,
          단백질량: item.Order.carboAmount,
          탄수화물량: item.Order.proteinAmount,
          제외메뉴: item.excludeProduct,
          제외토핑: item.excludeTopping,
          배송: item.Order.deliveryType,
        }
      })

      // 식재료 취합
      const ingredientPreparationExcel = Object.keys(
        this.ingredientPreparation
      ).map((item) => {
        return {
          name: item,
          amount: `${this.ingredientPreparation[item].amount.toFixed(2)} ${
            this.ingredientPreparation[item].unit
          }`,
        }
      })

      // 메뉴 취합
      const menuPreparationExcel = Object.keys(this.menuPreparation).map(
        (key) => {
          const item = this.menuPreparation[key]

          const menu = {
            name: item.name,
            기본: item.count,
            단백질150g: item.count15,
            단백질200g: item.count20,
          }
          item.ingredients.forEach((igd) => {
            menu[igd.name] =
              igd.count * igd.Product_Ingredients.amount +
              igd.Product_Ingredients.unit
          })

          return [menu]
        }
      )

      const requestTableEarlyJson = []
      const requestTableDayJson = []
      const requestTableDirectJson = []

      Object.keys(this.requestTableEarly)
        .sort()
        .forEach((item, idx) => {
          requestTableEarlyJson.push({
            A: idx + 1,
            B: `${this.requestTableEarly[item][0].Order.receiver} ${
              this.requestTableEarly[item].length > 1
                ? this.requestTableEarly[item][
                    this.requestTableEarly[item].length - 1
                  ].Order.receiver
                : ''
            }`,
            C: item,
            D: this.requestTableEarly[item].length,
          })
        })

      Object.keys(this.requestTableDay)
        .sort()
        .forEach((item, idx) => {
          requestTableDayJson.push({
            A: idx + 1,
            B: `${this.requestTableDay[item][0].Order.receiver} ${
              this.requestTableDay[item].length > 1
                ? this.requestTableDay[item][
                    this.requestTableDay[item].length - 1
                  ].Order.receiver
                : ''
            }`,
            C: item,
            D: this.requestTableDay[item].length,
          })
        })

      Object.keys(this.requestTableDirect)
        .sort()
        .forEach((item, idx) => {
          requestTableDirectJson.push({
            A: idx + 1,
            B: `${this.requestTableDirect[item][0].Order.receiver} ${
              this.requestTableDirect[item].length > 1
                ? this.requestTableDirect[item][
                    this.requestTableDirect[item].length - 1
                  ].Order.receiver
                : ''
            }`,
            C: item,
            D: this.requestTableDirect[item].length,
          })
        })

      const excelDataEarly = utils.json_to_sheet(excelData)
      const ingredientPreparation = utils.json_to_sheet(
        ingredientPreparationExcel
      )
      const requestTableEarlyExcel = utils.json_to_sheet(requestTableEarlyJson)
      const requestTableDayExcel = utils.json_to_sheet(requestTableDayJson)
      const requestTableDirectExcel = utils.json_to_sheet(
        requestTableDirectJson
      )

      const workBook = utils.book_new()
      utils.book_append_sheet(workBook, excelDataEarly, '제조 물량')
      utils.book_append_sheet(
        workBook,
        ingredientPreparation,
        '식재료 별 준비량'
      )
      menuPreparationExcel.forEach((excel) => {
        const excelJson = utils.json_to_sheet(excel)
        utils.book_append_sheet(workBook, excelJson, excel[0].name)
      })

      utils.book_append_sheet(
        workBook,
        requestTableEarlyExcel,
        '요청사항표-새벽배송'
      )
      utils.book_append_sheet(
        workBook,
        requestTableDayExcel,
        '요청사항표-일반배송'
      )

      utils.book_append_sheet(
        workBook,
        requestTableDirectExcel,
        '요청사항표-직접배송'
      )
      writeFile(workBook, `${this.searchDate}-제조물량/요청사항표.xlsx`)
    },
    async search() {
      this.initialize()
      this.loading = true
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

      res
        // .filter((item) => item !== false)
        .map((result) => {
          const { item } = result

          let isSpecial = false
          let specialList = []
          let carboType = []
          let availableMenu = []

          if (item.Order.carboType !== 1) {
            isSpecial = true
            if (item.Order.carboType === 2) {
              carboType.push('고구마 + 현미밥')
            } else if (item.Order.carboType === 3) {
              carboType.push('현미밥만')
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
          if (item.Order.carboAmount !== 1) {
            isSpecial = true
            if (item.Order.carboAmount === 1.5) {
              specialList.push('탄150')
            } else if (item.Order.carboAmount === 2) {
              specialList.push('탄200')
            }
          }

          if (item.Order.Ingredients.length) {
            const toppings = []
            item.Order.Ingredients.map((item) => {
              switch (item.id) {
                case 6:
                  return toppings.push('아몬드x')
                case 3:
                case 37:
                  if (!toppings.includes('당근x')) {
                    return toppings.push('당근x')
                  }
                  return
                case 4:
                case 42:
                  if (!toppings.includes('콩x')) {
                    return toppings.push('콩x')
                  }
                  return
                case 41:
                  return toppings.push('토마토x')
                case 43:
                  return toppings.push('파슬리x')
                case 5:
                case 38:
                  if (!toppings.includes('사과x')) {
                    return toppings.push('사과x')
                  }
              }
            })
            if (toppings.length) {
              isSpecial = true
            }
            specialList.push(toppings.join(' '))
          }

          if (result.excludeProduct.length) {
            const excludeProductIds = result.excludeProduct.map(
              (item) => item.id
            )
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
          let isNotExcluded

          const firstProduct = this.products.product1
          const secondProduct = this.products.product2
          const thirdProduct = this.products.product3
          const fourthProduct = this.products.product4
          const fifthProduct = this.products.product5

          if (saladCount === 2) {
            isNotExcluded =
              !availableMenu.length ||
              (availableMenu.includes(firstProduct) &&
                availableMenu.includes(secondProduct))
          } else if (saladCount === 4) {
            isNotExcluded =
              !availableMenu.length ||
              (availableMenu.includes(firstProduct) &&
                availableMenu.includes(secondProduct) &&
                availableMenu.includes(thirdProduct) &&
                availableMenu.includes(fourthProduct))
          } else {
            isNotExcluded =
              !availableMenu.length ||
              (availableMenu.includes(firstProduct) &&
                availableMenu.includes(secondProduct) &&
                availableMenu.includes(thirdProduct) &&
                availableMenu.includes(fourthProduct) &&
                availableMenu.includes(fifthProduct))
          }

          // const isNotExcluded =
          //   !availableMenu.length ||
          //   (availableMenu.includes(firstProduct) &&
          //     availableMenu.includes(secondProduct))

          if (availableMenu.length && availableMenu.length < saladCount) {
            for (let i = 0; saladCount - availableMenu.length > 0; i++) {
              availableMenu.push(availableMenu[i % availableCount])
            }
          }

          availableMenu = availableMenu.slice(0, saladCount)
          const menuProvideObject = {}

          availableMenu.forEach((item) => {
            const name = this.productList.find((pr) => pr.id === item).name
            if (menuProvideObject[name]) {
              menuProvideObject[name].count += 1
            } else {
              menuProvideObject[name] = {
                name: name,
                count: 1,
              }
            }
          })

          let productInfo = `${eatPerday}${
            item.Order.Package.name.includes('2일') ? '단품' : ''
          }${!isNotExcluded ? '-2' : isSpecial ? '-1' : ''} ${
            !isNotExcluded
              ? Object.keys(menuProvideObject)
                  .map((item) =>
                    `${custom.productAbbreviator(
                      menuProvideObject[item].name
                    )} ${
                      menuProvideObject[item].count > 1
                        ? menuProvideObject[item].count
                        : ''
                    }`.trim()
                  )
                  .join(' ')
              : // ? availableMenu
                //     .map((item) => this.productList[item - 1].name)
                //     .map((item) => custom.productAbbreviator(item))
                //     .join(' ')
                ''
          } ${carboType.length ? `/ ${carboType}` : ''} ${(specialList.filter(
            (item) => item != false
          ).length > 0
            ? '/ '
            : '') +
            specialList
              .filter((item) => item != false)
              .reverse()
              .join(' / ')} `

          // 상품 정보 추가

          makeList.push({
            ...item,
            productInfo: productInfo.trim(),
            productName: item.Order.Package ? item.Order.Package.name : '오류',
            excludeProduct: item.Order.Products.map((item) => item.name).join(
              ','
            ),
            excludeTopping: item.Order.Ingredients.map(
              (item) => item.name
            ).join(','),
            excludeMenus: result.excludeProduct,
          })
        })

      makeList.forEach((item) => {
        if (
          item.Order.deliveryType === '새벽배송'
          // item.Order.deliveryType === '직접배송'
        ) {
          if (!this.requestTableEarly[item.productInfo]) {
            this.requestTableEarly[item.productInfo] = []
          }
          this.requestTableEarly[item.productInfo].push(item)
        } else if (item.Order.deliveryType === '직접배송') {
          if (!this.requestTableDirect[item.productInfo]) {
            this.requestTableDirect[item.productInfo] = []
          }
          this.requestTableDirect[item.productInfo].push(item)
        } else {
          if (!this.requestTableDay[item.productInfo]) {
            this.requestTableDay[item.productInfo] = []
          }
          this.requestTableDay[item.productInfo].push(item)
        }
      })

      // 새벽 배송 붙이기
      Object.keys(this.requestTableEarly)
        .sort()
        .forEach((key) => {
          this.searchList = [...this.searchList, ...this.requestTableEarly[key]]
        })

      // 직접 배송 붙이기
      Object.keys(this.requestTableDirect)
        .sort()
        .forEach((key) => {
          this.searchList = [
            ...this.searchList,
            ...this.requestTableDirect[key],
          ]
        })

      //일반 배송 붙이기
      Object.keys(this.requestTableDay)
        .sort()
        .forEach((key) => {
          this.searchList = [...this.searchList, ...this.requestTableDay[key]]
        })

      this.loading = false
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
.summary-item {
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
</style>
