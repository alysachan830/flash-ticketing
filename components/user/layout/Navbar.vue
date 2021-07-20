<template>
  <div>
    <nav class="nav-h bg-primary fixed-top w-100">
      <div class="container">
        <div class="w-100 d-flex align-items-center justify-content-between">
          <NuxtLink to="/" class="d-flex align-items-center me-10 text-white">
            <i class="material-icons font-xl me-2">offline_bolt</i>
            <h1 class="text-uppercase font-s text-start" href="#">
              flash <br />
              ticketing
            </h1>
          </NuxtLink>
          <div class="d-flex justify-content-end align-items-center">
            <!-- Nuxt links -->
            <div class="d-lg-flex d-none me-5">
              <NuxtLink class="text-white me-8" to="/events/all"
                >所有節目</NuxtLink
              >
              <NuxtLink class="text-white me-8" to="/checkout/order"
                >我的購物車</NuxtLink
              >
              <NuxtLink class="text-white me-8" to="/login">後台登入</NuxtLink>
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
    </nav>

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
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="/events/all"
            >所有節目</NuxtLink
          >
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="/checkout/order"
            >我的購物車</NuxtLink
          >
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="/login"
            >後台登入</NuxtLink
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
        <div v-if="favourites.length > 0">
          <div
            v-for="event in favourites"
            :key="event.id"
            class="d-flex px-2 border-top py-5"
          >
            <img
              class="offCanvas-img-size me-12 rounded-2"
              :src="event.imageUrl"
              alt="cart image"
            />
            <div class="d-flex justify-content-between w-100">
              <div>
                <p class="fw-bold mb-6">{{ event.title }}</p>
                <ul class="text-info font-s">
                  <li>
                    <span class="material-icons font-base me-3">
                      calendar_today
                    </span>
                    {{ dateTimeTemplate(event.dateTime) }}
                  </li>
                  <li>
                    <span class="material-icons font-base me-3">
                      location_on
                    </span>
                    {{ event.venue }}
                  </li>
                </ul>
              </div>
              <a href="#" @click.prevent="deleteFavourite(event.id)">
                <span class="material-icons"> close </span>
              </a>
            </div>
          </div>
        </div>
        <div v-else>{{ favouriteAlert }}</div>
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
      favourites: [],
      favouriteAlert: '載入我的收藏中...',
    }
  },
  watch: {
    favourites() {
      if (this.favourites.length === 0) {
        this.favouriteAlert = '目前沒有收藏任何活動'
      }
    },
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
      this.getMyFavourite()
    },
    async getMyFavourite() {
      const favouritesId = this.$getFavourite()
      try {
        await this.$store.dispatch('getAllEvents')
        const { allEvents } = this.$store.getters
        this.favourites = allEvents.filter((event) =>
          favouritesId.includes(event.id)
        )
      } catch (error) {
        this.$showError('載入我的收藏失敗')
      }
    },
    dateTimeTemplate(dateTime) {
      if (Array.isArray(dateTime)) {
        return `${dateTime[0].date} - ${dateTime[dateTime.length - 1].date}`
      } else {
        return `${dateTime.start} - ${dateTime.end}`
      }
    },
    deleteFavourite(id) {
      this.$deleteFavourite(id)
      this.getMyFavourite()
      // Refresh bookmark icon in EventCard component
      this.$bus.$emit('getFavourite')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 0;
}

.nav-h {
  height: 64px;
  line-height: 64px;
}

.offCanvas-img-size {
  width: 100px;
  height: 100px;
}
</style>
