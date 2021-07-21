<template>
  <div>
    <h2 class="font-xl mb-13">編輯訂單</h2>
    <!-- Customer info -->
    <div class="mb-21">
      <h3 class="font-m mb-8">買家資料</h3>
      <div class="row">
        <div class="col-4">
          <div class="mb-3">
            <label for="inputData.user.email" class="form-label">電郵</label>
            <input
              id="inputData.user.email"
              v-model="inputData.user.email"
              type="email"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="mb-3">
            <label for="inputData.user.name" class="form-label">姓名</label>
            <input
              id="inputData.user.name"
              v-model="inputData.user.name"
              type="text"
              class="form-control"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="mb-3">
            <label for="inputData.user.tel" class="form-label">電話</label>
            <input
              id="inputData.user.tel"
              v-model="inputData.user.tel"
              type="text"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="mb-3">
            <label for="inputData.user.address" class="form-label">地址</label>
            <input
              id="inputData.user.address"
              v-model="inputData.user.address"
              type="text"
              class="form-control"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Is paid -->
    <div class="mb-21">
      <h3 class="font-m mb-8">付款狀態</h3>
      <div class="form-check">
        <input
          id="isPaid"
          v-model="inputData.is_paid"
          class="form-check-input"
          type="checkbox"
          value=""
        />
        <label class="form-check-label" for="isPaid"> 已付款 </label>
      </div>
    </div>
    <!-- Items -->
    <div class="mb-21">
      <h3 class="font-m mb-8">購物票卷</h3>
      <PurchaseCard
        v-for="item in purchases"
        :key="item.id"
        :cart-item="item"
      ></PurchaseCard>
      <div class="d-flex font-xl">
        <p class="me-16">總額</p>
        <p class="text-primary">${{ inputData.total }}</p>
      </div>
    </div>

    <!-- Comment -->
    <div class="mb-21">
      <label for="inputMessage" class="mb-3">留言</label>
      <textarea
        id="inputMessage"
        v-model="inputData.message"
        name="inputMessage"
        class="form-control"
        cols="30"
        rows="10"
      >
      </textarea>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" @click="saveEdit">儲存更改</button>
    </div>
  </div>
</template>

<script>
import { apiAdminEditOrder } from '@/api/index'
import PurchaseCard from '@/components/admin/order/PurchaseCard'

export default {
  components: {
    PurchaseCard,
  },
  data() {
    return {
      loader: {},
      order: {},
      inputData: {
        products: {},
        user: {},
        total: 0,
      },
    }
  },
  computed: {
    purchases() {
      return Object.keys(this.inputData.products).map(
        (key) => this.inputData.products[key]
      )
    },
  },
  created() {
    this.$nuxt.$on('updateQty', (info) => {
      const { eventId, ticketId, ticketTotal, inputQty } = info
      this.$nextTick().then(() => {
        this.inputData.products[eventId][ticketId] = inputQty
        this.inputData.total += ticketTotal
      })
    })
  },
  mounted() {
    this.order = this.$store.getters.adminEditingOrder
    this.inputData = JSON.parse(JSON.stringify(this.order))
  },
  methods: {
    async saveEdit() {
      try {
        const token = this.$cookies.get('flashTicketingAuth').token
        this.loader = this.$loading.show()
        const editOrderRes = await apiAdminEditOrder(token, this.order.id, {
          data: this.inputData,
        })
        if (!editOrderRes.data.success) {
          throw editOrderRes.data.message
        }
        this.$showSuccess('已儲存更改')
        // Back to all orders table
        window.setTimeout(() => {
          this.$router.push('/admin/orders')
        }, 2500)
      } catch (error) {
        this.$showError('修改訂單失敗')
      } finally {
        this.loader.hide()
      }
    },
  },
}
</script>

<style></style>
