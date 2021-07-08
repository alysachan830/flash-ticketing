<template>
  <div class="pt-18">
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
        <div class="col-4">
          <label for="coupon" class="mb-2">優惠碼</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="FLASH2021" />
            <button id="coupon" class="btn btn-primary" type="button">
              使用
            </button>
          </div>
        </div>
        <!-- <div class="col-3">
          <div class="d-flex justify-content-center">
            <Pagination></Pagination>
          </div>
        </div> -->
      </div>
      <!-- Table -->
      <!-- <table class="table table-hover mb-16">
        <thead>
          <tr>
            <th scope="col">節目名稱</th>
            <th scope="col">票種</th>
            <th scope="col">數量</th>
            <th scope="col">價錢(張)</th>
            <th scope="col">時段</th>
            <th scope="col">座位區域</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 8" :key="n">
            <td>胡桃夾子與他的王國</td>
            <td>成人票</td>
            <td>2</td>
            <td>$420</td>
            <td>2021-06-06 8:00 p.m</td>
            <td>Zone A</td>
            <td>
              <a href="#"><span class="material-icons"> close </span></a>
            </td>
          </tr>
        </tbody>
      </table> -->
      <!-- Card -->
      <div
        v-for="n in 8"
        :key="n"
        class="card-bg p-10 mb-6 rounded-3 border position-relative"
      >
        <a class="remove-btn position-absolute" href="#"
          ><span class="material-icons"> close </span></a
        >
        <div class="row">
          <div class="col-md-4 font-m mb-10">胡桃夾子與他的王國</div>
          <div class="col-md-2 mb-4 mb-md-0">
            <ul>
              <li>2021-06-06</li>
              <li>20:00 - 21:00</li>
            </ul>
          </div>
          <div class="col-md-2 mb-4 mb-md-0">Zone A</div>
          <div class="col-md-4">
            <div
              class="d-flex justify-content-between justify-content-md-start"
            >
              <p class="ticket-price">成人票 $320</p>
              <p class="col-md-2 font-m text-primary">x 1</p>
            </div>
          </div>
        </div>
      </div>
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
          <p class="font-l fw-bold text-primary">$1,803</p>
        </div>
        <div class="col-md-2">
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary w-auto w-md-100">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {}
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

.card-bg {
  background: #fafafa;

  transition: filter 0.3s;
  &:hover {
    filter: drop-shadow(0.5px 0.5px 3px #e0e0e0);
  }
}

.remove-btn {
  top: 12px;
  right: 12px;
}

.ticket-price {
  margin-right: 0;

  @include media-breakpoint-up(md) {
    margin-right: 40px;
  }

  @include media-breakpoint-up(lg) {
    margin-right: 100px;
  }

  @include media-breakpoint-up(xl) {
    margin-right: 152px;
  }
}
</style>
