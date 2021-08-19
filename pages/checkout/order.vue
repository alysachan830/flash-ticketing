<template>
  <div ref="cartPage" class="pt-18 min-vh-100">
    <div class="container">
      <!-- Stepper -->
      <div class="position-relative mb-23">
        <div class="stepper w-100 bg-primary mt-20"></div>
        <div class="stepper-step-start position-absolute">
          <div class="stepper-circle m-auto mb-3 bg-primary"></div>
          <p class="text-primary">確認訂單</p>
        </div>
        <div class="stepper-step-middle position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary">個人資料</p>
        </div>
        <div class="stepper-step-end position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary">完成購票</p>
        </div>
      </div>
      <!-- Coupon button -->
      <div class="d-md-flex justify-content-between align-items-end mb-18">
        <div class="row w-100 mb-8 mb-md-0">
          <div class="col-md-6 col-lg-4">
            <label for="coupon" class="mb-2">優惠劵</label>
            <ul class="form-text mb-6 font-xs">
              <li>*套用優惠劵「flash2021」，可享有80%折扣優惠</li>
              <li>*優惠劵只能使用一次</li>
            </ul>
            <div class="input-group">
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
        <button
          type="button"
          class="btn btn-outline-primary text-nowrap"
          @click="deleteAllCart"
        >
          刪除全部購物車內容
        </button>
      </div>

      <div v-if="carts.length > 0">
        <CartCard
          v-for="item in filterCarts"
          :key="item.id"
          :cart-item="item"
        />
        <div class="d-flex justify-content-end mb-18">
          <Pagination :total-pages="Math.ceil(carts.length / 4)" />
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
            <p class="font-l fw-bold text-primary">
              ${{ totalCount.toFixed(1) }}
            </p>
          </div>
          <div class="col-md-2 col-4 offset-8 offset-md-0">
            <NuxtLink to="/checkout/form" class="btn btn-primary w-100"
              >確認</NuxtLink
            >
          </div>
        </div>
      </div>
      <p v-else class="vh-100">目前購物車為空</p>
    </div>
    <div></div>
  </div>
</template>

<script>
import CartCard from '@/components/user/cart/CartCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import {
  apiClientApplyCoupon,
  apiClientDeleteAllCart,
  apiClientDeleteCart,
} from '@/api/index'

export default {
  components: {
    CartCard,
    Pagination,
  },
  async asyncData({ store }) {
    try {
      await store.dispatch('getCart')
      const { carts, cartInfo } = store.getters
      const totalCount = cartInfo.total
      return { carts, totalCount }
    } catch (error) {
      const errorMsg = error.message
      return {
        errorMsg,
      }
    }
  },
  data() {
    return {
      loader: {},
      currentPage: 1,
      couponCode: 'flash2021',
      hasAppliedCoupon: false,
    }
  },
  computed: {
    filterCarts() {
      return this.carts.slice(
        (this.currentPage - 1) * 4,
        (this.currentPage - 1) * 4 + 4
      )
    },
  },
  created() {
    this.$nuxt.$on('clickPageNum', (n) => {
      this.currentPage = n
    })
    this.$bus.$on('clearPageNum', () => {
      this.currentPage = 1
    })

    this.$nuxt.$on('refreshCart', async (cartId, ticketIds) => {
      await this.getCart()
      if (cartId && ticketIds) {
        const cartItem = this.carts.find((item) => item.id === cartId)
        if (cartItem === undefined) {
          return
        }
        const isEmpty = ticketIds.every((ticketId) => cartItem[ticketId] === 0)
        if (isEmpty) {
          this.deleteCart(cartId)
        }
      }
      await this.getCart()
    })
  },
  mounted() {
    // Error handling
    if (this.errorMsg) {
      this.$showError('載入資料失敗')
    }
  },
  methods: {
    async getCart() {
      try {
        await this.$store.dispatch('getCart')
        const { carts, cartInfo } = this.$store.getters
        this.carts = carts
        if (this.hasAppliedCoupon) {
          this.totalCount = cartInfo.final_total
        } else {
          this.totalCount = cartInfo.total
        }
      } catch (error) {
        this.$showError('載入購物車失敗')
      }
    },
    async deleteAllCart() {
      if (this.carts.length === 0) {
        this.$showError('無法刪除！購物車目前為空')
        return
      }
      try {
        const confirmDelete = await this.$showConfirm(
          '是否確定刪除全部購物車內容？'
        )
        if (!confirmDelete) return
        this.loader = this.$loading.show()
        const deleteAllCartRes = await apiClientDeleteAllCart()
        if (!deleteAllCartRes.data.success) {
          throw deleteAllCartRes.data.message
        }
        this.$showSuccess('成功刪除所有購物車內容')
        this.loader.hide()
        // Refresh cart
        this.getCart()
        this.$nextTick().then(() => {
          this.$bus.$emit('refreshCartIcon')
        })
      } catch (error) {
        this.$showError(error)
        this.loader.hide()
      }
    },
    async applyCoupon() {
      if (this.carts.length === 0) {
        this.$showError('目前購物車是空')
        return
      }
      if (
        this.carts.length > 0 &&
        this.carts[0].coupon &&
        this.carts[0].coupon.code === this.couponCode
      ) {
        this.$showError('此優惠劵已被使用')
        return
      }
      try {
        this.loader = this.$loading.show()
        const applyCouponRes = await apiClientApplyCoupon({
          data: {
            code: this.couponCode,
          },
        })
        if (!applyCouponRes.data.success) {
          throw applyCouponRes.data.message
        }
        this.hasAppliedCoupon = true
        this.$showSuccess('成功套用優惠劵')
        // Update total price
        await this.$store.dispatch('getCart')
        const { cartInfo, carts } = this.$store.getters
        this.totalCount = cartInfo.final_total // To get the updated price after counting discount, use final_total
        this.carts = carts
      } catch (error) {
        if (typeof error === 'string') {
          this.$showError(error)
        } else {
          this.$showError('套用優惠劵失敗')
        }
      } finally {
        this.loader.hide()
      }
    },
    async deleteCart(cartId) {
      try {
        await apiClientDeleteCart(cartId)
        this.getCart()
      } catch (error) {
        this.$showError('刪除單一購物車資料失敗')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.stepper {
  height: 2px;

  &-circle {
    border-radius: 50%;
    border: 2px solid $primary;
    height: 16px;
    width: 16px;
    background: #fff;
  }

  &-step-start {
    transform: translate(0, -20%);
    left: 10%;
  }

  &-step-middle {
    left: 50%;
    transform: translate(-50%, -20%);
  }

  &-step-end {
    right: 10%;
    transform: translate(0, -20%);
  }
}
</style>
