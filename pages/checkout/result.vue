<template>
  <div class="pt-18 vh-100">
    <div class="container">
      <!-- Stepper -->
      <div class="position-relative mb-23">
        <div class="stepper w-100 bg-primary mt-23"></div>
        <div class="stepper-step-start position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary">確認訂單</p>
        </div>
        <div class="stepper-step-middle position-absolute">
          <div class="stepper-circle m-auto mb-3"></div>
          <p class="text-primary">個人資料</p>
        </div>
        <div class="stepper-step-end position-absolute">
          <div class="stepper-circle m-auto mb-3 bg-primary"></div>
          <p class="text-primary">完成購票</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4 text-center mb-23">
          <span class="material-icons text-primary font-4xl mb-6">
            check_circle
          </span>
          <p class="font-xl text-primary mb-6">成功訂票</p>
          <p class="text-primary font-m mb-18">入場票卷已寄到您的郵箱</p>
          <NuxtLink to="/" class="btn btn-primary">回到首頁</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'orderResult',
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
