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
        <p>주문업로드 리스트 엑셀파일을 드래그하여 옮겨주세요</p>
        <input
          @change="onChange"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </div>
    </div>
    <div>
      <button
        class="bg-green-500	rounded-lg px-6 py-2 text-white font-semibold shadow"
      >
        업로드
      </button>
    </div>
  </div>
</template>

<script>
import TapMenu from '../components/order/TapMenu.vue'
import { read, utils } from 'xlsx'

export default {
  name: 'DashboardHome',
  components: { TapMenu },
  data() {
    return {}
  },
  methods: {
    onChange(event) {
      const file = event.target.files[0]
      // const fileName = file.name
      // declare FileReader, temp result
      const reader = new FileReader()
      let tmpResult = []

      reader.onload = (e) => {
        console.log(e)
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
        console.log(tmpResult)

        console.log(this.ExcelDateToJSDate(tmpResult[0].결제일))
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
  },
}
</script>
<style lang="scss" scoped></style>
