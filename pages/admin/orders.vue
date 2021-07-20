<template>
  <div>
    <h2 class="font-xl mb-13">所有訂單</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">下單時間</th>
          <th scope="col">編號</th>
          <th scope="col">付款狀態</th>
          <!-- <th scope="col">購買票卷</th> -->
          <th scope="col">總額</th>
          <th scope="col">修改或查看</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ formatDate(order.create_at) }}</td>
          <td>{{ order.id }}</td>
          <td>{{ order.is_paid ? '已付款' : '未付款' }}</td>
          <!-- <td>{{ order.products }}</td> -->
          <td>${{ order.total }}</td>
          <!-- <td>{{ order.user }}</td> -->
          <td>
            <span class="material-icons"> edit </span>
          </td>
          <td>
            <a href="#"><span class="material-icons"> clear </span></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { apiAdminGetOrders } from '@/api/index'
import moment from 'moment'

export default {
  layout: 'empty',
  data() {
    return {
      orders: [],
      pageNum: 1,
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    async getOrders() {
      const token = this.$cookies.get('flashTicketingAuth').token
      try {
        const getOrdersRes = await apiAdminGetOrders(token, this.pageNum)
        this.orders = getOrdersRes.data.orders
      } catch (error) {
        this.$showError('載入節目活動資料失敗')
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    formatDate(timestamp) {
      return moment.unix(timestamp).format('DD-MM-YYYY')
    },
  },
}
</script>

<style></style>
