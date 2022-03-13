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
            <slot name="body">
              <table class="w-full">
                <thead>
                  <th>
                    제품명
                  </th>
                  <th>
                    메인 재료
                  </th>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, idx) in products"
                    :key="idx"
                    @click="checkItem(idx)"
                    :class="{ checked: item.checked }"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.mainIngredient }}</td>
                  </tr>
                </tbody>
              </table>
              <input
                type="text"
                name="serch"
                v-model="memo"
                placeholder="메모를 입력해주세요"
                class="mt-3 bg-white h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
              />
            </slot>
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
import custom from '../../api/custom'
export default {
  name: 'order-modal',
  props: {
    order: {
      type: Object,
    },
  },
  data() {
    return {
      products: [...custom.productList],
      memo: '',
    }
  },
  mounted() {
    if (this.order) {
      this.memo = this.order.memo
    }
    this.products = this.products.map((item) => ({ ...item, checked: false }))
  },
  methods: {
    checkItem(idx) {
      console.log(idx)
      this.$set(this.products[idx], 'checked', !this.products[idx].checked)
    },
    submitClicked() {
      const checked = this.products
        .filter((item) => item.checked)
        .map((item) => item.name)
      this.$emit('submit', { product: checked, memo: this.memo })
      console.log(checked)
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
