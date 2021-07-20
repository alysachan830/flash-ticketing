<template>
  <div>
    <div class="d-flex justify-content-between align-items-start">
      <h2 class="font-xl mb-13">所有優惠劵</h2>
      <button class="btn btn-primary" @click="addCoupon">新增優惠券</button>
    </div>
    <table v-if="coupons.length > 0" class="table">
      <thead>
        <tr>
          <th scope="col">到期日</th>
          <th scope="col">編號</th>
          <th scope="col">標題</th>
          <th scope="col">啟用狀態</th>
          <th scope="col">折扣</th>
          <th scope="col">編輯</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{ dateFormat(coupon.due_date) }}</td>
          <td>{{ coupon.id }}</td>
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.is_enabled ? '已啟用' : '未啟用' }}</td>
          <!-- <td>{{ order.products }}</td> -->
          <td>{{ coupon.percent }}%</td>
          <!-- <td>{{ order.user }}</td> -->
          <td>
            <!-- <NuxtLink :to="`/admin/order/${order.id}`"
              ><span class="material-icons"> edit </span></NuxtLink
            > -->
            <a href="#" @click.prevent="editCoupon(coupon)"
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
    <p>{{ alertSentence }}</p>
  </div>
</template>

<script>
import { apiAdminGetCoupons } from '@/api/index'
import moment from 'moment'

export default {
  data() {
    return {
      pageNum: 1,
      coupons: [],
      alertSentence: '',
    }
  },
  watch: {
    orders() {
      if (this.coupons.length === 0) {
        this.alertSentence = '目前沒有優惠劵'
      }
    },
  },
  async mounted() {
    const token = this.$cookies.get('flashTicketingAuth').token
    try {
      const getCouponRes = await apiAdminGetCoupons(token, this.pageNum)
      this.coupons = getCouponRes.data.coupons
    } catch (error) {
      this.$showError('載入優惠劵資料失敗')
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  methods: {
    dateFormat(timestamp) {
      return moment.unix(timestamp).format('DD-MM-YYYY')
    },
    editCoupon(coupon) {
      this.$store.dispatch('adminEditCoupon', coupon)
      this.$router.push(`/admin/coupon/${coupon.id}`)
    },
    addCoupon() {
      this.$router.push('/admin/coupon/new')
    },
  },
}
</script>

<style></style>
