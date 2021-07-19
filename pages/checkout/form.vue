<template>
  <div class="pt-18">
    <div class="container">
      <!-- Stepper -->
      <div class="position-relative mb-23">
        <div class="stepper w-100 bg-primary mt-23"></div>
        <div class="stepper-step-start position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary font-m">確認訂單</p>
        </div>
        <div class="stepper-step-middle position-absolute">
          <div class="stepper-circle m-auto mb-3 bg-primary"></div>
          <p class="text-primary font-m">個人資料</p>
        </div>
        <div class="stepper-step-end position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary font-m">完成購票</p>
        </div>
      </div>

      <!-- Form -->
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="row mb-md-14">
            <div class="col-md-6 mb-md-0 mb-14">
              <div>
                <label for="name" class="form-label">姓名</label>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  class="form-control"
                  placeholder="請輸入姓名"
                />
              </div>
            </div>
            <div class="col-md-6 mb-md-0 mb-14">
              <div>
                <label for="email" class="form-label">電郵</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
          </div>
          <div class="mb-14">
            <label for="address" class="form-label">地址</label>
            <input
              id="address"
              v-model="address"
              type="text"
              class="form-control"
              placeholder="請輸入地址"
            />
          </div>
          <div class="mb-14">
            <label for="tel" class="form-label">電話</label>
            <input
              id="tel"
              v-model="tel"
              type="text"
              class="form-control"
              placeholder="請輸入電話"
            />
          </div>
          <!-- <div class="row mb-14">
            <div class="col-md-6 mb-md-0 mb-14">
              <div>
                <label for="tel" class="form-label">電話</label>
                <input
                  id="tel"
                  v-model="tel"
                  type="text"
                  class="form-control"
                  placeholder="請輸入電話"
                />
              </div>
            </div>
            <div class="col-md-6 mb-md-0 mb-14">
              <div>
                <label for="payment" class="form-label">付款方式</label>
                <select
                  id="payment"
                  v-model="paymentMethod"
                  class="form-select"
                >
                  <option value="visa">VISA</option>
                  <option value="paypal">Paypal</option>
                </select>
              </div>
            </div>
          </div> -->
          <div class="mb-18">
            <label for="message" class="form-label">留言</label>
            <textarea
              id="message"
              v-model="message"
              class="form-control"
              rows="3"
            ></textarea>
          </div>
          <div class="row justify-content-between mb-21">
            <div class="col-md-2 col-4">
              <!-- class="btn btn-outline-primary w-100" -->
              <a href="/checkout/order"
                ><span class="material-icons me-3"> chevron_left </span
                ><span class="me-3">返回</span>
                <!-- <span class="material-icons-outlined"> chevron_right </span> -->
              </a>
            </div>
            <div class="col-md-2 col-4">
              <a
                href="/checkout/result"
                class="btn btn-primary w-100"
                @click.prevent="submitOrder"
                >確認</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClientSubmitOrder } from '@/api/index'

export default {
  data() {
    return {
      name: '',
      email: '',
      address: '',
      tel: '',
      // paymentMethod: 'visa',
      message: '',
    }
  },
  methods: {
    async submitOrder() {
      const allData = {
        data: {
          user: {
            name: this.name,
            email: this.email,
            tel: this.tel,
            address: this.address,
          },
          message: this.message,
        },
      }

      try {
        const sumbitOrderRes = await apiClientSubmitOrder(allData)
        if (!sumbitOrderRes.data.success) {
          throw sumbitOrderRes.data.message
        }
        this.$showSuccess('結帳成功')

        // Clear input
        this.name = ''
        this.email = ''
        this.address = ''
        this.tel = ''
        this.message = ''

        // redirect to success page
        this.$router.push('/checkout/result')
      } catch (error) {
        this.$showError('結帳失敗')
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
