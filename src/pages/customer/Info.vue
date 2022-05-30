<template>
  <div class="p-5">
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
    <divider title="식단 주문정보" />
    <div class="program">
      <div class="program-container text-center">
        <h2 class="program-title">나의 식단 프로그램</h2>
        <div class="program-contents mt-5">{{ program }}</div>
        <hr style="width:200px; margin: 0 auto; margin-top:28px;" />
      </div>
    </div>
    <div
      class="carbo-protein-type program-container flex flex-col align-items:center;"
    >
      <div>
        <select-with-label
          title="탄수화물 구성"
          img="carbo"
          name="carboType"
          @onChange="onChangeCarboType"
          :value="carboAndProteinInfo.carboType"
          :options="carboType"
        />

        <!-- label="단순 무게 (그램/g) 기준입니다." -->
        <input-with-label
          title="탄수화물 양"
          img="carbo"
          name="carboAmount"
          :value="carboAndProteinInfo.carboAmount * 100 + 'g'"
          :disabled="true"
        />
        <!-- label="단순 무게 (그램/g) 기준입니다." -->
        <input-with-label
          title="단백질 양"
          name="proteinAmount"
          :value="carboAndProteinInfo.proteinAmount * 100 + 'g'"
          img="protein"
          :disabled="true"
        />
      </div>
    </div>
    <hr style="width: 100%; margin: 50px 0px;" />
    <div class="allergy-container program-container flex flex-col w-full">
      <button class="input-button ml-auto" @click="showIngredients = true">
        메뉴별 구성 식재료 보기
      </button>
      <InfoSelect
        title="알러지 및 식재료 제외"
        :options="ingredients"
        type="식재료"
        name="ingredient"
        label="해당 식재료를 포함하는 메뉴가 전체 제외됩니다."
        :userName="userName"
        :selectedList="excludedIngredients"
        @add="onAdd"
        @remove="onRemove"
      />

      <hr class="w-full" />
      <InfoSelect
        title="메뉴 제외"
        :options="products"
        type="메뉴"
        name="menu"
        label="제외 된 메뉴를 뺀 식단 구성으로
자율적 / 가능한 순차적으로
식단이 랜덤 제공됩니다."
        :userName="userName"
        :selectedList="excludeMenus"
        @add="onAdd"
        @remove="onRemove"
      />
    </div>
    <hr class="w-full" />
    <button class="btn" @click="onSave">저장하기</button>
    <ingredient-modal
      :show="showIngredients"
      @close="showIngredients = false"
    />
  </div>
</template>
<script>
import Guide from '@/components/customer/Guide'
import Divider from '@/components/customer/Divider.vue'

import InfoSelect from '../../components/customer/InfoSelect.vue'

import InputWithLabel from '../../components/customer/InputWithLabel.vue'
import customer from '../../api/customer'
import SelectWithLabel from '../../components/customer/SelectWithLabel.vue'
import IngredientModal from '../../components/customer/IngredientModal.vue'

// import Divider from '../../components/customer/Divider.vue'
export default {
  components: {
    Guide,
    Divider,
    InfoSelect,

    InputWithLabel,
    SelectWithLabel,
    IngredientModal,
  },

  async mounted() {
    // 고객 정보 불러오기
    const {
      data: { carboAmount, proteinAmount, CarboType },
    } = await customer.getCustomerInfo()

    this.carboAndProteinInfo = {
      carboAmount,
      proteinAmount,
      carboType: CarboType.name,
    }
    const [ingredients, products] = await customer.getCompose()
    this.ingredients = ingredients
    this.products = products

    const { excludeIngredients, excludeProducts } = await customer.getExcludes()
    console.log(excludeIngredients, excludeProducts)
    this.excludedIngredients = excludeIngredients
    this.excludeMenus = excludeProducts
  },
  data() {
    return {
      program: '1일 1식 20일 프로그램',
      ingredients: [],
      products: [],
      userName: '윤식단',
      excludedIngredients: ['당근'],
      excludeMenus: [],
      carboType: ['고구마', '고구마 + 현미밥', '현미밥'],
      carboAndProteinInfo: {
        carboType: '',
        carboAmount: 0,
        proteinAmount: 0,
      },
      images: {
        carbo: require('@/assets/customer/carbo.svg'),
      },
      showIngredients: false,
    }
  },
  methods: {
    onChangeCarboType(e) {
      const { name, value } = e
      this.$set(this.carboAndProteinInfo, name, value)
    },
    onAdd(e) {
      const { name, value } = e
      if (name === 'menu') {
        if (this.excludeMenus.includes(value)) {
          return
        }
        this.excludeMenus.push(value)
      } else {
        if (this.excludedIngredients.includes(value)) {
          return
        }
        this.excludedIngredients.push(value)
      }
    },
    onRemove(e) {
      const { name, value } = e
      if (name === 'menu') {
        this.excludeMenus = this.excludeMenus.filter((item) => item !== value)
      } else {
        this.excludedIngredients = this.excludedIngredients.filter(
          (item) => item !== value
        )
      }
    },
    async onSave() {
      await customer.patchCarboType(this.carboAndProteinInfo.carboType)
      await customer.putExcludes({
        excludeIngredients: this.excludedIngredients,
        excludeProducts: this.excludeMenus,
      })
      window.alert('정상적으로 저장되었습니다.')
    },
  },
}
</script>
<style lang="scss">
.program {
  margin: 50px auto;
  width: 80%;
}
.program-container {
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #000000;
  margin: 10px auto;

  align-items: center;
  .program-title {
    font-size: 12px;
    font-weight: 600;
  }
  .program-contents {
    font-weight: 300;
    font-size: 12px;
  }
  .program-label {
    color: #fff;
    display: inline;
    padding: 3px 5px;
    border-radius: 5px;
    font-size: 10px;
    line-height: 10px;
    &.early {
      background: #002a5b;
    }
    &.day {
      background: #26331e;
    }
  }
}
.btn {
  margin-top: 20px;
  width: 100px;
  float: right;
  height: 30px;
  background: #26331e;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 50px;
}
.carbo-protein-type {
  .program-title-container {
    width: 110px;
  }
  & > div > div > div {
    display: flex;
  }
  & > div > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  img {
    width: 35px;
    object-fit: none;
  }
  h2 {
    font-size: 10px;
    display: flex;
    align-items: center;
    width: 76px;
    margin-bottom: 0px;
  }
}
.yun-label {
  margin-left: 1rem;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 0.3rem;
  line-height: 10px;

  color: #b3b3b3;
}
.allergy-container {
  .input-button {
    padding: 5px 10px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 1.5rem;
    background: #e6e6e6;
    border: 1px solid #fff;
    color: #555555;
  }
}
.submit-button {
}
</style>
