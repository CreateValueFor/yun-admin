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
      <div class="h-full grow w-full bg-white rounded-lg">
        <div v-if="!uploadedOrder.length">
          <p>주문업로드 리스트 엑셀파일을 드래그하여 옮겨주세요</p>
          <input
            @change="onChange"
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
        <div v-else>
          <div class="mb-5">
            <button
              class="bg-green-500	rounded-lg px-6 py-2 text-white font-semibold shadow"
              @click="downloadExcel"
            >
              파일 다운로드
            </button>
          </div>
          <table>
            <thead>
              <th>구매자명</th>
              <th>수취인명</th>
              <th>구매자연락처</th>
              <th>배송지</th>
              <th>기본주소</th>
              <th>상세주소</th>
              <th>공동현관 비밀번호</th>
              <th>배송메세지</th>
              <th>상품명</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>단백질량</th>
              <th>탄수화물량</th>
              <th>탄수화물 구성</th>
              <th>제외토핑</th>
              <th>제외메뉴</th>
              <th>배송</th>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in uploadedOrder" :key="idx">
                <td>{{ item.구매자명 }}</td>
                <td>{{ item.수취인명 }}</td>
                <td>{{ item.구매자연락처 }}</td>
                <td>{{ item.배송지 }}</td>
                <td>{{ item['(기본주소)'] }}</td>
                <td>{{ item['(상세주소)'] }}</td>
                <td>{{ item['공동현관 비밀번호'] }}</td>
                <td>{{ item['배송메세지'] }}</td>
                <td>{{ item.상품명 }}</td>
                <td>{{ item.시작일 }}</td>
                <td>{{ item.종료일 }}</td>
                <td>{{ item.단백질량 }}</td>
                <td>{{ item.탄수화물량 }}</td>
                <td>{{ item['탄수화물 구성'] }}</td>
                <td>{{ item.제외토핑 }}</td>
                <td>{{ item.제외메뉴 }}</td>
                <td>{{ item.배송 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TapMenu from '../components/order/TapMenu.vue'
import { read, utils, writeFile } from 'xlsx'
import custom from '@/api/custom.js'

export default {
  name: 'DashboardHome',
  components: { TapMenu },
  data() {
    return {
      uploadedOrder: [],
    }
  },
  methods: {
    downloadExcel() {
      const excelData = utils.json_to_sheet(this.uploadedOrder)
      const workBook = utils.book_new()
      utils.book_append_sheet(workBook, excelData, '주문 취합')
      writeFile(workBook, 'test.xlsx')
    },
    onChange(event) {
      const file = event.target.files[0]
      // const fileName = file.name
      // declare FileReader, temp result
      const reader = new FileReader()
      let tmpResult = []

      reader.onload = () => {
        let data = reader.result
        let workbook = read(data, { type: 'binary' })

        workbook.SheetNames.forEach((sheetName) => {
          // workbook.Sheets[sheetName].A1.w = 'test1'
          // workbook.Sheets[sheetName].B1.w = 'test2'
          // workbook.Sheets[sheetName].C1.w = 'test3'
          // workbook.Sheets[sheetName].D1.w = 'test4'

          const roa = utils.sheet_to_json(workbook.Sheets[sheetName])
          tmpResult = roa
        })
        // console.log(tmpResult)
        // console.log(this.groupOrder(tmpResult))
        this.uploadedOrder = this.processRaw(this.groupOrder(tmpResult))
        console.log(this.processRaw(this.groupOrder(tmpResult)))
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
      // let init_buyer = jsonData[0].구매자명
      // let init_receiver = jsonData[0].수취인명
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
        // if (item.구매자명 !== init_buyer || init_receiver !== item.수취인명) {
        //   init_buyer = item.구매자명
        //   init_receiver = item.수취인명
        //   totalOrder.push(order)
        //   order = []
        // }
        order.push(item)
      })
      totalOrder.push(order)
      return totalOrder
    },
    processRaw(groupedRaw) {
      let initOrder = {}
      let totalOrder = []

      groupedRaw.forEach((order) => {
        initOrder.구매자명 = order[0].구매자명
        initOrder.수취인명 = order[0].수취인명
        initOrder.구매자연락처 = order[0]['구매자연락처']
        initOrder.배송지 = order[0]['(기본주소)'] + order[0]['(상세주소)']
        initOrder['(기본주소)'] = order[0]['(기본주소)']
        initOrder['(상세주소)'] = order[0]['(상세주소)']
        // ! need to change
        initOrder['공동현관 비밀번호'] = '없음'
        initOrder['배송메세지'] = order[0]['배송메세지']
        initOrder.시작일 = '설정'
        initOrder.종료일 = '설정'
        initOrder.단백질량 = 1
        initOrder.탄수화물량 = 1
        initOrder['탄수화물 구성'] = '고구마'
        initOrder.제외토핑 = '없음'
        initOrder.제외메뉴 = '없음'
        order.forEach((item) => {
          if (item.옵션정보.includes('단백질')) {
            initOrder.단백질량 = 1.5
          }
          if (item.옵션정보.includes('현미밥')) {
            const carboType = item.옵션정보.split(':')[1]
            if (carboType !== undefined) {
              initOrder['탄수화물 구성'] = custom.carbohydrateValueFormatter(
                item.옵션정보.split(':')[1].trim()
              )
            }
          }
          if (item.옵션정보.includes('탄수화물')) {
            initOrder.탄수화물량 = 1.5
          }
          if (item.옵션정보.includes('공동현관')) {
            let options = item.옵션정보.split(' / ')
            let password = ''
            let allergy = ''
            let deliveryType = ''

            if (options.length !== 3) {
              console.log(item)
              const passwordRaw =
                item.옵션정보.indexOf(
                  "공동현관 출입비밀번호 (없을 시 '없음'작성):"
                ) + 1

              const allergyAndEtc = item.옵션정보.indexOf(
                "/ 알러지 및 기타요청 (없을 시 '없음'작성):"
              )

              const deliveryRaw = item.옵션정보.indexOf('/ 프로그램: ')
              password = item.옵션정보.substring(
                passwordRaw + 26,
                allergyAndEtc
              )
              allergy = item.옵션정보.substring(allergyAndEtc + 27, deliveryRaw)

              deliveryType = item.옵션정보.substring(
                deliveryRaw + 8,
                item.옵션정보.length
              )
            } else {
              password = options[0].split(':')[1]
              allergy = options[1].split(':')[1]
              deliveryType = options[2].split(':')[1]
            }

            initOrder['공동현관 비밀번호'] = password
            initOrder.제외메뉴 = allergy.trim()

            initOrder.배송 = deliveryType.includes('일반') ? '일반' : '새벽'
          }
          if (item.옵션정보.includes('토핑')) {
            initOrder.제외토핑 = item.옵션정보
              .split('토핑')[1]
              .replace('제외', '')
              .trim()
          }
          initOrder.상품명 = custom.serviceNameFormatter(item.상품명)
          if (custom.serviceNameFormatter(item.상품명.includes('새벽'))) {
            initOrder.배송 = '새벽'
          }
          // 공통 정보
        })
        totalOrder.push(initOrder)

        initOrder = {}
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
  td {
    font-size: 12px;
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    padding: 5px 8px;
  }
}
</style>
