<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              제외 메뉴
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer" class="flex justify-end">
              <button
                @click="$emit('close')"
                class="bg-red-500	rounded-lg px-6 py-2 text-white mr-5"
              >
                cancel
              </button>
              <button
                @click="submitClicked"
                class="bg-green-500 rounded-lg px-6 py-2 text-white"
              >
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'order-modal',
  props: {
    order: {
      type: Object,
    },
  },
  data() {
    return {
      products: [],
      ingredients: [],
      excludeProduct: [],
      excludeIngredient: [],
      memo: '',
    }
  },
  async mounted() {},
  methods: {
    checkItem(idx) {
      console.log(idx)
      this.$set(this.products[idx], 'checked', !this.products[idx].checked)
    },
    submitClicked() {
      this.$emit('submit', {
        excludeProducts: this.excludeProduct,
        excludeIngredients: this.excludeIngredient,
        excludeProductName: this.excludeProduct.map(
          (item) => this.products.filter((prd) => prd.id === item)[0].name
        ),
        excludeIngredientName: this.excludeIngredient.map(
          (item) => this.ingredients.filter((prd) => prd.id === item)[0].name
        ),
        memo: this.memo,
      })
    },
    excludeProductAction(productId) {
      if (!this.excludeProduct.includes(productId)) {
        this.excludeProduct.push(productId)
      } else {
        this.excludeProduct = this.excludeProduct.filter(
          (item) => item !== productId
        )
      }
    },
    excludeIngredientAction(ingredientId) {
      if (!this.excludeIngredient.includes(ingredientId)) {
        this.excludeIngredient.push(ingredientId)
      } else {
        this.excludeIngredient = this.excludeIngredient.filter(
          (item) => item !== ingredientId
        )
      }
    },
  },
}
</script>
<style lang="scss" scoped>
tr.checked {
  background: #fca5a5;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  /* float: right; */
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
