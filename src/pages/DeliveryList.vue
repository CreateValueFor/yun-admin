<template>
  <div id="home" class="flex-1 flex flex-col">
    <!-- breadcrumb -->
    <PageTitle />
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
    <!-- <Search
      :searchDate="searchDate"
      :products="products"
      :productList="productList"
      @click="search"
      :loading="loading"
    /> -->
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
          <div>
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
            <div>
              <input
                type="checkbox"
                name="product1_mixed"
                id="product1_mixed"
                v-model="isMixedGrain.product1"
              />
              <label for="product1_mixed">고구마+현미밥 </label>
            </div>
          </div>
          <div>
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
            <div>
              <input
                type="checkbox"
                name="product2_mixed"
                id="product2_mixed"
                v-model="isMixedGrain.product2"
              />
              <label for="product2_mixed">고구마+현미밥 </label>
            </div>
          </div>
          <div>
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
            <div>
              <input
                type="checkbox"
                name="product3_mixed"
                id="product3_mixed"
                v-model="isMixedGrain.product3"
              />
              <label for="product3_mixed">고구마+현미밥 </label>
            </div>
          </div>
          <div>
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
            <div>
              <input
                type="checkbox"
                name="product4_mixed"
                id="product4_mixed"
                v-model="isMixedGrain.product4"
              />
              <label for="product4_mixed">고구마+현미밥 </label>
            </div>
          </div>
          <div>
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
            <div>
              <input
                type="checkbox"
                name="product5_mixed"
                id="product5_mixed"
                v-model="isMixedGrain.product5"
              />
              <label for="product5_mixed">고구마+현미밥 </label>
            </div>
          </div>
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
      <LineHonest :lineHonest="lineHonest" />
      <IngredientPreparation :ingredientPreparation="ingredientPreparation" />

      <div class="menu--summary">
        <MainPreparation
          :mainPreparation="mainPreparation"
          :menuPreparation="menuPreparation"
        />
        <ToppingPreparation
          :toppingPreparation="toppingPreparation"
          :menuPreparation="menuPreparation"
        />
        <CPPreparation :menuPreparation="menuPreparation" />
      </div>
      <DeliverySummary :deliveryPreparation="deliveryPreparation" />
      <RequestTableGroup
        :requestTableEarly="requestTableEarly"
        :requestTableDirect="requestTableDirect"
        :requestTableDay="requestTableDay"
      />
    </div>

    <Table :searchList="[...searchList, ...specialProgramList]" />
  </div>
</template>

<script>
import TapMenu from '../components/order/TapMenu.vue'
// import Modal from '../components/order/Modal.vue'
import { utils, writeFile } from 'xlsx'
import custom from '@/api/custom.js'
import api from '@/api/api.js'
import RequestTableGroup from '@/components/deliveryList/RequestTableGroup.vue'
import Table from '@/components/deliveryList/Table.vue'
import DeliverySummary from '@/components/deliveryList/DeliverySummary.vue'
import MainPreparation from '@/components/deliveryList/MainPreparation.vue'
import ToppingPreparation from '@/components/deliveryList/ToppingPreparation.vue'
import CPPreparation from '@/components/deliveryList/CPPreparation.vue'
import IngredientPreparation from '@/components/deliveryList/IngredientPreparation.vue'
import LineHonest from '@/components/deliveryList/LineHonest.vue'
// import Search from '@/components/deliveryList/Search.vue'
import PageTitle from '@/components/common/PageTitle.vue'

// import axios from 'axios'

export default {
  name: 'DashboardHome',
  components: {
    TapMenu,
    RequestTableGroup,
    DeliverySummary,
    Table,
    MainPreparation,
    ToppingPreparation,
    CPPreparation,
    IngredientPreparation,
    LineHonest,
    PageTitle,
    // Search,
  },
  data() {
    return {
      searchList: [],
      specialProgramList: [],
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
      lineHonest: {
        totalPacks: 0,
        early: 0,
        direct: 0,
        day: 0,
      },
      menuPreparation: {},
      mainPreparation: {},
      toppingPreparation: {},
      deliveryPreparation: {},
      showSummary: false,
      requestTableEarly: {},
      requestTableDay: {},
      requestTableDirect: {},
      loading: false,
      specialPrograms: [],
      markedToppings: [
        '콩',
        '병아리콩',
        '콩 추가 (ㅇ)',
        '당근',
        '토핑당근',
        '방울토마토',
        '사과',
        '견과류',
        '아몬드',
        '스위트콘',
        '삶은계란 (토핑)',
        '건크렌베리 (ㅇ)',
        '바나나칩 (ㅇ)',
        '콩 추가 (ㅇ)',
        '견과류 추가 (ㅇ)',
      ],
      isMixedGrain: {
        product1: false,
        product2: false,
        product3: false,
        product4: false,
        product5: false,
      },
    }
  },
  async mounted() {
    this.productList = await api.getAllProducts()
    this.searchDate = '2024-01-08'
    this.products = {
      product1: 1,
      product2: 2,
      product3: 3,
      product4: 4,
      product5: 5,
    }
    this.specialPrograms = (await api.getProgramList()).slice(14)
    console.log(this.specialPrograms)
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
    getMenus(row) {
      const deliveryMenus = []
      const deliveryCount = row.Order.Package.eatPerDay * 2
      // 제품 순회하면서 담긴 것만 배열에 담기
      let i = 0
      const excludeMenuIds = row.excludeMenus.map((item) => item.id)

      while (deliveryMenus.length !== deliveryCount) {
        let productIdx = (i % 5) + 1
        let product = this.products[`product${productIdx}`]
        if (i > 100) {
          window.alert(
            `${row.Order.receiver}님께 배송 가능한 메뉴가 없어 식재료 준비량에 합산되지 않습니다.`
          )
          break
        }
        if (!excludeMenuIds.includes(product)) {
          if (deliveryCount === 6) {
            if ([1, 2].includes(productIdx) && deliveryMenus.length < 5) {
              deliveryMenus.push(product)
              deliveryMenus.push(product)
            } else {
              deliveryMenus.push(product)
            }
          } else {
            deliveryMenus.push(product)
          }
        }

        i += 1
      }
      return deliveryMenus
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

      // 라인 어니스트 인 경우 예외 처리
      this.searchList.forEach((item) => {
        if (item.Order.Package.name === '라인 어니스트') {
          this.lineHonest.totalPacks += 1 * item.Order.count
          const deliveryType = item.Order.deliveryType.trim()

          switch (deliveryType) {
            case '새벽배송':
              this.lineHonest.early += 1
              break
            case '직접배송':
              this.lineHonest.direct += 1
              break
            case '일반배송':
              this.lineHonest.day += 1
              break
            default:
              break
          }
          return
        }
        if (this.specialPrograms.includes(item.Order.buyer)) {
          return
        }

        const tmpOrder = item.Order
        const carboAmount = item.Order.carboAmount
        const deliveryType = item.Order.deliveryType.trim()
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
        const excludeMenuIds = item.excludeMenus.map((item) => item.id)

        while (deliveryMenus.length !== deliveryCount) {
          let productIdx = (i % 5) + 1
          let product = this.products[`product${productIdx}`]
          if (i > 100) {
            window.alert(
              `${item.Order.receiver}님께 배송 가능한 메뉴가 없어 식재료 준비량에 합산되지 않습니다.`
            )
            break
          }
          if (!excludeMenuIds.includes(product)) {
            if (deliveryCount === 6) {
              if ([1, 2].includes(productIdx) && deliveryMenus.length < 5) {
                deliveryMenus.push(product)
                deliveryMenus.push(product)
              } else {
                deliveryMenus.push(product)
              }
            } else {
              deliveryMenus.push(product)
            }
          }

          i += 1
        }
        // const deliveryMenus = getMenus(item)
        // 메뉴 취합 완료
        // 식재료 별 준비량 찾기

        // TODO 메뉴별 1.5인분 수 1인분 수 구분 필요

        // deliveryMenus.forEach((item, idx) => {
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
              // this.isMixedGrain[`product${idx + 1}`].amount += 1

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
              // this.isMixedGrain[`product${idx + 1}`].amount += 1.5
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
              // this.isMixedGrain[`product${idx + 1}`].amount += 2
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
                // 수요일 3팩, 메뉴동일인 경우
                if (['수요일3팩', '메뉴동일'].includes(igd.name)) {
                  if (excludeIngredientNames.includes(igd.name)) {
                    igd.count += 1
                  }
                } else if (
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
                } else {
                  if (excludeIngredientNames.includes(igd.name)) {
                    igd.count += 1
                  }
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
        productInfos[menu].ingredients = [
          ...productInfos[menu].ingredients.filter(
            (igd) => igd.Product_Ingredients.type === 'main'
          ),
          ...productInfos[menu].ingredients.filter(
            (igd) => igd.Product_Ingredients.type !== 'main'
          ),
        ]
        // topping Ingredient preparation
        this.$set(
          this.toppingPreparation,
          menu,
          productInfos[menu].ingredients.filter(
            (igd) => igd.Product_Ingredients.type === 'topping'
          )
        )
        // main Ingredient preparation
        this.$set(
          this.mainPreparation,
          menu,
          productInfos[menu].ingredients.filter((igd) =>
            ['main', 'carbo'].includes(igd.Product_Ingredients.type)
          )
        )
      })

      this.menuPreparation = productInfos

      const filteredIngredientPreparation = {}

      Object.keys(productInfos).forEach((menu) => {
        productInfos[menu].ingredients.forEach((igd) => {
          if (!filteredIngredientPreparation[igd.name]) {
            filteredIngredientPreparation[igd.name] = {
              name: igd.name,
              amount:
                (igd.count ? igd.count : 0) * igd.Product_Ingredients.amount,
              unit: igd.Product_Ingredients.unit,
            }
          } else {
            filteredIngredientPreparation[igd.name].duplicate = true
            filteredIngredientPreparation[igd.name].amount +=
              (igd.count ? igd.count : 0) * igd.Product_Ingredients.amount
          }
        })
      })

      // isMixedGrain 객체 보면서 현미밥 수량 체크
      let totalRice = 0
      Object.keys(productInfos).forEach((menu, idx) => {
        const product = productInfos[menu]

        const isMixed = this.isMixedGrain[`product${idx + 1}`]
        let grain = 0
        if (!product.mixed) {
          return
        }

        if (isMixed) {
          console.log('현비밥 + 고구마')
          grain += product.mixed.count
          grain += product.mixed.count15 * 1.5
          grain += product.mixed.count20 * 2
        }
        grain += product.rice.count
        grain += product.rice.count15 * 1.5
        grain += product.rice.count20 * 2

        totalRice += grain
      })

      // 현미밥 수량만큼 고구마 제외
      filteredIngredientPreparation.고구마.amount -= totalRice * 0.1
      filteredIngredientPreparation.현미밥 = {
        amount: totalRice * 0.1,
        name: '현미밥',
        unit: 'kg',
      }

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
      const excelData = [...this.searchList, ...this.specialProgramList].map(
        (item) => {
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
            배송시작일: item.Order.startDate,
            배송종료일: item.endDate,
            상품정보:
              item.productName == '라인 어니스트' ? 8 : item.productInfo,
            상품명: item.productName,
            '탄수화물 구성': item.Order.CarboType.name,
            단백질량: item.Order.carboAmount,
            탄수화물량: item.Order.proteinAmount,
            제외메뉴: item.excludeProduct,
            제외토핑: item.excludeTopping,
            배송: item.Order.deliveryType.trim(),
            우편번호: item.Order.postNumber,
          }
        }
      )

      const early = []
      const day = []
      const direct = []
      excelData.map((item) => {
        if (item.배송 === '새벽배송') {
          early.push(item)
        } else if (item.배송 === '직접배송') {
          direct.push(item)
        } else {
          day.push(item)
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

          const menu = []
          menu.push({
            name: item.name,
            속성: '',
            수량: item.count,
          })
          menu.push({
            name: '단백질150g',
            속성: '',
            수량: item.count15,
          })
          menu.push({
            name: '단백질200g',
            속성: '',
            수량: item.count20,
          })

          item.ingredients.forEach((igd) => {
            menu.push({
              name: igd.name,
              속성: custom.toppingTypeFormatter(igd.Product_Ingredients.type),
              수량:
                igd.count * igd.Product_Ingredients.amount +
                igd.Product_Ingredients.unit,
            })
          })

          return menu
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
      /// 제조 물량 표
      const excelDataEarly = utils.json_to_sheet(early)
      const excelDataDay = utils.json_to_sheet(day)
      const excelDataDirect = utils.json_to_sheet(direct)

      const ingredientPreparation = utils.json_to_sheet(
        ingredientPreparationExcel
      )
      const requestTableEarlyExcel = utils.json_to_sheet(requestTableEarlyJson)
      const requestTableDayExcel = utils.json_to_sheet(requestTableDayJson)
      const requestTableDirectExcel = utils.json_to_sheet(
        requestTableDirectJson
      )

      const workBook = utils.book_new()
      utils.book_append_sheet(workBook, excelDataEarly, '제조 물량(새벽)')
      utils.book_append_sheet(workBook, excelDataDay, '제조 물량(일반)')
      utils.book_append_sheet(workBook, excelDataDirect, '제조 물량(직접)')

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
      const specialprogramNames = this.specialPrograms.map((item) => item.name)
      console.log(specialprogramNames)
      res
        // .filter((item) => item !== false)
        .map((result) => {
          const { item, excludeProduct, lastReserve } = result
          item.endDate = lastReserve
          if (specialprogramNames.includes(item.Order.buyer)) {
            const curProgram = this.specialPrograms.find(
              (menu) => menu.name == item.Order.buyer
            )

            this.specialProgramList.push({
              ...item,
              productInfo: curProgram.id,
              productName: curProgram.name,
              excludeProduct: [],
              excludeTopping: [],
              excludeMenus: [],
            })

            return
          }

          let isSpecial = false
          let specialList = []
          let carboType = []
          let availableMenu = []

          // 탄수화물 종류
          if (item.Order.carboType !== 1) {
            isSpecial = true
            if (item.Order.carboType === 2) {
              carboType.push('고구마 + 현미밥')
            } else if (item.Order.carboType === 3) {
              carboType.push('현미밥만')
            }
          }

          // 단백질 양
          if (item.Order.proteinAmount !== 1) {
            isSpecial = true
            if (item.Order.proteinAmount === 1.5) {
              specialList.push('단150')
            } else if (item.Order.proteinAmount === 2) {
              specialList.push('단200')
            }
          }
          // 탄수화물 양
          if (item.Order.carboAmount !== 1) {
            isSpecial = true
            if (item.Order.carboAmount === 1.5) {
              specialList.push('탄150')
            } else if (item.Order.carboAmount === 2) {
              specialList.push('탄200')
            }
          }
          //  토핑 제외 리스트

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
                  break
                default:
                  if (this.markedToppings.includes(item.name)) {
                    if (item.name.includes('ㅇ')) {
                      return toppings.push(item.name)
                    } else {
                      return toppings.push(item.name + 'x')
                    }
                  }
                  return
              }
            })
            if (toppings.length) {
              isSpecial = true
            }
            specialList.push(toppings.join(' '))
          }

          if (excludeProduct.length) {
            const excludeProductIds = excludeProduct.map((item) => item.id)
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
            excludeMenus: excludeProduct,
          })
        })

      // 기존 상품들
      makeList.forEach((item) => {
        if (item.Order.deliveryType === '새벽배송') {
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
      this.specialProgramList = this.specialProgramList.sort(
        (a, b) => a.productInfo - b.productInfo
      )

      this.loading = false
    },
  },
}
</script>
<style lang="scss" scoped>
table {
  min-width: 1444px;
  &.delivery-type-count {
    min-width: auto;
  }
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
