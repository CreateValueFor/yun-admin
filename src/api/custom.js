const serviceNameFormatter = (service) => {
    switch (service) {
        case '윤식단 단품 샐러드 도시락 정기배송 다이어트 건강 식단 새벽배송 배달 저염식 단백질':
            return '윤식단 맛보기 박스'
        case '윤식단 샐러드 정기배송 1일 1식 20일 프로그램 도시락 배달 건강 식단 새벽 구독 저염':
            return '1일 1식 20일 프로그램'
        case '[윤식단] 샐러드 정기 배달 - 1일1식10일 프로그램(2주)':
            return '1일 1식 14일 프로그램'
        case '윤식단 샐러드 정기배송 1일 1식 20일 프로그램 도시락 배달 건강 식단 새벽 구독 저염':
            return '1일 1식 20일 프로그램'
        case '윤식단 샐러드 정기배송 1일 2식 20일 프로그램 도시락 배달 다이어트 식단 새벽 구독':
            return "1일 2식 20일 프로그램"
        case '윤식단 샐러드 정기배송 1일 2식 10일 프로그램 도시락 배달 다이어트 식단 새벽 구독':
            return '1일 2식 10일 프로그램'
        case '윤식단 샐러드 정기배송 1일 3식 10일 프로그램 도시락 배달 다이어트 식단 새벽 구독':
            return '1일 3식 10일 프로그램'
        case '윤식단 샐러드 정기배송 1일 3식 20일 프로그램 도시락 배달 다이어트 식단 새벽 구독':
            return '1일 3식 20일 프로그램'
        default:
            return '상품이 아님'
    }
}
// 단백질 추가 있을 때만 실행
const proteinValueFormatter = (service) => {
    switch (service) {
        case '현미밥 변경(고구마+현미밥 번갈아 제공)':
            return '고구마+현미밥'
        case '현미밥 변경(현미밥만 제공)':
            return '현미밥만 제공'
        default:
            return '고구마'
    }
}

// 
const carbohydrateValueFormatter = () => {
    switch (service) {
        case '현미밥 변경(고구마+현미밥 번갈아 제공)':
            return '고구마+현미밥'
        case '현미밥 변경(현미밥만 제공)':
            return '현미밥만 제공'
        default:
            return '고구마'
    }
}
function JSDateToExcelDate(inDate) {

    var returnDateTime = 25569.0 + ((inDate.getTime() - (inDate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
    return returnDateTime.toString().substr(0, 5);

}

function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}
export default {
    serviceNameFormatter,
    JSDateToExcelDate,
    ExcelDateToJSDate
}
