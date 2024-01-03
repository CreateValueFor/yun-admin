<template>
  <div id="home" class="flex-1 flex flex-col">
    <!-- breadcrumb -->
    <page-title />
    <!-- breadcrumb end -->
    <div class="flex w-1/2 mb-3">
      <p class="font-semibold w-32 text-lg mr-3">제품 추가</p>
      <button
        class="bg-green-500 w-48	rounded-lg px-6 py-2 text-white font-semibold shadow"
        @click="openAddModal"
      >
        프로그램 생성
      </button>
    </div>

    <program-list :searchList="programList" @edit="openEditModal" />
    <product-modal
      v-if="showModal"
      :modalData="selectProgram"
      :editMode="editMode"
      :show="showModal"
      @close="showModal = false"
      @submit="updateProgram"
    />
  </div>
</template>

<script>
// import Modal from '../components/order/Modal.vue'
// import custom from '@/api/custom.js'
import api from '@/api/api.js'
import ProgramList from '../components/addProduct/programList.vue'
import PageTitle from '../components/common/PageTitle.vue'
import ProductModal from '../components/addProduct/productModal.vue'

// import axios from 'axios'

export default {
  name: 'DashboardHome',
  components: {
    ProgramList,
    PageTitle,
    ProductModal,
    // Search,
  },
  data() {
    return {
      programList: [],
      showModal: false,
      selectProgram: null,
      editMode: false,
    }
  },
  async mounted() {
    this.programList = await api.getProgramList()
  },
  methods: {
    async updateProgram(data) {
      console.log(data)
      if (this.editMode) {
        await api.editProgram(this.selectProgram.id, data)
      } else {
        await api.addProgram(data)
      }
      this.showModal = false
      this.programList = await api.getProgramList()
    },
    openAddModal() {
      this.editMode = false
      this.showModal = true
    },
    openEditModal(index) {
      this.selectProgram = this.programList[index]
      this.editMode = true
      this.showModal = true
    },
  },
}
</script>
<style lang="scss" scoped>
table {
  min-width: 1444px;
  &.delivery-type-count {
    min-width: auto;
  }
  th {
    font-size: 12px;
  }
  tr {
    &.needCheck {
      background: #48bb78;
    }
  }
  td {
    font-size: 12px;
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    padding: 5px 8px;
  }
}
.summary-item {
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
</style>
