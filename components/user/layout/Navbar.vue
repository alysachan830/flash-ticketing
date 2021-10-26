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
                >結帳付款</NuxtLink
              >
              <NuxtLink class="text-white me-8" to="/about">關於我們</NuxtLink>
            </div>
            <!-- Shop cart, bookmark, toggle button -->
            <div class="d-flex">
              <a
                href="#"
                class="d-flex align-items-center me-4"
                @click.prevent="showCart"
              >
                <span class="material-icons text-white align-middle">
                  shopping_cart
                </span>
                <span class="text-white"> {{ cartTotalQty }} </span>
              </a>
              <a href="#" class="me-4" @click.prevent="showFavourite">
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
            >結帳付款</NuxtLink
          >
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="/about"
            >關於我們</NuxtLink
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
      <div class="offcanvas-header d-block">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <p class="offcanvas-title font-l">購物車</p>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
      </div>
      <div class="offcanvas-body">
        <div v-if="carts.length > 0">
          <NuxtLink
            v-for="item in carts"
            :key="item.id"
            to="/checkout/order"
            class="d-flex px-2 border-top py-5"
            data-bs-dismiss="offcanvas"
          >
            <img
<<<<<<< HEAD
              v-img:img,200="item.product.imageUrl"
              class="offCanvas-img-size me-12 rounded-2"
=======
              class="offCanvas-img-size skeleton-bg me-12 rounded-2"
              :src="item.product.imageUrl"
>>>>>>> bugfix/skeleton
              alt="cart image"
            />
            <div class="d-flex justify-content-between w-100">
              <div>
                <p class="fw-bold mb-6">{{ item.product.title }}</p>
                <ul class="text-info font-s">
                  <li>
                    <span class="material-icons font-base me-3">
                      confirmation_number </span
                    >票劵數量： {{ countTotalTickets(item) }}
                  </li>
                  <li>
                    <span class="material-icons font-base me-3"> paid </span>HKD
                    {{ item.total }}
                  </li>
                </ul>
              </div>
              <a href="#">
                <span
                  class="material-icons font-m text-info"
                  @click="deleteCart(item)"
                >
                  close
                </span>
              </a>
            </div>
          </NuxtLink>
        </div>
        <div v-else>
          <p class="mb-3">{{ cartLoadingMsg }}</p>
          <NuxtLink to="/events/all" class="btn btn-outline-primary"
            >馬上購票</NuxtLink
          >
        </div>
      </div>
      <NuxtLink
        to="/checkout/order"
        class="checkout-btn p-8 text-white text-center"
        data-bs-dismiss="offcanvas"
        >結帳去</NuxtLink
      >
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
          <NuxtLink
            v-for="event in favourites"
            :key="event.id"
            :to="`/event/${event.id}`"
            class="d-flex px-2 border-top py-5"
            data-bs-dismiss="offcanvas"
          >
            <img
<<<<<<< HEAD
              v-img:img,200="event.imageUrl"
              class="offCanvas-img-size me-12 rounded-2"
=======
              class="offCanvas-img-size skeleton-bg me-12 rounded-2"
              :src="event.imageUrl"
>>>>>>> bugfix/skeleton
              alt="image of my favourite event"
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
                <span class="material-icons font-m text-info"> close </span>
              </a>
            </div>
          </NuxtLink>
        </div>
        <div v-else>
          <p class="mb-3">{{ favouriteLoadingMsg }}</p>
          <NuxtLink to="/events/all" class="btn btn-outline-primary"
            >馬上購票</NuxtLink
          >
        </div>
      </div>
      <NuxtLink
        to="/events/all"
        class="checkout-btn p-8 text-white text-center"
        data-bs-dismiss="offcanvas"
        >查看更多節目</NuxtLink
      >
    </div>
  </div>
</template>

<script>
import { apiClientDeleteCart } from '@/api/index'

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
      carts: [],
      favouriteLoadingMsg: '載入我的收藏中...',
      cartLoadingMsg: '載入我的購物車中...',
    }
  },
  computed: {
    cartTotalQty() {
      return this.carts.length
    },
  },
  watch: {
    favourites() {
      if (this.favourites.length === 0) {
        this.favouriteLoadingMsg = '目前沒有收藏任何活動'
      }
    },
  },
  created() {
    this.$bus.$on('refreshCartIcon', () => {
      this.getCart()
    })
  },
  mounted() {
    this.bsCartOffcanvas = new bootstrap.Offcanvas(this.$refs.cartOffcanvas)
    this.bsFavouriteOffcanvas = new bootstrap.Offcanvas(
      this.$refs.favouriteOffcanvas
    )
    this.getCart()
  },
  methods: {
    showCart() {
      this.bsCartOffcanvas.show()
      this.getCart()
    },
    showFavourite() {
      this.bsFavouriteOffcanvas.show()
      this.getMyFavourite()
    },
    async getCart() {
      try {
        await this.$store.dispatch('getCart')
        const { carts } = this.$store.getters
        this.carts = carts
        if (this.carts.length === 0) {
          this.cartLoadingMsg = '目前購物車沒有資料'
        }
      } catch (error) {
        this.$showError('載入我的購物車失敗')
      }
    },
    countTotalTickets(cartItem) {
      const validTicketIds = Object.keys(cartItem)
        .filter((key) => {
          return (
            key !== 'final_total' &&
            key !== 'id' &&
            key !== 'product' &&
            key !== 'product_id' &&
            key !== 'qty' &&
            key !== 'total' &&
            key !== 'coupon'
            // if user applies coupon, a 'coupon' object will be automatically added to the cart item,
            // so we have to filter out 'coupon'
          )
        })
        .filter((ticketId) => cartItem[ticketId] !== 0)
      // Filter out ticket with 0 qty
      // tickets with 0 qty are tickets that were once added to cart but then deleted by the user
      return validTicketIds.length
    },
    async deleteCart(item) {
      try {
        const confirmDelete = await this.$showConfirm(
          `是否確定刪除${item.product.title}的票劵？`
        )
        if (!confirmDelete) return
        await apiClientDeleteCart(item.id)
        // Refresh cart
        this.getCart()
      } catch (error) {
        this.$showError('刪除購物車資料失敗')
      }
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
@import '@/assets/stylesheets/all';

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

.checkout-btn {
  background: $primary;
  &:hover {
    background: #4b14b1;
  }
}
</style>
