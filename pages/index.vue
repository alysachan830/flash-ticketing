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
        <h2 class="mb-8 font-lg-2xl font-xl">亞洲年度新媒體藝術節 2021</h2>
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
        <button class="btn btn-primary btn-lg px-10">搶先購票</button>
      </div>
    </div>

    <!-- Quick search options -->
    <div class="container mb-18 pt-15 d-lg-flex d-block align-items-center">
      <p class="font-m text-info pe-12 text-nowrap mb-4 mb-lg-0">快速搜尋</p>
      <Categories></Categories>
    </div>
    <!-- Body -->
    <div class="container">
      <!-- Hot events -->
      <div class="mb-23">
        <div class="mb-lg-22 mb-18">
          <div class="mb-14">
            <h2 class="font-xl mb-4">熱門節目</h2>
            <p>時刻緊貼潮流，為您帶來最豐富的節目體驗。</p>
          </div>
          <SwiperHotEvents :hot-events="hotEventsSlides"></SwiperHotEvents>
        </div>
        <!-- Hot events cards -->
        <div class="row mb-16">
          <div
            v-for="event in hotEventsCards"
            :key="event.id"
            class="col-lg-3 col-6"
          >
            <EventCard
              :title="event.title"
              :image="event.imageUrl"
              :date-time="event.dateTime"
              :tag="event.tag"
            ></EventCard>
          </div>
        </div>
        <div class="text-center">
          <button
            class="btn btn-lg btn-outline-primary px-22 py-2 w-100 w-lg-auto"
          >
            更多節目
          </button>
        </div>
      </div>
    </div>
    <!-- New events -->
    <div class="mb-23">
      <!-- New event banner -->
      <a href="#" class="position-relative mb-19">
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
            <h2 class="mb-8 font-2xl text-white">夏日序曲 — 莫扎特的交響樂</h2>
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
            <button class="btn btn-primary btn-lg px-10">搶先購票</button>
          </div>
        </span>
      </a>
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
            class="col-lg-3 col-6"
          >
            <EventCard
              :title="event.title"
              :image="event.imageUrl"
              :date-time="event.dateTime"
              :tag="event.tag"
            ></EventCard>
          </div>
        </div>
        <div class="text-center">
          <button
            class="btn btn-lg btn-outline-primary px-22 py-2 w-100 w-lg-auto"
          >
            更多節目
          </button>
        </div>
      </div>
    </div>
    <!-- Recommendation -->
    <div class="mb-23 container">
      <div class="mb-19">
        <h2 class="font-xl mb-4">獨家推薦</h2>
        <p>各界知名藝評人為您推薦最高質的節目。</p>
      </div>
      <div class="mb-16">
        <ArticleCard v-for="n in 4" :key="n" class="mb-10"></ArticleCard>
      </div>
      <div class="text-center">
        <button
          class="btn btn-lg btn-outline-primary px-22 py-2 w-100 w-lg-auto"
        >
          更多評論
        </button>
      </div>
    </div>
    <!-- Footer banner -->
    <div class="footer-banner d-flex justify-content-center align-items-center">
      <div class="row justify-content-center">
        <h3 class="text-white font-2xl text-center mb-10 fw-normal lh-base">
          訂閱最新消息 <br />
          率先享受最新節目
        </h3>
        <div class="row justify-content-center">
          <div class="col-md-8 col-10">
            <div class="input-group input-group-lg mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="您的電郵"
                aria-label="您的電郵"
                aria-describedby="button-addon2"
              />
              <button
                id="subscribe"
                class="btn btn-outline-secondary"
                type="button"
              >
                訂閱
              </button>
            </div>
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
import ArticleCard from '@/components/user/article/ArticleCard.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    Categories,
    EventCard,
    SwiperHotEvents,
    ArticleCard,
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
      console.log(error)
      return {
        error,
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
    // Error handling
    if (this.err) {
      alert('載入資料失敗')
    }
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool',
    })
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
</style>
