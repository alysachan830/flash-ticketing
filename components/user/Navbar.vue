<template>
  <div>
    <nav class="bg-primary sticky-top py-6">
      <div class="container">
        <div class="row w-100">
          <div class="col-2">
            <NuxtLink to="/" class="d-flex align-items-center me-10 text-white">
              <i class="material-icons font-xl me-2">offline_bolt</i>
              <h1 class="text-uppercase font-s text-start" href="#">
                flash <br />
                ticketing
              </h1>
            </NuxtLink>
          </div>
          <div class="col-3">
            <!-- Search bar -->
            <div
              class="
                search-bar-w
                d-lg-flex d-none
                me-12
                input-group input-group-sm
              "
            >
              <input
                type="text"
                class="form-control font-s"
                placeholder="節目名稱 / 演出者 "
                aria-label="節目名稱 / 演出者 "
                aria-describedby="button-addon2"
              />
              <button
                id="button-addon2"
                class="btn btn-secondary"
                type="button"
              >
                <span class="material-icons align-middle text-primary">
                  search
                </span>
              </button>
            </div>
          </div>
          <div class="offset-1 col-5">
            <div class="d-flex justify-content-end align-items-center">
              <!-- Nuxt links -->
              <div class="d-lg-flex d-none me-5">
                <NuxtLink class="font-s text-nowrap text-white me-8" to="events"
                  >所有節目</NuxtLink
                >
                <NuxtLink
                  class="font-s text-nowrap text-white me-8"
                  to="articles"
                  >節目點評</NuxtLink
                >
                <NuxtLink
                  class="font-s text-nowrap text-white me-8"
                  to="contact"
                  >聯絡我們</NuxtLink
                >
                <NuxtLink class="font-s text-nowrap text-white me-8" to="faq"
                  >常見問題</NuxtLink
                >
              </div>
              <!-- Shop cart, bookmark, toggle button -->
              <div class="d-flex">
                <a href="#" class="me-4" @click="showCart">
                  <span class="material-icons text-white align-middle">
                    shopping_cart
                  </span>
                </a>
                <a href="#" class="me-4" @click="showFavourite">
                  <span class="material-icons text-white align-middle">
                    bookmark
                  </span>
                </a>
                <a
                  class="d-lg-none"
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <span class="material-icons text-white align-middle">
                    menu
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <a
      class="btn btn-primary"
      data-bs-toggle="offcanvas"
      href="#offcanvasExample"
      role="button"
      aria-controls="offcanvasExample"
    >
      Link with href
    </a>
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample"
    >
      Button with data-bs-target
    </button>

    <!-- Offcanvas -->
    <div
      id="offcanvasExample"
      class="offcanvas offcanvas-start"
      tabindex="-1"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <div class="d-flex align-items-center">
          <i class="material-icons font-xl me-2">offline_bolt</i>
          <h5
            id="offcanvasExampleLabel"
            class="lh-sm text-uppercase font-s text-start offcanvas-title"
            href="#"
          >
            flash <br />
            ticketing
          </h5>
        </div>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div>
          <!-- Nuxt links -->
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="events"
            >所有節目</NuxtLink
          >
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="articles"
            >節目點評</NuxtLink
          >
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="contact"
            >聯絡我們</NuxtLink
          >
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="faq"
            >常見問題</NuxtLink
          >
        </div>
      </div>
    </div>

    <!-- Shop cart's offcanvas -->
    <div
      id="cartOffcanvas"
      ref="cartOffcanvas"
      class="offcanvas offcanvas-start"
      tabindex="-1"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <p class="offcanvas-title font-l">購物車</p>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div v-for="n in 10" :key="n" class="d-flex px-2 border-top py-5">
          <img
            class="offCanvas-img-size me-12 rounded-2"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/flashticketing/1625172152483.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=A6g2dOim3jb8EcodT4ceEsWkJ70%2FxnSUcM9kBmsVYu6D7N4yJ2gRrmnuD6qzBA4N7CvKczPW5%2FXRQ4R%2FobN5EKw9bLMY7cLEFvQ0EC1bmi%2Bsopo%2FuQj5PeflPgo3DudOUV4qyAl4d3y4J5fVJQJzTPwP70L4vp094v8A%2BbRtgNQ15LpPo2%2FMK39FQcgZEgkJej1BYd4syzhcdsP3Oftq45wfGw27LlOgjEQmUAvTQVj%2B9cPE43LAUGRGL4sHU%2Fi8Iecx7sSM0n6J6%2B7tXx3%2Fcn1BWKE%2Bf2lY5eBIt4Ln1JyN3rFvCEbmMGRcTHvZrBKCLnIAHAeTxE3UEKStXr8p3A%3D%3D"
            alt="cart image"
          />
          <div class="d-flex justify-content-between w-100">
            <div>
              <p class="fw-bold mb-6">胡桃夾子與他的王國</p>
              <!-- <ul class="text-info font-s">
                <li>
                  <span class="material-icons font-base me-3">
                    confirmation_number </span
                  >票種：學生票
                </li>
                <li>
                  <span class="material-icons font-base me-2"> local_offer </span>
                  數量：1
                </li>
                <li>
                  <span class="material-icons font-base me-3"> paid </span>價錢：1
                </li>
              </ul> -->
              <ul class="text-info font-s">
                <li>
                  <span class="material-icons font-base me-3">
                    confirmation_number </span
                  >學生票 x 1
                </li>
                <li>
                  <span class="material-icons font-base me-3"> paid </span>HKD
                  300
                </li>
              </ul>
            </div>
            <a href="#">
              <span class="material-icons"> close </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- My favourite list offcanvas -->
    <div
      id="favouriteOffcanvas"
      ref="favouriteOffcanvas"
      class="offcanvas offcanvas-start"
      tabindex="-1"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <p class="offcanvas-title font-l">我的收藏</p>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div v-for="n in 10" :key="n" class="d-flex px-2 border-top py-5">
          <img
            class="offCanvas-img-size me-12 rounded-2"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/flashticketing/1625173434912.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=da8BPRMDF5JnemX4M5y5mBwKq1vDshpwDkoT01dU5RwXUTyMoacAlk5j9PH7O2kkGBJRVMFQFn0YlEs5NNIEB9zTiKgvz30%2BXJhY1M4PVNKrJcErhKNHUNhlKFijNOEVflBHAeTWvhjMWrQvCa11pdgvTpKzlqQqtdo5B4dUk0C4OL4tGG7ULJ%2FFJDjXCiR5DrpL7wgYvZUj6ByyTD1FLOfsQuBmS%2FpzAl9MuwgQKFaaLywSijBjjaIhieIJ%2Bv5CnJZPI0Iv8IIndeJAFzbxvsCsPclptlTe%2Fy5Hl%2F8vXVr6lM6yUcdGgSN%2B2i%2B14YE2Z4Sbh6mjE37XLmm2KC1%2BGA%3D%3D"
            alt="cart image"
          />
          <div class="d-flex justify-content-between w-100">
            <div>
              <p class="fw-bold mb-6">胡桃夾子與他的王國</p>
              <ul class="text-info font-s">
                <li>
                  <span class="material-icons font-base me-3">
                    calendar_today
                  </span>
                  2021-06-30 - 2021-07-15
                </li>
                <li>
                  <span class="material-icons font-base me-3">
                    location_on </span
                  >香港電競動漫中心
                </li>
              </ul>
            </div>
            <a href="#">
              <span class="material-icons"> close </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let bootstrap

if (process.browser) {
  require('@/node_modules/bootstrap/js/dist/offcanvas.js')
  bootstrap = require('@/node_modules/bootstrap/dist/js/bootstrap.js')
}
export default {
  data() {
    return {
      bsCartOffcanvas: {},
      bsFavouriteOffcanvas: {},
    }
  },
  mounted() {
    this.bsCartOffcanvas = new bootstrap.Offcanvas(this.$refs.cartOffcanvas)
    this.bsFavouriteOffcanvas = new bootstrap.Offcanvas(
      this.$refs.favouriteOffcanvas
    )
  },
  methods: {
    showCart() {
      this.bsCartOffcanvas.show()
    },
    showFavourite() {
      this.bsFavouriteOffcanvas.show()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 0;
}

.offCanvas-img-size {
  width: 100px;
  height: 100px;
}
</style>
