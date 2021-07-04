<template>
  <div>
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
      <div class="position-absolute top-banner-title text-white text-center">
        <h2 class="mb-8 font-2xl">亞洲年度新媒體藝術節 2021</h2>
        <div class="mb-12 d-flex justify-content-center">
          <p class="me-3">
            <span
              class="material-icons align-text-top me-1 text-white font-base"
            >
              calendar_today
            </span>
            06-15 — 07-15
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
    <div class="container mb-18 pt-15 d-flex align-items-center">
      <p class="font-m text-info pe-12 text-nowrap">快速搜尋</p>
      <div class="d-flex w-100">
        <NuxtLink
          to="/events"
          class="
            quick-search
            text-center text-info
            shadow-sm
            rounded-2
            px-5
            py-3
            me-6
            w-auto
          "
        >
          <span class="text-info align-top material-icons"> palette </span>
          藝術展覽</NuxtLink
        >
        <NuxtLink
          to="/events"
          class="
            quick-search
            text-center text-info
            shadow-sm
            rounded-2
            px-5
            py-3
            me-6
            w-auto
          "
        >
          <span class="text-info align-top material-icons"> music_note </span>
          音樂</NuxtLink
        >

        <NuxtLink
          to="/events"
          class="
            quick-search
            text-center text-info
            shadow-sm
            rounded-2
            px-5
            py-3
            me-6
            w-auto
          "
          ><span class="me-2 text-info align-top material-icons">
            theater_comedy </span
          >舞蹈</NuxtLink
        >
        <NuxtLink
          to="/events"
          class="
            quick-search
            text-center text-info
            shadow-sm
            rounded-2
            px-5
            py-3
            me-6
            w-auto
          "
        >
          <span class="me-1 text-info align-top material-icons"> work </span>
          工作坊</NuxtLink
        >
      </div>
    </div>
    <!-- Body -->
    <div class="container">
      <!-- Hot events -->
      <div class="mb-19">
        <div class="mb-14">
          <h2 class="font-xl mb-4">熱門節目</h2>
          <p>時刻緊貼潮流，為您帶來最豐富的節目體驗。</p>
        </div>
        <SwiperHotEvents :hot-events="hotEvents"></SwiperHotEvents>
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

.quick-search {
  flex-basis: 160px;
  // background: #f7f7f7;
  transition: background 0.3s;

  &:hover {
    background: darken(#f7f7f7, 5%);
  }
}
</style>
