
// const xlsx = require('xlsx')
import xlsx from "xlsx"
import custom from "./custom.js"
// const custom = require('./custom')

// @files 엑셀 파일을 가져온다.

const getXlsx = (file) => {
    const excelFile = xlsx.readFile('dummy.xlsx')

}

// @breif 엑셀 파일의 첫번째 시트의 정보를 추출
const sheetName = excelFile.SheetNames[0] // @details 첫번째 시트 정보 추출
const firstSheet = excelFile.Sheets[sheetName] // @details 시트의 제목 추출

// @details 엑셀 파일의 첫번째 시트를 읽어온다.
const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: '' })


// 같은 주문끼리 모아주기 
export const groupOrder = (jsonData) => {
    let init_buyer = jsonData[0].구매자명
    let init_receiver = jsonData[0].수취인명
    let order = [];
    let totalOrder = [];
    jsonData.forEach((item) => {

        // 같은 주문끼리 모으기
        if (item.구매자명 !== init_buyer || init_receiver !== item.수취인명) {
            init_buyer = item.구매자명
            init_receiver = item.수취인명
            totalOrder.push(order);
            order = [];
        }
        order.push(item)
    })
    totalOrder.push(order)
    return totalOrder
}



// 출력된 주문서 => 주문서 변환
export const processRaw = (groupedRaw) => {
    let initOrder = {};
    let totalOrder = [];
    groupedRaw.forEach(order => {
        initOrder.구매자명 = order[0].구매자명
        initOrder.수취인명 = order[0].수취인명
        initOrder.구매자연락처 = order[0]["구매자연락처"]
        initOrder.배송지 = order[0]["(기본주소)"] + order[0]["(상세주소)"]
        initOrder['(기본주소)'] = order[0]["(기본주소)"]
        initOrder['(상세주소)'] = order[0]["(상세주소)"]
        // ! need to change
        initOrder['공동현관 비밀번호'] = "없음"
        initOrder['배송메세지'] = order[0]["배송메세지"]
        initOrder.시작일 = "설정"
        initOrder.종료일 = "설정"
        initOrder.단백질량 = 1
        initOrder.탄수화물량 = 1
        initOrder['탄수화물 구성'] = "고구마"
        initOrder.제외토핑 = "없음"
        order.forEach(item => {
            if (item.옵션정보.includes('단백질')) {
                initOrder.단백질량 = 1.5
            }
            if (item.옵션정보.includes('현미밥')) {
                initOrder['탄수화물 구성'] = item.옵션정보.split(":")[1]
            }
            if (item.옵션정보.includes('탄수화물')) {
                initOrder.탄수화물량 = 1.5
            }
            if (item.옵션정보.includes('공동현관')) {
                let options = item.옵션정보.split('/')
                const password = options[0].split(':')[1]
                const allergy = options[1].split(':')[1]
                const deliveryType = options[2].split(":")[1]
                initOrder['공동현관 비밀번호'] = password
                initOrder.제외메뉴 = allergy
                initOrder.배송 = deliveryType.includes("일반") ? "일반" : "새벽"
            }
            if (item.옵션정보.includes('토핑')) {
                // console.log(item.옵션정보)
                // console.log(item.옵션정보.split("토핑")[1].replace("제외", "").trim())
                initOrder.제외토핑 = item.옵션정보.split("토핑")[1].replace("제외", "").trim()
                // console.log(initOrder)
            }
            initOrder.상품명 = custom.serviceNameFormatter(item.상품명)
            // 공통 정보

        })
        totalOrder.push(initOrder)

        initOrder = {}
    })
    return totalOrder
}


// processRaw(groupedRaw)
// console.log(groupOrder(jsonData))
// groupOrder(jsonData)
