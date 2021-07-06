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
            2021-06-15 — 2021-07-15
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
          <SwiperHotEvents :hot-events="hotEvents"></SwiperHotEvents>
        </div>
        <!-- Hot events cards -->
        <div class="row mb-16">
          <div v-for="n in 8" :key="n" class="col-lg-3 col-6">
            <EventCard></EventCard>
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
            <h2 class="mb-8 font-2xl text-white">
              夏日狂想曲 —— 莫扎特的交響樂
            </h2>
            <div class="mb-12">
              <p class="me-3 text-white font-l">
                <span class="material-icons align-text-top me-1 font-l me-3">
                  calendar_today
                </span>
                2021-09-15
              </p>
              <p class="text-white font-l">
                <span class="material-icons align-text-top me-1 font-l me-3">
                  location_on
                </span>
                文化與藝術協會中心音樂廳
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
          <div v-for="n in 8" :key="n" class="col-lg-3 col-6">
            <EventCard></EventCard>
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
      <articleCard v-for="n in 4" :key="n" class="mb-10"></articleCard>
      <div class="text-center mt-8">
        <button class="btn btn-lg btn-outline-primary px-16">更多評論</button>
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
          <div class="col-8">
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
// import axios from 'axios'
import { apiClientGetProduct } from '../api/index'
export default {
  async asyncData({ env }) {
    try {
      const eventsRes = await apiClientGetProduct()
      const events = eventsRes.data.products
      return {
        events,
      }
    } catch (err) {
      console.log(err)
      return {
        err,
      }
    }
  },
  computed: {
    hotEvents() {
      const hotEvents = this.events.filter((event) => event.tag === 'hottest')
      return hotEvents
    },
  },
  mounted() {
    // Error handling
    if (this.err) {
      alert('載入資料失敗')
    }
    console.log(this.events)
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.top-banner {
  background-image: url('@/assets/images/brandon-erlinger-ford-wI2Hafqr_f4-unsplash.jpg');
  // background: center / cover no-repeat
  //   url('@/assets/images/brandon-erlinger-ford-wI2Hafqr_f4-unsplash.jpg');
  height: 388px;
}

.top-banner-title {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// .quick-search {
//   flex-basis: 160px;
//   // background: #f7f7f7;
//   transition: background 0.3s;

//   &:hover {
//     background: darken(#f7f7f7, 5%);
//   }
// }

// .card {
//   &-img-top {
//     min-height: calc(
//       #{map-get($container-max-widths, 'xxl')} / 4 - #{$grid-gutter-width} * 3
//     );
//   }
//   &-body {
//     padding: 0 4px;
//   }
// }

.latest-event-banner {
  background-image: url('@/assets/images/arindam-mahanta-VEOk8qUl9DU-unsplash.jpg');
  background-position: bottom;
  height: 720px;
  filter: brightness(0.6);
}

.latest-event-title {
  top: 50%;
  left: 50%;
  // margin: 0 auto;
  // top: 50%;
  transform: translate(-50%, -50%);

  // @include media-breakpoint-up(lg) {
  //   left: 118px;
  //   transform: translate(-50%, 0);
  // }
}

.footer-banner {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    center / cover no-repeat
      url('@/assets/images/alexander-popov-endMHm-S3d8-unsplash.jpg');
  // center / contain no-repeat url("../../media/examples/firefox-logo.svg"),
  //           #eee 35% url("../../media/examples/lizard.png");
  height: 520px;
  // filter: brightness(0.8);
}
</style>
