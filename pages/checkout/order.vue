<template>
  <div ref="cartPage" class="pt-18">
    <div class="container">
      <!-- Stepper -->
      <div class="position-relative mb-23">
        <div class="stepper w-100 bg-primary mt-23"></div>
        <div class="stepper-step-start position-absolute">
          <div class="stepper-circle m-auto mb-3 bg-primary"></div>
          <p class="text-primary font-m">確認訂單</p>
        </div>
        <div class="stepper-step-middle position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary font-m">個人資料</p>
        </div>
        <div class="stepper-step-end position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary font-m">完成購票</p>
        </div>
      </div>
      <!-- Coupon button -->
      <div class="row mb-18 justify-content-between align-items-end">
        <div class="col-md-6 col-lg-4">
          <label for="coupon" class="mb-2">優惠劵</label>
          <ul class="form-text mb-6 font-xs">
            <li>*套用優惠劵「flash2021」，可享有80%折扣優惠</li>
            <li>*優惠劵只能使用一次</li>
          </ul>
          <div class="input-group mb-3">
            <input v-model="couponCode" type="text" class="form-control" />
            <button
              id="coupon"
              class="btn btn-primary"
              type="button"
              @click="applyCoupon"
            >
              套用
            </button>
          </div>
        </div>
      </div>
      <CartCard
        v-for="item in carts"
        :key="item.id"
        :cart-item="item"
      ></CartCard>
      <div class="d-flex justify-content-end mb-18">
        <Pagination></Pagination>
      </div>
      <!-- Total -->
      <div class="row justify-content-between mb-21">
        <div
          class="
            col-md-3
            d-flex
            justify-content-between
            align-items-end
            mb-6 mb-md-0
          "
        >
          <p class="font-l">總計</p>
          <p class="font-l fw-bold text-primary">${{ cartFinalTotal }}</p>
        </div>
        <div class="col-md-2 col-4 offset-8 offset-md-0">
          <a href="/checkout/form" class="btn btn-primary w-100">確認</a>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import CartCard from '@/components/user/cart/CartCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import { apiClientApplyCoupon } from '@/api/index'

export default {
  components: {
    CartCard,
    Pagination,
  },
  async asyncData({ store }) {
    try {
      await store.dispatch('getCart')
      const { carts, cartFinalTotal } = store.getters
      return { carts, cartFinalTotal }
    } catch (error) {
      const errorMsg = error.message
      return {
        errorMsg,
      }
    }
  },
  data() {
    return {
      couponCode: 'flash2021',
    }
  },
  created() {
    this.$nuxt.$on('refreshCart', async () => {
      try {
        await this.$store.dispatch('getCart')
        const { carts, cartFinalTotal } = this.$store.getters
        this.carts = carts
        this.cartFinalTotal = cartFinalTotal
      } catch (error) {
        const errorMsg = error.message
        this.$showError('載入購物車失敗')
        // eslint-disable-next-line no-console
        console.log(errorMsg)
      }
    })
  },
  mounted() {
    // Error handling
    if (this.errorMsg) {
      this.$showError('載入資料失敗')
      // eslint-disable-next-line no-console
      console.error(this.errorMsg)
    }
  },
  methods: {
    async applyCoupon() {
      if (
        this.carts.length > 0 &&
        this.carts[0].coupon.code === this.couponCode
      ) {
        this.$showError('此優惠劵已被使用')
        return
      }
      try {
        const applyCouponRes = await apiClientApplyCoupon({
          data: {
            code: this.couponCode,
          },
        })
        if (!applyCouponRes.data.success) {
          throw applyCouponRes.data.message
        }
        this.$showSuccess('成功套用優惠劵')
        // Update total price
        await this.$store.dispatch('getCart')
        const { cartFinalTotal } = this.$store.getters
        this.cartFinalTotal = cartFinalTotal
      } catch (error) {
        if (typeof error === 'string') {
          this.$showError(error)
        } else {
          this.$showError('套用優惠劵失敗')
        }
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.stepper {
  height: 3px;

  &-circle {
    border-radius: 50%;
    border: 3px solid $primary;
    height: 24px;
    width: 24px;
    background: #fff;

    // &-start {
    //   @extend .stepper-circle;
    //   transform: translate(0, -50%);
    // }
  }

  &-step-start {
    transform: translate(0, -25%);
    left: 10%;
  }

  &-step-middle {
    left: 50%;
    transform: translate(-50%, -25%);
  }

  &-step-end {
    right: 10%;
    transform: translate(0, -25%);
  }
}
</style>
