<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="font-xl mb-16">{{ isNew ? '新增優惠劵' : '編輯優惠劵' }}</h2>

        <div class="mb-14">
          <label for="title" class="form-label">優惠劵標題</label>
          <input
            id="title"
            v-model="inputData.title"
            type="text"
            class="form-control"
          />
        </div>
        <div v-if="isNew" class="mb-14">
          <label for="code" class="form-label">優惠碼</label>
          <input
            id="code"
            v-model="inputData.code"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-14">
          <label for="dueDate" class="form-label">到期日</label>
          <input
            id="dueDate"
            v-model="inputData.due_date"
            type="date"
            class="form-control"
          />
        </div>
        <div class="form-check mb-14">
          <input
            id="isEnabled"
            v-model="inputData.is_enabled"
            class="form-check-input"
            type="checkbox"
            value=""
          />
          <label class="form-check-label" for="isEnabled"> 是否啟用 </label>
        </div>
        <div class="mb-14">
          <label for="discount" class="form-label">折扣優惠</label>
          <input
            id="discount"
            v-model.number="inputData.percent"
            type="text"
            class="form-control"
          />
        </div>
        <button type="button" class="btn btn-primary" @click="save">
          {{ isNew ? '新增優惠劵' : '儲存更改' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { apiAdminAddCoupon, apiAdminEditCoupon } from '@/api/index'

export default {
  data() {
    return {
      loader: {},
      isNew: false,
      coupon: {},
      inputData: {},
    }
  },
  mounted() {
    if (this.$route.params.couponId === 'new') {
      this.isNew = true
      return
    }
    this.coupon = this.$store.getters.adminEditingCoupon
    this.inputData = JSON.parse(JSON.stringify(this.coupon))
    this.$nextTick().then(() => {
      this.inputData.due_date = moment
        .unix(this.inputData.due_date)
        .format('YYYY-MM-DD')
    })
  },
  methods: {
    async save() {
      if (!this.isNew) {
        try {
          const token = this.$cookies.get('flashTicketingAuth').token
          this.inputData.due_date = moment(this.inputData.due_date).unix()
          this.inputData.is_enabled = Number(this.inputData.is_enabled)
          this.loader = this.$loading.show()
          const editCouponRes = await apiAdminEditCoupon(
            token,
            this.coupon.id,
            {
              data: this.inputData,
            }
          )
          if (!editCouponRes.data.success) {
            throw editCouponRes.data.message
          }
          this.$showSuccess('已儲存更改')
          // Back to all coupons table
          window.setTimeout(() => {
            this.$router.push('/admin/coupons')
          }, 2500)
        } catch (error) {
          this.$showError('修改優惠劵失敗')
        } finally {
          this.loader.hide()
        }
      } else {
        try {
          const token = this.$cookies.get('flashTicketingAuth').token
          this.inputData.due_date = moment(this.inputData.due_date).unix()
          this.inputData.is_enabled = Number(this.inputData.is_enabled)
          this.loader = this.$loading.show()
          const addCouponRes = await apiAdminAddCoupon(token, {
            data: this.inputData,
          })
          if (!addCouponRes.data.success) {
            throw addCouponRes.data.message
          }
          this.$showSuccess('成功新增優惠劵')
          // Back to all coupons table
          window.setTimeout(() => {
            this.$router.push('/admin/coupons')
          }, 2500)
        } catch (error) {
          this.$showError('新增優惠劵失敗')
        } finally {
          this.loader.hide()
        }
      }
    },
  },
}
</script>
