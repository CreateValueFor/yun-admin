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
              <th>공동현관 비밀번호</th>
              <th>배송메세지</th>
              <th>상품명</th>
              <th>단백질량</th>
              <th>탄수화물량</th>
              <th>탄수화물 구성</th>
              <th>제외 식재료</th>
              <!-- <th>요청사항</th> -->
              <!-- <th>제외식재료</th> -->
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
                <td>{{ item.entrancePassword }}</td>
                <td>{{ item.deliveryMessage }}</td>
                <td>{{ item.상품명 }}</td>
                <!-- <td>{{ item.시작일 }}</td>
                <td>{{ item.종료일 }}</td> -->
                <td>{{ item.proteinAmount }}</td>
                <td>{{ item.carboAmount }}</td>
                <td>{{ item.carboType }}</td>
                <td>{{ item.excludeIngredient.join(' , ') || '없음' }}</td>
                <!-- <td>{{ item.요청사항 }}</td> -->
                <!-- <td>
                  <div v-if="item.확인필요">
                    <button
                      class="bg-green-500 shadow rounded-lg px-6 py-2 text-white"
                      @click="checkOrder(item, idx)"
                    >
                      등록
                    </button>
                  </div>
                  <div v-else>
                    {{ item.제외식재료 }}
                  </div>
                </td> -->
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
                    @click="postOrder"
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
    <modal
      v-if="showUpdateModal"
      @close="showUpdateModal = false"
      @submit="updateOrder"
    >
      <h3 slot="header">주문 수정</h3>
      <div slot="body">
        <div class="flex">
          <div class="w-1/3 px-3">
            구매자명
            <input
              v-model="modalData.buyer"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="buyer"
            />
          </div>
          <div class="w-1/3 px-3">
            수취인명
            <input
              v-model="modalData.receiver"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="receiver"
            />
          </div>
          <div class="w-1/3 px-3">
            수취인연락처
            <input
              v-model="modalData.receiverPhone"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="buyer"
            />
          </div>
          <div class="w-1/3 px-3">
            구매자연락처
            <input
              v-model="modalData.buyerPhone"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="buyer"
            />
          </div>
        </div>
        <div class="flex mt-3">
          <div class="w-1/2  px-3">
            기본주소
            <input
              v-model="modalData.address1"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="address1"
            />
          </div>
          <div class="w-1/2  px-3">
            상세주소
            <input
              v-model="modalData.address2"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="address2"
            />
          </div>
        </div>
        <div class="flex mt-3">
          <div class="w-1/2 px-3">
            공동현관 비밀번호
            <input
              v-model="modalData.entrancePassword"
              class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              type="text"
              id="entrancePassword"
            />
          </div>
          <div class="w-1/2 px-3">
            <div>상품명</div>
            <select
              v-model="modalData.package"
              class="mt-3 bg-white h-10 w-full  px-5 rounded-lg border text-sm focus:outline-none"
            >
              <option>1일 1식 10일 프로그램</option>
              <option>1일 2식 10일 프로그램</option>
              <option>1일 3식 10일 프로그램</option>
              <option>1일 1식 20일 프로그램</option>
              <option>1일 2식 20일 프로그램</option>
              <option>1일 3식 20일 프로그램</option>
              <option>1일 4식 20일 프로그램</option>
            </select>
          </div>
        </div>

        <div class="flex mt-3">
          <div class="w-1/2 px-3">
            제외토핑
            <div>
              <label for="excludeCarrotTopping">당근</label>
              <input
                v-model="modalData.excludeToppingObject.carrot"
                class=" mx-3 bg-white rounded-lg border text-sm focus:outline-none"
                type="checkbox"
                id="excludeCarrotTopping"
              />
              <label for="excludeBeanTopping">콩</label>
              <input
                v-model="modalData.excludeToppingObject.bean"
                class=" ml-3 bg-white rounded-lg border text-sm focus:outline-none"
                type="checkbox"
                id="excludeBeanTopping"
              />
            </div>
          </div>
          <div class="w-1/2 ">
            탄수화물구성
            <div>
              <label for="sweetPotato">고구마</label>
              <input
                v-model="modalData.carboType"
                value="고구마"
                class=" mx-1 bg-white rounded-lg border text-sm focus:outline-none"
                type="radio"
                id="sweetPotato"
              />
              <label for="mixed">고구마 + 현미밥</label>
              <input
                v-model="modalData.carboType"
                value="고구마 + 현미밥"
                class=" mx-1 bg-white rounded-lg border text-sm focus:outline-none"
                type="radio"
                id="mixed"
              />
              <label for="rice">현미밥</label>
              <input
                v-model="modalData.carboType"
                value="현미밥"
                class=" ml-1 bg-white rounded-lg border text-sm focus:outline-none"
                type="radio"
                id="rice"
              />
            </div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="w-1/2">
            단백질량
            <select
              v-model="modalData.proteinAmount"
              class="bg-white h-10 w-32  px-5 rounded-lg border text-sm focus:outline-none"
            >
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
            </select>
          </div>
          <div class="w-1/2">
            탄수화물량
            <select
              v-model="modalData.carboAmount"
              class="bg-white h-10 w-32  px-5 rounded-lg border text-sm focus:outline-none"
            >
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
      </div>
    </modal>
    <modal
      v-if="showModal"
      @close="showModal = false"
      @submit="changeOrder"
      :order="selectedOrder"
    >
      <div slot="header">
        <h3>{{ selectedOrder.구매자명 }} - 제외식재료 설정</h3>
        <p>요청사항 : {{ selectedOrder.요청사항 }}</p>
      </div>
    </modal>
    <modal v-if="showUploadModal">
      <h3 slot="header">주문 업로드 설정</h3>
      <div slot="body" class="flex">
        <div class="w-1/2 p-3 border-r">
          <h3>새벽배송</h3>
          <div class="mt-3">
            <input
              type="radio"
              v-model="uploadOption.earlyType"
              name="deliveryDate"
              value="mw"
              id="mw-date"
            />
            <label for="mw-date" class="mr-3">월/수</label>
            <input
              type="radio"
              v-model="uploadOption.earlyType"
              name="deliveryDate"
              value="tt"
              id="tt-date"
            />
            <label for="tt-date">화/목</label>
          </div>
          <div class="mt-3">10일 프로그램 - {{ orderCount.early10 }}개</div>
          <input
            v-model="uploadOption.early10"
            class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
            type="date"
            max="9999-12-31"
            id="program-10-early"
          />
          <div class="mt-3">20일 프로그램 - {{ orderCount.early20 }}개</div>
          <input
            v-model="uploadOption.early20"
            class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
            type="date"
            max="9999-12-31"
            id="program-20-early"
          />
        </div>
        <div class="w-1/2 p-3">
          <h3>일반배송(화, 목 배송)</h3>
          <div class="mt-3">10일 프로그램 - {{ orderCount.day10 }}개</div>
          <input
            v-model="uploadOption.day10"
            class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
            type="date"
            max="9999-12-31"
            id="program-10-day"
          />
          <div class="mt-3">20일 프로그램 - {{ orderCount.day20 }}개</div>
          <input
            v-model="uploadOption.day20"
            class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
            type="date"
            max="9999-12-31"
            id="program-20-day"
          />
        </div>
      </div>
      <div slot="footer" class="flex justify-end">
        <button
          class="bg-white shadow border rounded-lg px-6 py-2 mr-3"
          @click="showUploadModal = false"
        >
          취소
        </button>
        <button
          @click="postOrder"
          :disabled="loading"
          class="bg-green-500 shadow rounded-lg px-6 py-2 text-white"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          >
            <!-- ... -->
          </svg>
          <span v-else>
            업로드
          </span>
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import TapMenu from '../components/order/TapMenu.vue'
import Modal from '../components/order/Modal.vue'
import { read, utils, writeFile } from 'xlsx'
import custom from '@/api/custom.js'
import api from '@/api/api.js'

export default {
  name: 'DashboardHome',
  components: { TapMenu, Modal },
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
        early10: '',
        early20: '',
        day10: '',
        day20: '',
      },
      early10: [],
      early20: [],
      day10: [],
      day20: [],
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
      let early10 = 0
      let early20 = 0
      let day10 = 0
      let day20 = 0
      this.uploadedOrder.map((item) => {
        if (item.deliveryType === '새벽') {
          if (item.상품명 && item.상품명.includes('10일')) {
            early10 += 1
          } else {
            early20 += 1
          }
        } else {
          if (item.상품명 && item.상품명.includes('10일')) {
            day10 += 1
          } else {
            day20 += 1
          }
        }
      })

      return {
        total,
        early10,
        early20,
        day10,
        day20,
        error,
      }
    },
  },
  methods: {
    openUpdateModal(item, idx) {
      this.selectedIndex = idx
      this.modalData = custom.orderTranslater(item, 'korean')
      console.log(this.modalData)
      this.showUpdateModal = true
    },
    updateOrder() {
      const data = {
        ...this.uploadedOrder[this.selectedIndex],
        ...custom.orderTranslater(this.modalData, 'english'),
      }
      this.selectedIndex
      this.$set(this.uploadedOrder, this.selectedIndex, data)
      this.showUpdateModal = false
    },

    async postOrder() {
      if (
        this.uploadOption.day10 !== '' &&
        ![2, 4].includes(new Date(this.uploadOption.day10).getDay())
      ) {
        this.uploadOption.day10 = ''
        return window.alert(
          '일반배송 10일 프로그램의 시작일이 화요일 또는 목요일이 아닙니다.'
        )
      }

      if (
        this.uploadOption.day20 !== '' &&
        ![2, 4].includes(new Date(this.uploadOption.day20).getDay())
      ) {
        this.uploadOption.day20 = ''
        return window.alert(
          '일반배송 20일 프로그램의 시작일이 화요일 또는 목요일이 아닙니다.'
        )
      }

      if (this.uploadOption.earlyType === 'mw') {
        if (
          this.uploadOption.early10 !== '' &&
          ![1, 3].includes(new Date(this.uploadOption.early10).getDay())
        ) {
          this.uploadOption.early10 = ''
          return window.alert(
            '새벽배송 10일 프로그램의 시작일이 월요일 또는 수요일이 아닙니다.'
          )
        }
        if (
          this.uploadOption.early20 !== '' &&
          ![1, 3].includes(new Date(this.uploadOption.early20).getDay())
        ) {
          this.uploadOption.early20 = ''
          return this.uploadOption.alert(
            '새벽배송 20일 프로그램의 시작일이 월요일 또는 수요일이 아닙니다.'
          )
        }
      } else if (this.uploadOption.earlyType === 'tt') {
        if (
          this.uploadOption.early10 !== '' &&
          ![2, 4].includes(new Date(this.uploadOption.early10).getDay())
        ) {
          this.uploadOption.early10 = ''
          return window.alert(
            '새벽배송 10일 프로그램의 시작일이 화요일 또는 목요일이 아닙니다.'
          )
        }
        if (
          this.uploadOption.early20 !== '' &&
          ![2, 4].includes(new Date(this.uploadOption.early20).getDay())
        ) {
          this.uploadOption.early20 = ''
          return window.alert(
            '새벽배송 20일 프로그램의 시작일이 화요일 또는 목요일이 아닙니다.'
          )
        }
      }
      this.loading = true
      this.early10 = []
      this.early20 = []
      this.day20 = []
      this.day10 = []
      this.uploadedOrder.map((item) => {
        if (!item.상품명) {
          return
        }
        if (item.deliveryType === '새벽배송') {
          if (item.상품명.includes('10일')) {
            this.early10.push(item)
          } else {
            this.early20.push(item)
          }
        } else {
          if (item.상품명.includes('10일')) {
            this.day10.push(item)
          } else {
            this.day20.push(item)
          }
        }
      })
      // this.uploadedOrder.forEach((item) => {})
      // const res = await axios.post('http://3.35.9.130:3000/order', {
      try {
        await api.postOrderList({
          day10: {
            data: this.day10,
            startDate: this.uploadOption.day10,
          },
          day20: {
            data: this.day20,
            startDate: this.uploadOption.day20,
          },
          early10: {
            data: this.early10,
            startDate: this.uploadOption.early10,
          },
          early20: {
            data: this.early20,
            startDate: this.uploadOption.early20,
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
      console.log(this.uploadedOrder)
      // return
      // const isCheckedAll = this.uploadedOrder.filter((item) => item.확인필요)
      //   .length
      // if (isCheckedAll > 0) {
      //   window.alert(`${isCheckedAll}개가 확인되지 않음`)
      // }
      this.showUploadModal = true
    },

    changeOrder(e) {
      this.$set(
        this.uploadedOrder[this.selectedIndex],
        '제외식재료',
        e.product.join(',')
      )
      this.$set(this.uploadedOrder[this.selectedIndex], '메모', e.memo)
      this.$set(this.uploadedOrder[this.selectedIndex], '확인필요', false)
      this.showModal = false
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
        this.uploadedOrder.filter((item) => item.배송 === '일반')
      )
      const excelDataEarly = utils.json_to_sheet(
        this.uploadedOrder.filter((item) => item.배송 === '새벽')
      )
      const workBook = utils.book_new()
      utils.book_append_sheet(workBook, excelDataDay, '주문 취합(일반)')
      utils.book_append_sheet(workBook, excelDataEarly, '주문 취합(새벽)')
      writeFile(workBook, 'test.xlsx')
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
        console.log(this.processRaw(this.groupOrder(tmpData)))
        this.uploadedOrder = this.processRaw(this.groupOrder(tmpData))
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
        initOrder.buyerPhone = order[0]['(구매자연락처)'] // '-'가 없는 순수 숫자만 받기
        initOrder.receiverPhone = order[0]['(수취인연락처1)'] // '-' 가 없는 순수 숫자만 받음

        // 주소 받기
        initOrder.배송지 = order[0]['(기본주소)'] + order[0]['(상세주소)']
        initOrder.address1 = order[0]['(기본주소)']
        initOrder.address2 = order[0]['(상세주소)']
        initOrder['우편번호'] = order[0]['(우편번호)']
        // 배송 메세지
        initOrder.deliveryMessage = order[0]['배송메세지'] || '없음'

        // 옵션값 초기 세팅
        initOrder.carboType = '고구마'
        initOrder.carboAmount = 1
        initOrder.proteinAmount = 1
        initOrder.excludeIngredient = []

        order.forEach((item) => {
          // 주문 행의 상품종류가 '조합형 옵션 상품'인 경우엔 본 주문에 대한 데이터
          // 우선 본 주문에 대한 데이터 필터링 진행
          if (
            item['상품종류'] === '조합형옵션상품' ||
            item['상품종류'] === '옵션상품'
          ) {
            // 본 주문
            // 주문 상품 명
            initOrder.상품명 = custom.serviceNameFormatter(item.상품명)
            console.log(custom.serviceNameFormatter(item.상품명))

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
                const ingredient = item['옵션정보']
                  .substring(optionType + 9, excludeWordIdx)
                  .trim()
                if (ingredient === '기타') {
                  initOrder.확인필요 = true
                }
                initOrder.excludeIngredient.push(ingredient)
              } else {
                // 탄수화물 처리
                initOrder.carboType = item['옵션정보'].split(':')[1].trim()
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
