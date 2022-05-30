<template>
  <div class="modal-bg" v-if="show">
    <div class="modal-content px-5 py-12 relative">
      <button @click="closeBtn" class="close-btn absolute">x</button>
      <table class="w-full ">
        <th width="20%">메뉴</th>
        <th width="80%">식재료</th>
        <tr class="menu text-center">
          <td>닭가슴살 샐러드</td>
          <td>
            <div>닭가슴살</div>
            <div>고구마</div>
            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>스테이크 샐러드</td>
          <td>
            <div>닭가슴살 스테이크</div>
            <div>삶은 계란</div>
            <div>고구마</div>
            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>유부닭 샐러드</td>
          <td>
            <div>닭가슴살</div>
            <div>유부</div>
            <div>계란</div>
            <div>현미밥</div>
            <div>양배추</div>
            <div>당근</div>
            <div>고구마</div>
            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>유부두부 샐러드</td>
          <td>
            <div>두부</div>
            <div>유부</div>
            <div>단무지</div>
            <div>고구마</div>
            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>콩비 샐러드</td>
          <td>
            <div>콩고기</div>
            <div>간장</div>
            <div>올리고당</div>
            <div>참기름</div>
            <div>굴소스</div>
            <div>고구마</div>
            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>훈제오리 샐러드</td>
          <td>
            <div>훈제오리</div>
            <div>고구마</div>
            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>에그코타 샐러드</td>
          <td>
            <div>에그 샐러드</div>
            <div>삶은 계란</div>
            <div>호밀빵</div>
            <div>리코타치즈</div>
            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>감또 샐러드</td>
          <td>
            <div>감자</div>
            <div>오이</div>
            <div>당근</div>
            <div>사과</div>
            <div>스위트콘</div>
            <div>또띠아</div>
            <div>으깬 계란</div>
            <div>삶은 계란</div>
            <div>마요네즈</div>
            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>샌닭 샐러드</td>
          <td>
            <div>닭가슴살</div>
            <div>호밀 식빵</div>
            <div>크랜베리</div>
            <div>마요네즈</div>
            <div>머스타드</div>
            <div>토마토</div>
            <div>스위트콘</div>
            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>두들 샐러드</td>
          <td>
            <div>두부면</div>
            <div>파프리카</div>
            <div>새버섯</div>
            <div>간장</div>
            <div>올리고당</div>
            <div>후추</div>
            <div>고구마</div>

            <div>토핑당근</div>

            <div>사과</div>
            <div>아몬드</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>소고기 샐러드</td>
          <td>
            <div>소고기</div>

            <div>고구마</div>

            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>두부참치 샐러드</td>
          <td>
            <div>두부</div>
            <div>참치</div>
            <div>삶은 계란</div>
            <div>고구마</div>

            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>들깨닭 샐러드</td>
          <td>
            <div>닭가슴살</div>
            <div>양배추</div>
            <div>들깨가루</div>
            <div>단무지</div>
            <div>설탕</div>
            <div>마요네즈</div>
            <div>간장</div>
            <div>참기름</div>

            <div>고구마</div>

            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>키밥 샐러드</td>
          <td>
            <div>계란</div>
            <div>치즈</div>
            <div>단무지</div>
            <div>양배추</div>
            <div>마요네즈</div>

            <div>당근</div>
            <div>상추</div>
            <div>고구마</div>
            <div>사과</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>단오 샐러드</td>
          <td>
            <div>훈제오리</div>
            <div>계란</div>
            <div>단호박 무스</div>

            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>닭쏘 샐러드</td>
          <td>
            <div>닭가슴살 소세지</div>
            <div>삶은 계란</div>

            <div>고구마</div>

            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>꽃맛살 샐러드</td>
          <td>
            <div>꽃맛살</div>
            <div>으깬 계란</div>

            <div>오이</div>
            <div>당근</div>
            <div>사과</div>
            <div>고구마</div>

            <div>병아리콩</div>

            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>참또 샐러드</td>
          <td>
            <div>참치</div>
            <div>으깬 계란</div>

            <div>오이</div>
            <div>마요네즈</div>
            <div>또띠아</div>
            <div>단무지</div>
            <div>고구마</div>

            <div>토핑당근</div>
            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
        <tr class="menu text-center">
          <td>오우 샐러드</td>
          <td>
            <div>새우</div>
            <div>오징어</div>
            <div>양파</div>
            <div>버섯</div>
            <div>당근</div>
            <div>맛술</div>
            <div>후추</div>
            <div>간장</div>
            <div>굴소스</div>
            <div>올리고당</div>
            <div>피타빵</div>

            <div>병아리콩</div>
            <div>사과</div>
            <div>아몬드</div>
            <div>파슬리</div>
          </td>
        </tr>
      </table>

      <button @click="closeBtn" class="mt-3 float-right">닫기</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ingredientModal',
  props: {
    show: Boolean,
  },
  methods: {
    closeBtn() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scope>
.modal-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  max-width: 500px;
  width: calc(100% - 60px);
  max-height: 500px;
  background: #fff;
  border-radius: 5px;
  overflow-y: scroll;
  .close-btn {
    right: 1.5rem;
    font-size: 1.5rem;
    top: 0.5rem;
  }
  .menu {
    vertical-align: middle;
  }
  table {
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    th {
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
    }
    td {
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
    }
  }
}
</style>
