const productList = [
    {
        name: '닭가슴살',
        mainIngredient: '닭가슴살',
        checked: false
    },
    {
        name: '훈제오리',
        mainIngredient: '훈제오리',
        checked: false
    },
    {
        name: '소고기',
        mainIngredient: '소고기',
        checked: false
    },
    {
        name: '닭쏘',
        mainIngredient: '닭가슴살, 계란',
        checked: false
    },
    {
        name: '스테이크',
        mainIngredient: '닭가슴살, 계란',
        checked: false
    },
    {
        name: '에그코타',
        mainIngredient: '에그 샐러드, 계란, 치즈',
        checked: false
    },
    {
        name: '두부참치',
        mainIngredient: '두부, 참치, 계란',
        checked: false
    },
    {
        name: '꽃맛살',
        mainIngredient: '꽃맛살, 계란, 오이, 당근, 사과',
        checked: false
    },
    {
        name: '유부두부',
        mainIngredient: '두부, 유부, 단무지',
        checked: false
    },
    {
        name: '감또',
        mainIngredient: '감자, 오이, 당근, 사과, 스위트콘, 또띠아, 계란, 마요네즈',
        checked: false
    },
    {
        name: '들깨닭',
        mainIngredient: '닭가슴살, 양배추, 들깨가루, 단무지, 설탕, 마요네즈, 간장, 참기름',
        checked: false
    },
    {
        name: '참또',
        mainIngredient: '참치, 계란, 오이, 마요네즈, 또띠아, 단무지',
        checked: false
    },
    {
        name: '유부닭',
        mainIngredient: '닭가슴살, 유부, 계란, 현미밥, 양배추, 당근',
        checked: false
    },
    {
        name: '샌닭',
        mainIngredient: '닭가슴살, 계란, 식빵, 크랜베리, 마요네즈, 머스타드',
        checked: false
    },
    {
        name: '키밥',
        mainIngredient: '계란, 치즈, 단무지, 양배추, 마요네즈, 당근, 상추',
        checked: false
    },
]

const serviceNameFormatter = (service) => {
    switch (service) {
        case '[윤식단] 샐러드 정기 배달 - 1일1식 10일 프로그램 (2주)':
            return '1일 1식 10일 프로그램'
        case '[윤식단] 샐러드 정기 배달 - 1일1식10일 프로그램(2주)':
            return '1일 1식 10일 프로그램'
        case '윤식단 단품 샐러드 도시락 정기배송 다이어트 건강 식단 새벽배송 배달 저염식 단백질':
            return '윤식단 맛보기 박스'
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
        case '새벽 : 20일 : 1일 2식 20일 (40팩)':
            return '1일 2식 20일 프로그램(새벽)'
        case '새벽 : 20일 : 1일 1식 20일 (20팩)':
            return '1일 1식 20일 프로그램(새벽)'
        case '새벽 : 10일 : 1일 1식 10일 (10팩)':
            return '1일 1식 10일 프로그램(새벽)'
        case '새벽 : 20일 : 1일 4식 20일 (60팩)':
            return '1일 4식 20일 프로그램(새벽)'
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
const carbohydrateValueFormatter = (service) => {
    switch (service) {

        case '현미밥 변경(고구마+현미밥 번갈아 제공)':
            return '고구마+현미밥'
        case '현미밥 변경(현미밥만 제공)':
            return '현미밥'

        default:
            return service
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
    productList,
    serviceNameFormatter,
    JSDateToExcelDate,
    ExcelDateToJSDate,
    proteinValueFormatter,
    carbohydrateValueFormatter
}
