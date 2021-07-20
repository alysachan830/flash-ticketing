<template>
  <div class="pt-18">
    <div class="container">
      <!-- Stepper -->
      <div class="position-relative mb-23">
        <div class="stepper w-100 bg-primary mt-23"></div>
        <div class="stepper-step-start position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary">確認訂單</p>
        </div>
        <div class="stepper-step-middle position-absolute">
          <div class="stepper-circle m-auto mb-3 bg-primary"></div>
          <p class="text-primary">個人資料</p>
        </div>
        <div class="stepper-step-end position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary">完成購票</p>
        </div>
      </div>

      <!-- Form -->
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(submitOrder)">
              <!-- Name -->
              <div class="row mb-md-14">
                <div class="col-md-6 mb-md-0 mb-14">
                  <div>
                    <label for="姓名" class="form-label">姓名</label>
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        id="姓名"
                        v-model="user.name"
                        type="text"
                        class="form-control"
                        placeholder="請輸入姓名"
                      />
                      <span class="text-danger font-s">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <!-- Email -->
                <div class="col-md-6 mb-md-0 mb-14">
                  <div>
                    <label for="電郵" class="form-label">電郵</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|email"
                    >
                      <input
                        id="電郵"
                        v-model="user.email"
                        type="email"
                        class="form-control"
                        placeholder="example@gmail.com"
                      />
                      <span class="text-danger font-s">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <!-- Address -->
              <div class="mb-14">
                <label for="地址" class="form-label">地址</label>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <input
                    id="地址"
                    v-model="user.address"
                    type="text"
                    class="form-control"
                    placeholder="請輸入地址"
                  />
                  <span class="text-danger font-s">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Tel -->
              <div class="mb-14">
                <label for="電話" class="form-label">電話</label>
                <ValidationProvider v-slot="{ errors }" rules="required|tel">
                  <input
                    id="電話"
                    v-model="user.tel"
                    type="text"
                    class="form-control"
                    placeholder="請輸入電話"
                  />
                  <span class="text-danger font-s">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Comment -->
              <div class="mb-18">
                <label for="留言" class="form-label">留言</label>
                <textarea
                  id="留言"
                  v-model="message"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>
              <div class="row justify-content-between mb-21">
                <div class="col-md-2 col-4">
                  <a href="/checkout/order"
                    ><span class="material-icons me-3"> chevron_left </span
                    ><span class="me-3">返回</span>
                  </a>
                </div>
                <div class="col-md-2 col-4">
                  <button
                    type="submit"
                    href="/checkout/result"
                    class="btn btn-primary w-100"
                  >
                    確認
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClientSubmitOrder } from '@/api/index'
// Vee-validate
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_TW.json'
import { required, email } from 'vee-validate/dist/rules'

extend('email', email)
extend('required', required)
extend('tel', (value) => {
  if (value.match(/^[0-9)(+-]+$/)) {
    return true
  }
  return '電話只能是數字或 "+" 、 "-" 和括號符號'
})

localize('zh_TW', zh)

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  middleware: 'orderForm',
  data() {
    return {
      user: {
        name: '',
        email: '',
        address: '',
        tel: '',
      },
      message: '',
    }
  },
  methods: {
    async submitOrder() {
      const allData = {
        data: {
          user: this.user,
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
        Object.keys(this.user).forEach((key) => (this.user[key] = ''))
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
