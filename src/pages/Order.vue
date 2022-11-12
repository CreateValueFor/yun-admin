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

    <div class="flex flex-1 flex-wrap -mx-3 ">
      <div class="h-full grow w-full  rounded-lg">
        <div v-if="!uploadedOrder.length">
          <p>주문업로드 리스트 엑셀파일을 드래그하여 옮겨주세요</p>
          <input
            @change="onChange"
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
        <div v-else>
          <div class="mb-5 flex justify-between items-center">
            <div>
              주문 총 개수 - {{ orderCount.total }} 에러 -
              {{ orderCount.error }}
            </div>

            <div>
              <button
                class="bg-white	rounded-lg px-6 py-2 font-semibold shadow mr-3"
                @click="downloadExcel"
              >
                파일 다운로드
              </button>
              <button
                class="bg-green-500	rounded-lg px-6 py-2 text-white font-semibold shadow"
                @click="uploadOrder"
              >
                파일 업로드
              </button>
            </div>
          </div>
          <div style="overflow: scroll;">
            <table>
              <thead>
                <th>주문번호</th>
                <th>구매자명</th>
                <th>수취인명</th>
                <th>구매자연락처</th>
                <th>수취인연락처</th>
                <th>배송지</th>
                <th>기본주소</th>
                <th>상세주소</th>
                <th>우편번호</th>
                <th>공동현관 비밀번호</th>
                <th>배송메세지</th>
                <th>상품명</th>
                <th>단백질량</th>
                <th>탄수화물량</th>
                <th>탄수화물 구성</th>
                <th>제외 식재료</th>
                <th>제외 메뉴</th>
                <!-- <th>요청사항</th> -->
                <th>배송</th>
                <!-- <th>메모</th> -->
                <th></th>
              </thead>
              <tbody>
                <tr
                  v-for="(item, idx) in uploadedOrder"
                  :key="idx"
                  :class="{ needCheck: item.확인필요 }"
                >
                  <td>{{ item.serial }}</td>
                  <td>{{ item.buyer }}</td>
                  <td>{{ item.receiver }}</td>
                  <td>{{ item.buyerPhone }}</td>
                  <td>{{ item.receiverPhone }}</td>
                  <td>{{ item.배송지 }}</td>
                  <td>{{ item.address1 }}</td>
                  <td>{{ item.address2 }}</td>
                  <td>{{ item.postNumber }}</td>
                  <td>{{ item.entrancePassword }}</td>
                  <td>{{ item.deliveryMessage }}</td>
                  <td>{{ item.상품명 }}</td>
                  <!-- <td>{{ item.시작일 }}</td>
                  <td>{{ item.종료일 }}</td> -->
                  <td>{{ item.proteinAmount }}</td>
                  <td>{{ item.carboAmount }}</td>
                  <td>{{ item.carboType }}</td>
                  <!-- <td>{{ item.excludeIngredient.join(' , ') || '없음' }}</td> -->
                  <!-- <td>{{ item.요청사항 }}</td> -->
                  <td>
                    <div>
                      <button
                        class="bg-green-500 shadow rounded-lg px-6 py-2 text-white"
                        @click="checkOrder(item, idx)"
                      >
                        제외
                      </button>
                      <!-- </div> -->
                      <!-- <div v-else> -->
                      <!-- {{ item.제외식재료 }} -->
                      {{
                        (item.excludeIngredientName &&
                          item.excludeIngredientName.join(' , ')) ||
                          item.excludeIngredients.join(' , ') ||
                          '없음'
                      }}
                    </div>
                  </td>
                  <td>
                    {{
                      (item.excludeProductName &&
                        item.excludeProductName.join(' , ')) ||
                        (item.excludeProducts &&
                          item.excludeProducts.join(' , ')) ||
                        '없음'
                    }}
                  </td>
                  <td>{{ item.deliveryType }}</td>
                  <!-- <td>{{ item.메모 }}</td> -->
                  <td>
                    <button
                      class="bg-green-500 shadow rounded-lg px-6 py-2 text-white"
                      @click="openUpdateModal(item, idx)"
                    >
                      수정
                    </button>
                    <button
                      @click="deleteOrder(idx)"
                      class="bg-red-500 shadow rounded-lg px-6 py-2 text-white"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <update-single-order-dialog
      @submit="updateOrder"
      @close="showUpdateModal = false"
      :show="showUpdateModal"
      :modalData="modalData"
    />
    <modal
      v-if="showModal"
      @close="showModal = false"
      @submit="changeOrder"
      :order="selectedOrder"
    >
      <div slot="header">
        <h3>{{ selectedOrder.구매자명 }} - 제외식재료 설정</h3>
        <p>요청사항 : {{ selectedOrder.deliveryMessage }}</p>
      </div>
    </modal>
    <order-upload-modal
      :show="showUploadModal"
      :orderCount="orderCount"
      :uploadOption="uploadOption"
      :loading="loading"
      @submit="postOrder"
      @close="showUploadModal = false"
    />
  </div>
</template>

<script>
import TapMenu from '../components/order/TapMenu.vue'
import Modal from '../components/order/Modal.vue'
import { read, utils, writeFile } from 'xlsx'
import custom from '@/api/custom.js'
import api from '@/api/api.js'
import OrderUploadModal from '../components/order/OrderUploadModal.vue'
import UpdateSingleOrderDialog from '../components/order/UpdateSingleOrderDialog.vue'

export default {
  name: 'DashboardHome',
  components: { TapMenu, Modal, OrderUploadModal, UpdateSingleOrderDialog },
  data() {
    return {
      uploadedOrder: [],
      showModal: false,
      selectedOrder: {},
      selectedIndex: -1,
      showUploadModal: false,
      showUpdateModal: false,
      loading: false,
      modalData: {},
      uploadOption: {
        earlyType: '',
        directType: '',
        early: '',
        direct: '',
        day: '',
      },
      early: [],

      day: [],

      direct: [],
      ingredients: [],
    }
  },
  computed: {
    orderCount: function() {
      if (!this.uploadedOrder) {
        return
      }
      const total = this.uploadedOrder.length
      const error = this.uploadedOrder.filter(
        (item) => item.상품명 === '상품이 아님'
      ).length

      return {
        total,
        early: this.early.length,
        direct: this.direct.length,
        day: this.day.length,
        error,
      }
    },
  },
  async mounted() {
    this.ingredients = await api.getAllIngredients()
  },
  methods: {
    openUpdateModal(item, idx) {
      console.log(item, idx)
      this.selectedIndex = idx
      this.modalData = item
      this.modalData = {
        ...this.modalData,
        excludeToppingObject: {
          carrot: item.excludeIngredientName.includes('당근'),
          bean: item.excludeIngredientName.includes('콩'),
        },
      }
      console.log(this.modalData)
      this.showUpdateModal = true
    },
    deleteOrder(idx) {
      this.uploadedOrder.splice(idx, 1)
    },
    updateOrder() {
      const carrot = this.ingredients.find((item) => item.name === '당근')
      const bean = this.ingredients.find((item) => item.name === '콩')
      if (this.modalData.excludeToppingObject.carrot) {
        if (!this.modalData.excludeIngredients.includes(carrot.id)) {
          this.modalData.excludeIngredients.push(carrot.id)
          this.modalData.excludeIngredientName.push(carrot.name)
        }
      } else {
        console.log('당근 토핑 제외 안함')
        this.modalData.excludeIngredients = this.modalData.excludeIngredients.filter(
          (item) => item !== carrot.id
        )
        this.modalData.excludeIngredientName = this.modalData.excludeIngredientName.filter(
          (item) => item !== carrot.name
        )
      }

      if (this.modalData.excludeToppingObject.bean) {
        if (!this.modalData.excludeIngredients.includes(bean.id)) {
          this.modalData.excludeIngredients.push(bean.id)
          this.modalData.excludeIngredientName.push(bean.name)
        }
      } else {
        this.modalData.excludeIngredients = this.modalData.excludeIngredients.filter(
          (item) => item !== bean.id
        )
        this.modalData.excludeIngredientName = this.modalData.excludeIngredientName.filter(
          (item) => item !== bean.name
        )
      }

      console.log(this.modalData)

      this.$set(this.uploadedOrder, this.selectedIndex, this.modalData)
      this.showUpdateModal = false
    },

    async postOrder() {
      if (
        this.uploadOption.day !== '' &&
        ![2, 4].includes(new Date(this.uploadOption.day).getDay())
      ) {
        this.uploadOption.day = ''
        return window.alert(
          '일반배송 10일 프로그램의 시작일이 화요일 또는 목요일이 아닙니다.'
        )
      }
      if (this.uploadOption.directType === 'mw') {
        if (
          this.uploadOption.direct !== '' &&
          ![1, 3].includes(new Date(this.uploadOption.direct).getDay())
        ) {
          this.uploadOption.direct = ''
          return window.alert(
            '직접배송 10일 프로그램의 시작일이 월요일 또는 수요일이 아닙니다.'
          )
        }
        // if (
        //   this.uploadOption.early20 !== '' &&
        //   ![1, 3].includes(new Date(this.uploadOption.early20).getDay())
        // ) {
        //   this.uploadOption.early20 = ''
        //   return this.uploadOption.alert(
        //     '직접배송 20일 프로그램의 시작일이 월요일 또는 수요일이 아닙니다.'
        //   )
        // }
      } else if (this.uploadOption.directType === 'tt') {
        if (
          this.uploadOption.direct !== '' &&
          ![2, 4].includes(new Date(this.uploadOption.direct).getDay())
        ) {
          this.uploadOption.direct = ''
          return window.alert(
            '직접배송 10일 프로그램의 시작일이 화요일 또는 목요일이 아닙니다.'
          )
        }
        // if (
        //   this.uploadOption.early20 !== '' &&
        //   ![2, 4].includes(new Date(this.uploadOption.early20).getDay())
        // ) {
        //   this.uploadOption.early20 = ''
        //   return window.alert(
        //     '직접배송 20일 프로그램의 시작일이 화요일 또는 목요일이 아닙니다.'
        //   )
        // }
      }

      if (this.uploadOption.earlyType === 'mw') {
        if (
          this.uploadOption.early !== '' &&
          ![1, 3].includes(new Date(this.uploadOption.early).getDay())
        ) {
          this.uploadOption.early = ''
          return window.alert(
            '새벽배송 10일 프로그램의 시작일이 월요일 또는 수요일이 아닙니다.'
          )
        }
      } else if (this.uploadOption.earlyType === 'tt') {
        if (
          this.uploadOption.early !== '' &&
          ![2, 4].includes(new Date(this.uploadOption.early).getDay())
        ) {
          this.uploadOption.early = ''
          return window.alert(
            '새벽배송 10일 프로그램의 시작일이 화요일 또는 목요일이 아닙니다.'
          )
        }
      }
      this.loading = true
      try {
        await api.postOrderList({
          day: {
            data: this.day,
            startDate: this.uploadOption.day,
          },
          early: {
            data: this.early,
            startDate: this.uploadOption.early,
          },

          direct: {
            data: this.direct,
            startDate: this.uploadOption.direct,
          },
        })
        window.alert('정상적으로 업로드 되었습니다.')
        this.loading = false
        this.showUploadModal = false
        return
      } catch (error) {
        this.loading = false
        this.showUploadModal = false
        return window.alert('에러가 발생하였습니다. ')
      }
    },

    uploadOrder() {
      this.showUploadModal = true
    },

    changeOrder(e) {
      console.log(e)
      this.$set(
        this.uploadedOrder[this.selectedIndex],
        'excludeProducts',
        e.excludeProducts
      )
      this.$set(
        this.uploadedOrder[this.selectedIndex],
        'excludeProductName',
        e.excludeProductName
      )
      this.$set(
        this.uploadedOrder[this.selectedIndex],
        'excludeIngredients',
        e.excludeIngredients
      )
      this.$set(
        this.uploadedOrder[this.selectedIndex],
        'excludeIngredientName',
        e.excludeIngredientName
      )
      this.$set(this.uploadedOrder[this.selectedIndex], '메모', e.memo)
      this.$set(this.uploadedOrder[this.selectedIndex], '확인필요', false)
      this.showModal = false
    },
    classifyOrder(orderList) {
      this.early = []
      this.day = []
      this.direct = []

      orderList.map((item) => {
        if (!item.상품명) {
          return
        }
        const deliveryType = item.deliveryType.trim()
        console.log(deliveryType)
        if (deliveryType === '새벽배송') {
          this.early.push(item)
        } else if (deliveryType === '직접배송') {
          this.direct.push(item)
        } else {
          this.day.push(item)
        }
      })
    },
    checkOrder(item, idx) {
      // if (item.확인필요) {
      this.selectedOrder = item
      this.selectedIndex = idx
      this.showModal = true
      // }
    },
    downloadExcel() {
      const excelDataDay = utils.json_to_sheet(
        this.uploadedOrder
          .filter((item) => item.deliveryType === '일반배송')
          .map((item) => ({
            상품명: item.상품명,
            주문번호: item.serial,
            구매자: item.buyer,
            수취인: item.receiver,
            구매자연락처: item.buyerPhone,
            수취인연락처: item.receiverPhone,
            배송지: item.배송지,
            기본주소: item.address1,
            상세주소: item.address2,
            배송메세지: item.deliveryMessage,
            탄수화물구성: item.carboType,
            탄수화물양: item.carboAmount,
            단백질양: item.proteinAmount,
            제외식재료: item.excludeIngredients.join(' , '),
            공동현관비밀번호: item.entrancePassword,
            배송타입: item.deliveryType,
          }))
      )
      const excelDataEarly = utils.json_to_sheet(
        this.uploadedOrder
          .filter(
            (item) =>
              item.deliveryType === '새벽배송' ||
              item.deliveryType === '직접배송'
          )
          .map((item) => ({
            상품명: item.상품명,
            주문번호: item.serial,
            구매자: item.buyer,
            수취인: item.receiver,
            구매자연락처: item.buyerPhone,
            수취인연락처: item.receiverPhone,
            기본주소: item.address1,
            상세주소: item.address2,
            배송메세지: item.deliveryMessage,
            탄수화물구성: item.carboType,
            탄수화물양: item.carboAmount,
            단백질양: item.proteinAmount,
            제외식재료: item.excludeIngredients.join(' , '),
            공동현관비밀번호: item.entrancePassword,
            배송타입: item.deliveryType,
          }))
      )
      const workBook = utils.book_new()
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const date = now.getDate()
      utils.book_append_sheet(workBook, excelDataDay, '주문 취합(일반)')
      utils.book_append_sheet(workBook, excelDataEarly, '주문 취합(새벽)')
      writeFile(workBook, `${year}-${month}-${date}주문 취합.xlsx`)
    },
    onChange(event) {
      const file = event.target.files[0]
      // const fileName = file.name
      // declare FileReader, temp result
      const reader = new FileReader()
      // let tmpResult = []

      reader.onload = () => {
        let data = reader.result
        let workbook = read(data, { type: 'binary' })

        // workbook.SheetNames.forEach((sheetName) => {
        //   const roa = utils.sheet_to_json(workbook.Sheets[sheetName])
        //   // tmpResult = roa
        // })
        const tmpData = utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        )

        this.uploadedOrder = this.processRaw(this.groupOrder(tmpData))
        this.classifyOrder(this.uploadedOrder)
      }
      reader.readAsBinaryString(file)
    },
    ExcelDateToJSDate(serial) {
      var utc_days = Math.floor(serial - 25569)
      var utc_value = utc_days * 86400
      var date_info = new Date(utc_value * 1000)

      var fractional_day = serial - Math.floor(serial) + 0.0000001

      var total_seconds = Math.floor(86400 * fractional_day)

      var seconds = total_seconds % 60

      total_seconds -= seconds

      var hours = Math.floor(total_seconds / (60 * 60))
      var minutes = Math.floor(total_seconds / 60) % 60

      return new Date(
        date_info.getFullYear(),
        date_info.getMonth(),
        date_info.getDate(),
        hours,
        minutes,
        seconds
      )
    },
    groupOrder(jsonData) {
      // 옵션 추가 시 상품주문번호는 달라지지만 주문번호는 달라지지 않기 때문에 주문번호로 같은 주문인 것 파악
      if (!jsonData[0].주문번호) {
        console.log(jsonData[0])
      }
      let init_buySerial = jsonData[0].주문번호

      let order = []
      let totalOrder = []
      jsonData.forEach((item) => {
        // 같은 주문끼리 모으기
        if (item.주문번호 !== init_buySerial) {
          init_buySerial = item.주문번호
          totalOrder.push(order)
          order = []
        }
        order.push(item)
      })
      totalOrder.push(order)
      return totalOrder
    },
    processRaw(groupedRaw) {
      let initOrder = {}
      let totalOrder = []

      groupedRaw.forEach((order) => {
        // order 0 인 이유는 모든 주문을 배열에 바인딩 하였기 때문
        // 공통된 데이터는 전부 미리 빼두기
        initOrder.serial = order[0].주문번호
        initOrder.buyer = order[0].구매자명
        initOrder.receiver = order[0].수취인명
        initOrder.buyerPhone =
          order[0]['(구매자연락처)'] ||
          order[0].구매자연락처.replaceAll('-', '') // '-'가 없는 순수 숫자만 받기
        initOrder.receiverPhone =
          order[0]['(수취인연락처1)'] ||
          order[0].수취인연락처1.replaceAll('-', '') // '-' 가 없는 순수 숫자만 받음
        initOrder.naverId = order[0].구매자ID
        initOrder.excludeProducts = []
        initOrder.excludeProductName = []
        initOrder.postNumber = order[0].우편번호

        // 주소 받기
        // initOrder.배송지 = order[0].배송지
        // if (initOrder.배송지.split(') ').length === 2) {

        // } else {//   initOrder.address1 = initOrder.배송지.split(') ')[0] + ')'
        //   initOrder.address2 = initOrder.배송지.split(') ')[1]
        //   initOrder.address1 = initOrder.배송지
        //     .split(' ')
        //     .splice(0, initOrder.배송지.split(' ').length - 1)
        //     .join(' ')
        //   initOrder.address2 = initOrder.배송지.split(' ')[
        //     initOrder.배송지.split(' ').length - 1
        //   ]
        // }
        initOrder.address1 = order[0].기본배송지
        initOrder.address2 = order[0].상세배송지
        initOrder.배송지 = `${initOrder.address1} ${initOrder.address2}`

        initOrder['우편번호'] = order[0]['(우편번호)']
        // 배송 메세지
        initOrder.deliveryMessage = order[0]['배송메세지'] || '없음'

        // 옵션값 초기 세팅
        initOrder.carboType = '고구마'
        initOrder.carboAmount = 1
        initOrder.proteinAmount = 1
        initOrder.excludeIngredients = []
        initOrder.excludeIngredientName = []

        if (
          order.some((item) =>
            custom.serviceNameFormatter(item.상품명).includes('라인 어니스트')
          )
        ) {
          // 라인 어니스트인 경우
          let totalPack = 0
          order.forEach((item) => {
            if (
              item['상품종류'] === '조합형옵션상품' ||
              item['상품종류'] === '옵션상품'
            ) {
              // 주 메뉴
              const packageName = custom.serviceNameFormatter(item.상품명)
              initOrder.상품명 = packageName
              const entrancePasswordIdx = item.옵션정보.indexOf(
                " (없을 시 '없음'작성):"
              )
              const deliveryTypeIdx = item.옵션정보.indexOf('/ 배송방법')
              console.log(entrancePasswordIdx)
              const password = item.옵션정보.substring(
                entrancePasswordIdx + 15,
                deliveryTypeIdx
              )

              initOrder.entrancePassword = password

              const deliveryType = item.옵션정보.substring(
                deliveryTypeIdx + 10,
                deliveryTypeIdx + 15
              )
              initOrder.deliveryType = deliveryType

              totalPack += item.수량 * 4
            } else {
              //옵션 상품
              // if (item.상품명.includes('3')) {
              //   totalPack += item.수량 * 3
              // }
            }
          })
          initOrder.상품명 = `${initOrder.상품명} ${totalPack}팩`
          initOrder.count = totalPack
        } else {
          // 일반 주문인 경우
          order.forEach((item) => {
            // 주문 행의 상품종류가 '조합형 옵션 상품'인 경우엔 본 주문에 대한 데이터
            // 우선 본 주문에 대한 데이터 필터링 진행
            if (
              item['상품종류'] === '조합형옵션상품' ||
              item['상품종류'] === '옵션상품'
            ) {
              // 본 주문
              // 라인 어니스트 제품 따로 처리하기
              // TODO

              // 주문 상품 명
              initOrder.상품명 = custom.serviceNameFormatter(item.상품명)

              const entrancePasswordIdx =
                item.옵션정보.indexOf(
                  "공동현관 출입비밀번호 (없을 시 '없음'작성):"
                ) + 1

              const deliveryTypeIdx = item.옵션정보.indexOf('/ 배송방법 선택: ')
              // const alterTypeIdx = item.옵션정보.indexOf('/ ')

              const password = item.옵션정보.substring(
                entrancePasswordIdx + 26,
                deliveryTypeIdx
              )
              initOrder.entrancePassword = password

              const deliveryType = item.옵션정보.substring(
                deliveryTypeIdx + 11,
                deliveryTypeIdx + 15
              )
              initOrder.deliveryType = deliveryType
            } else {
              // 옵션 값
              const optionType = item['옵션정보'].indexOf('메뉴 변경 요청')

              if (optionType !== -1) {
                // 메뉴 변경 요청 사항
                if (
                  item['옵션정보'].includes('제외') ||
                  item['옵션정보'].includes('기타')
                ) {
                  // 제외 식재료 처리
                  const excludeWordIdx = item['옵션정보'].indexOf('제외')
                  if (excludeWordIdx === -1) {
                    // 기타인 경우
                    initOrder.확인필요 = true
                  } else {
                    const ingredient = item['옵션정보']
                      .substring(optionType + 9, excludeWordIdx)
                      .trim()
                    const xigd = this.ingredients.find(
                      (igd) => igd.name === ingredient
                    )
                    if (xigd) {
                      initOrder.excludeIngredients.push(xigd.id)
                      initOrder.excludeIngredientName.push(xigd.name)
                    } else {
                      console.log('문제가 발생', xigd, ingredient)
                    }
                  }
                } else {
                  // 탄수화물 처리
                  initOrder.carboType = item['옵션정보'].split(':')[1].trim()
                  if (initOrder.carboType === '현미밥만') {
                    initOrder.carboType = '현미밥'
                  }
                }
              } else {
                if (item['옵션정보'].includes('단백질')) {
                  // 단백질 구성
                  if (item['옵션정보'].includes('50g')) {
                    initOrder.proteinAmount = 1.5
                  }
                  if (item['옵션정보'].includes('100g')) {
                    initOrder.proteinAmount = 2
                  }
                } else {
                  // 탄수화물 구성
                  if (item['옵션정보'].includes('50g')) {
                    initOrder.carboAmount = 1.5
                  }
                  if (item['옵션정보'].includes('100g')) {
                    initOrder.carboAmount = 2
                  }
                }
              }
            }
          })
        }

        totalOrder.push(initOrder) // 파싱한 주문 저장
        initOrder = {} // 주문 초기화
      })
      return totalOrder
    },
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
