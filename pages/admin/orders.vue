<template>
  <div>
    <div class="d-flex justify-content-between align-items-start">
      <h2 class="font-xl mb-13">所有訂單</h2>
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="deleteAllOrders"
      >
        刪除所有訂單
      </button>
    </div>
    <table v-if="orders.length > 0" class="table">
      <thead>
        <tr>
          <th scope="col">下單時間</th>
          <th scope="col">編號</th>
          <th scope="col">買家姓名</th>
          <th scope="col">付款狀態</th>
          <th scope="col">總額</th>
          <th scope="col">修改或查看</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ formatDate(order.create_at) }}</td>
          <td>{{ order.id }}</td>
          <td>{{ order.user.name }}</td>
          <td>{{ order.is_paid ? '已付款' : '未付款' }}</td>
          <td>${{ order.total }}</td>
          <td>
            <a href="#" @click.prevent="editOrder(order)"
              ><span class="material-icons"> edit </span></a
            >
          </td>
          <td>
            <a href="#" @click.prevent="deleteOrder(order.id)"
              ><span class="material-icons"> clear </span></a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :total-pages="ordersPagination" />
    <p>{{ alertSentence }}</p>
  </div>
</template>

<script>
import {
  apiAdminGetOrders,
  apiAdminDeleteOrder,
  apiAdminDeleteAllOrders,
} from '@/api/index'
import Pagination from '@/components/common/Pagination.vue'
import moment from 'moment'

export default {
  components: {
    Pagination,
  },
  layout: 'empty',
  data() {
    return {
      loader: {},
      orders: [],
      ordersPagination: 1,
      currentPage: 1,
      alertSentence: '',
    }
  },
  watch: {
    orders() {
      if (this.orders.length === 0) {
        this.alertSentence = '目前沒有訂單'
      }
    },
    currentPage() {
      this.getOrders()
    },
  },
  created() {
    this.$nuxt.$on('clickPageNum', (n) => {
      this.currentPage = n
    })
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    async getOrders() {
      const token = this.$cookies.get('flashTicketingAuth').token
      try {
        if (Object.keys(this.loader).length === 0) {
          this.loader = this.$loading.show()
        }
        const getOrdersRes = await apiAdminGetOrders(token, this.currentPage)
        this.orders = getOrdersRes.data.orders
        this.ordersPagination = getOrdersRes.data.pagination.total_pages
      } catch (error) {
        this.$showError('載入節目活動資料失敗')
      } finally {
        this.loader.hide()
        this.loader = {}
      }
    },
    formatDate(timestamp) {
      return moment.unix(timestamp).format('DD-MM-YYYY')
    },
    editOrder(order) {
      this.$store.dispatch('adminEditOrder', order)
      this.$router.push(`/admin/order/${order.id}`)
    },
    async deleteOrder(id) {
      try {
        const confirmDelete = await this.$showConfirm('是否確定刪除此訂單？')
        if (!confirmDelete) return
        const token = this.$cookies.get('flashTicketingAuth').token
        this.loader = this.$loading.show()
        const deleteOrderRes = await apiAdminDeleteOrder(token, id)
        if (!deleteOrderRes.data.success) {
          throw deleteOrderRes.data.message
        }
        this.$showSuccess('已成功刪除此訂單')
        // Refresh all orders table
        this.getOrders()
      } catch (error) {
        this.$showError(error)
        this.loader.hide()
      }
    },
    async deleteAllOrders() {
      if (this.orders.length === 0) {
        this.$showError('目前沒有訂單')
        return
      }
      try {
        const confirmDelete = await this.$showConfirm('是否確定刪除全部訂單？')
        if (!confirmDelete) return
        const token = this.$cookies.get('flashTicketingAuth').token
        this.loader = this.$loading.show()
        const deleteAllOrdersRes = await apiAdminDeleteAllOrders(token)
        if (!deleteAllOrdersRes.data.success) {
          throw deleteAllOrdersRes.data.message
        }
        this.$showSuccess('已成功刪除全部訂單')
        // Refresh all orders table
        this.getOrders()
      } catch (error) {
        this.$showError(error)
        this.loader.hide()
      }
    },
  },
}
</script>
