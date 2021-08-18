<template>
  <div class="pt-18">
    <!-- Top banner -->
    <div class="position-relative">
      <div
        class="
          top-banner
          bg-img
          d-flex
          justify-content-center
          align-items-center
          banner-filter
        "
      ></div>
      <div
        class="position-absolute top-banner-title text-white text-center w-100"
      >
        <h2 class="mb-8 font-lg-2xl font-l">亞洲年度新媒體藝術節 2021</h2>
        <div class="mb-12">
          <p class="me-3">
            <span
              class="material-icons align-text-top me-1 text-white font-base"
            >
              calendar_today
            </span>
            2021-08-08 — 2021-08-22
          </p>
          <p>
            <span
              class="material-icons align-text-top me-1 text-white font-base"
            >
              location_on
            </span>
            國際展覽中心一號展場
          </p>
        </div>
        <NuxtLink
          to="/event/-Mdm05StW8ZACYsw82zh"
          class="btn btn-primary btn-lg px-10"
          >搶先購票</NuxtLink
        >
      </div>
    </div>

    <!-- Quick search options -->
    <div class="container mb-18 pt-15 d-lg-flex d-block align-items-center">
      <p class="font-m text-info pe-12 text-nowrap mb-4 mb-lg-0">快速搜尋</p>
      <Categories />
    </div>
    <!-- Body -->
    <div class="container">
      <!-- Hot events -->
      <client-only>
        <div class="mb-23">
          <div class="mb-lg-22 mb-18">
            <div class="mb-14">
              <h2 class="font-xl mb-4">熱門節目</h2>
              <p>時刻緊貼潮流，為您帶來最豐富的節目體驗。</p>
            </div>
            <SwiperHotEvents :hot-events="hotEventsSlides" />
          </div>
          <!-- Hot events cards -->
          <div class="row mb-16">
            <div
              v-for="event in hotEventsCards"
              :key="event.id"
              class="col-lg-3 col-6 mb-lg-10 mb-5"
            >
              <EventCard
                :id="event.id"
                :title="event.title"
                :image="event.imageUrl"
                :date-time="event.dateTime"
                :tag="event.tag"
              />
            </div>
          </div>
          <div class="text-center">
            <NuxtLink
              to="/events/all"
              class="
                btn btn-lg btn-outline-primary
                px-22
                py-2
                w-100 w-lg-auto
                font-base
              "
            >
              更多節目
            </NuxtLink>
          </div>
        </div>
      </client-only>
    </div>
    <!-- New events -->
    <client-only>
      <div class="mb-23">
        <!-- New event banner -->
        <NuxtLink
          to="/event/-MeDhhevaeV5e8wUDUuS"
          class="position-relative mb-19"
        >
          <span class="d-block">
            <div class="latest-event-banner bg-img"></div>
            <div
              class="
                position-absolute
                latest-event-title
                container
                text-center text-lg-start
              "
            >
              <h2 class="mb-8 font-2xl text-white">
                夏日序曲 — 莫扎特的交響樂
              </h2>
              <div class="mb-12">
                <p class="me-3 text-white font-l">
                  <span class="material-icons align-text-top me-1 font-l me-3">
                    calendar_today
                  </span>
                  2021-08-11 - 2021-08-13
                </p>
                <p class="text-white font-l">
                  <span class="material-icons align-text-top me-1 font-l me-3">
                    location_on
                  </span>
                  香港表演藝術大學三樓演奏廳
                </p>
              </div>
              <NuxtLink
                to="/event/-MeDhhevaeV5e8wUDUuS"
                class="btn btn-primary btn-lg px-10"
                >搶先購票</NuxtLink
              >
            </div>
          </span>
        </NuxtLink>
        <!-- New event title -->
        <div class="mb-14 container">
          <h2 class="font-xl mb-4">最新節目</h2>
          <p>搶先體驗最新節目活動。</p>
        </div>
        <!-- New events cards -->
        <div class="container">
          <div class="row mb-16">
            <div
              v-for="event in newEventsCards"
              :key="event.id"
              class="col-lg-3 col-6 mb-10"
            >
              <EventCard
                :id="event.id"
                :title="event.title"
                :image="event.imageUrl"
                :date-time="event.dateTime"
                :tag="event.tag"
              />
            </div>
          </div>
          <div class="text-center">
            <NuxtLink
              to="/events/all"
              class="
                btn btn-lg btn-outline-primary
                px-22
                py-2
                w-100 w-lg-auto
                font-base
              "
            >
              更多節目
            </NuxtLink>
          </div>
        </div>
      </div>
    </client-only>
    <!-- Footer banner -->
    <div
      class="
        footer-banner
        d-flex
        justify-content-center
        align-items-center
        position-relative
      "
    >
      <div class="row justify-content-center">
        <h3
          class="
            text-white
            font-l font-md-xl font-lg-2xl
            text-center
            mb-10
            fw-normal
            lh-base
          "
        >
          訂閱最新消息 <br />
          率先享受最新節目
        </h3>

        <div class="input-btn-wrap position-absolute">
          <div class="input-group input-group-lg mb-3">
            <input
              type="email"
              class="form-control font-s font-lg-m"
              placeholder="您的電郵"
              aria-label="您的電郵"
            />
            <button
              id="subscribe"
              class="btn btn-outline-secondary font-s font-lg-m"
              type="button"
            >
              訂閱
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Categories from '@/components/user/Categories.vue'
import EventCard from '@/components/user/EventCard.vue'
import SwiperHotEvents from '@/components/user/swiper/HotEvents.vue'

export default {
  components: {
    Categories,
    EventCard,
    SwiperHotEvents,
  },
  async asyncData(context) {
    try {
      await context.store.dispatch('getAllEvents')
      const { hotEvents, newEvents } = context.store.getters
      return {
        hotEvents,
        newEvents,
      }
    } catch (error) {
      const errorMsg = error.message
      return {
        errorMsg,
      }
    }
  },
  computed: {
    hotEventsSlides() {
      return this.hotEvents?.slice(0, 4)
    },
    hotEventsCards() {
      return this.hotEvents?.slice(5, this.hotEvents.length + 1)
    },
    newEventsCards() {
      return this.newEvents?.slice(0, Math.floor(this.newEvents.length / 4) * 4)
    },
  },
  mounted() {
    const loader = this.$loading.show()
    setTimeout(() => {
      loader.hide()
    }, 5000)
    // Error handling
    if (this.errorMsg) {
      this.$showError('載入資料失敗')
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.top-banner {
  background-image: url('@/assets/images/brandon-erlinger-ford-wI2Hafqr_f4-unsplash.jpg');
  height: 388px;
}

.top-banner-title {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.latest-event-banner {
  background-image: url('@/assets/images/arindam-mahanta-VEOk8qUl9DU-unsplash.jpg');
  background-position: bottom;
  background-attachment: fixed;
  height: 720px;
  filter: brightness(0.6);
}

.latest-event-title {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.footer-banner {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    center / cover no-repeat
      url('@/assets/images/alexander-popov-endMHm-S3d8-unsplash.jpg');
  height: 520px;
}

.input-btn-wrap {
  bottom: 30%;
  width: 60%;
  @include media-breakpoint-up(md) {
    width: 40%;
    bottom: 20%;
  }
}
</style>
