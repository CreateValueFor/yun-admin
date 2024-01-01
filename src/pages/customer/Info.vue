<template>
  <div class="p-5">
    <a
      href="https://www.notion.so/8a43dbefe2b544688a1bb4d3f41918af"
      class="input-button ml-auto"
      target="_blank"
      style="width : 115px"
    >
      윤식단 구독 지침서
    </a>
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
          1)메뉴 제외는 최대 6개까지 가 능합니다.<br />
          단, 제외 메뉴수가 많아질수록 메뉴 순환의 다양성이 떨어질 수
          있습니다.<br /><br />
          2)탄수화물 구성 변경이 가능합니다.<br />
          고구마만(기본)<br />
          고구마+현미밥 번갈아 제공<br />
          현미밥만<br />
          *단백질, 탄수화물 추가는 상담원을 통해 요청 부탁드립니다.<br /><br />
          3)토핑 병아리콩, 토핑 당근 제외가 가능합니다.<br />
          메뉴 속재료는 제외가 불가하며, 원치 않는 속재료가 포함된 메뉴는 [메뉴
          제외]를 부탁 드립니다.
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
      <InfoSelect
        title="알러지 및 식재료 제외"
        :options="ingredients"
        type="식재료"
        name="ingredient"
        label="해당 식재료를 포함하는 메뉴가 전체 제외됩니다.토핑재료만 제외가 가 능하며 메뉴 속재료는 제외 가 불 가 합니다. 원치
        않는 속재료가 포함된 메뉴는 [메뉴 제외]를 부탁드립니다."
        :userName="userName"
        :selectedList="excludedIngredients"
        @add="onAdd"
        @remove="onRemove"
      />

      <hr class="w-full" style="width: 100%; margin: 10px 0px 50px;" />
      <a
        href="https://diamond-pet-538.notion.site/2a159c842479488d909e18d9a0728bbd?pvs=4"
        class="input-button ml-auto"
        target="_blank"
      >
        메뉴별 구성 식재료 보기
      </a>
      <InfoSelect
        title="메뉴 제외"
        :options="products"
        type="메뉴"
        name="menu"
        label="제외 된 메뉴를 뺀 식단 구성으로 자율적 / 가능한 순차적으로 식단이 랜덤 제공됩니다."
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
      data: {
        carboAmount,
        proteinAmount,
        CarboType,
        Package: { name },
        receiver,
      },
    } = await customer.getCustomerInfo()

    this.userName = receiver
    this.program = name
    this.carboAndProteinInfo = {
      carboAmount,
      proteinAmount,
      carboType: CarboType.name,
    }
    const [ingredients, products] = await customer.getCompose()
    this.ingredients = ingredients
      .filter((item) => !this.exceptIngredient.includes(item))
      .filter((item) => item.includes('토핑당근') || item.includes('병아리콩'))
    console.log(this.ingredients)
    this.products = products.filter((item) => !item.includes('메뉴'))
    console.log(products)

    const { excludeIngredients, excludeProducts } = await customer.getExcludes()
    console.log(excludeIngredients, excludeProducts)
    this.excludedIngredients = excludeIngredients
    this.excludeMenus = excludeProducts
    console.log(excludeProducts)
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
      exceptIngredient: [
        '월3팩',
        '수6팩',
        '수요일5팩',
        '수요일3팩',
        '목3팩',
        '메뉴동일',
        '화요일3팩',
        '화요일5팩',
        '건크렌베리 (ㅇ)',
        '바나나칩 (ㅇ)',
        '견과류 추가 (ㅇ)',
        '콩 추가 (ㅇ)',
      ],
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
        if (this.excludeMenus.length >= 6) {
          return window.alert('제외메뉴 선택은 최대 6개 가능합니다.')
        }
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
.input-button {
  margin-left: 10px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.5rem;
  background: #e6e6e6;
  border: 1px solid #fff;
  color: #555555;
}
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
