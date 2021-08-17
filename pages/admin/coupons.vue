<template>
  <div>
    <div class="d-flex justify-content-between align-items-start">
      <h2 class="font-xl mb-13">所有優惠劵</h2>
      <button type="button" class="btn btn-primary" @click="addCoupon">
        新增優惠券
      </button>
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
          <td>{{ coupon.percent }}%</td>
          <td>
            <a href="#" @click.prevent="editCoupon(coupon)"
              ><span class="material-icons"> edit </span></a
            >
          </td>
          <td>
            <a href="#" @click.prevent="deleteCoupon(coupon)"
              ><span class="material-icons"> clear </span></a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :total-pages="couponsPagination" />
    <p>{{ alertSentence }}</p>
  </div>
</template>

<script>
import { apiAdminGetCoupons, apiAdminDeleteCoupon } from '@/api/index'
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
      currentPage: 1,
      coupons: [],
      couponsPagination: 1,
      alertSentence: '',
    }
  },
  watch: {
    orders() {
      if (this.coupons.length === 0) {
        this.alertSentence = '目前沒有優惠劵'
      }
    },
    currentPage() {
      this.getCoupons()
    },
  },
  created() {
    this.$nuxt.$on('clickPageNum', (n) => {
      this.currentPage = n
    })
  },
  mounted() {
    this.getCoupons()
  },
  methods: {
    async getCoupons() {
      const token = this.$cookies.get('flashTicketingAuth').token
      try {
        if (Object.keys(this.loader).length === 0) {
          this.loader = this.$loading.show()
        }
        const getCouponRes = await apiAdminGetCoupons(token, this.currentPage)
        this.coupons = getCouponRes.data.coupons
        this.couponsPagination = getCouponRes.data.pagination.total_pages
      } catch (error) {
        this.$showError('載入優惠劵資料失敗')
      } finally {
        this.loader.hide()
        this.loader = {}
      }
    },
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
    async deleteCoupon(coupon) {
      try {
        const confirmDelete = await this.$showConfirm(
          `是否確定刪除${coupon.title}？`
        )
        if (!confirmDelete) return
        const token = this.$cookies.get('flashTicketingAuth').token
        this.loader = this.$loading.show()
        const deleteCouponRes = await apiAdminDeleteCoupon(token, coupon.id)
        if (!deleteCouponRes.data.success) {
          throw deleteCouponRes.data.message
        }
        this.$showSuccess('已成功刪除此優惠劵')
        // Refresh all coupons table
        this.getCoupons()
      } catch (error) {
        this.$showError(error)
        this.loader.hide()
      }
    },
  },
}
</script>

<style></style>
