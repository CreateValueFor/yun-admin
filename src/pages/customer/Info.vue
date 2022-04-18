<template>
  <div>
    <guide title="나의 메뉴 구성 관리하기" content="식단 주문정보">
      <slot>
        <div class="detail">
          <img
            style="margin: 0 auto; width: 33%; max-width: 100px;"
            src="@/assets/customer/ingredient.svg"
            alt="ingredient"
          />
          <h2
            style="text-align:center;font-weight: 600;
font-size: 1rem;
line-height: 1.5rem;
margin-top: 10px;
margin-bottom: 30px;
"
          >
            식단 한팩 구성
          </h2>

          본 페이지는 나의 식단 기본 구성을 관리하는 섹션입니다.<br />하단
          내용을 통해 나의 식단 기본 구성 확인 및 변경이 가능합니다.<br /><br />변경된
          식단 구성 정보는 2일 후 반영됩니다.<br />변경을 원하시는 구성을 식단
          수령일 최소 2일 전, 오후 5시 이전으로 변경해주세요.<br /><br />탄수화물
          구성 변경이 가능합니다.<br />탄수화물 및 단백질 양 변경은 카카오채널
          ‘윤식단'을 통해 문의주세요.<br /><br />
          알러지 및 식재료 제외가 가능합니다.이 경우 해당 식재료가 들어가는 메뉴
          구성이 전체 제외됩니다.<br />하단 메뉴별 구성 식재료를
          참고해주세요.<br /><br />메뉴 제외가 가능합니다.수령을 원치 않으시는
          메뉴를 제외해주세요.<br />단, 제외하는 메뉴가 많아질수록 식단 구성
          순환의 다양성이 떨어집니다.<br /><br />기본 토핑 제외가 가능합니다.이
          경우 식단 하단의 기본토핑만 제외되며 메뉴는 제공됩니다.<br />단,
          기본토핑 제외 시 다른 토핑으로 대체되거나 추가되는 부분은 없습니다.
        </div>
      </slot>
    </guide>
  </div>
</template>
<script>
import Guide from '@/components/customer/Guide'
export default {
  components: { Guide },
}
</script>
<style lang="scss"></style>
