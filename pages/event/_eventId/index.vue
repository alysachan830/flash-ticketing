<template>
  <div class="pt-23">
    <div class="container mb-lg-23 mb-21">
      <!-- Event information -->
      <div class="mb-lg-23 mb-21">
        <div class="row">
          <div class="col-lg-6 col-12">
            <div
              class="main-image bg-img rounded-4 mb-7"
              :style="`background-image: url(${eventInfo.imageUrl});`"
            ></div>
            <div class="row">
              <div class="col-6">
                <div
                  class="sub-image bg-img rounded-4 mb-7"
                  :style="`background-image: url(${eventInfo.imagesUrl[0]});`"
                ></div>
              </div>
              <div class="col-6">
                <div
                  class="sub-image bg-img rounded-4 mb-7"
                  :style="`background-image: url(${eventInfo.imagesUrl[1]});`"
                ></div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1 col-12">
            <div class="mb-20">
              <div class="d-flex justify-content-between mb-11">
                <span
                  class="badge font-lg-s font-xs bg-secondary text-black mb-4"
                >
                  {{ eventInfo.category }}
                </span>
                <ul class="d-flex">
                  <li>
                    <a href="#">
                      <span class="me-2 text-info material-icons">
                        bookmark_border
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="text-info material-icons"> share </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mb-15">
                <h2 class="mb-6">{{ eventInfo.title }}</h2>
                <p>{{ eventInfo.organizer }}</p>
              </div>
              <ul class="mb-15">
                <li class="d-flex mb-6">
                  <span class="text-primary material-icons font-m me-4">
                    calendar_today
                  </span>
                  <ul>
                    <li>{{ dateTimeFormat }}</li>
                    <li v-if="!Array.isArray(eventInfo.dateTime)">
                      {{ eventInfo.dateTime.startTime }} -
                      {{ eventInfo.dateTime.endTime }}
                    </li>
                  </ul>
                </li>
                <li class="d-flex mb-6">
                  <span class="text-primary material-icons font-m me-4">
                    location_on
                  </span>
                  <p>{{ eventInfo.venue }}</p>
                </li>
                <li class="d-flex mb-6">
                  <span class="text-primary material-icons font-m me-4">
                    paid
                  </span>
                  <ul v-html="ticketPriceFormat"></ul>
                </li>
                <li
                  v-if="eventInfo.discount > 0 && eventInfo.ticketPrice !== 0"
                  class="d-flex"
                >
                  <span class="text-primary material-icons font-m me-4">
                    local_offer
                  </span>

                  優惠票可享有 {{ eventInfo.discount }}% 折扣
                </li>
              </ul>
              <NuxtLink :to="isMultipleDates" class="btn btn-primary w-100 py-4"
                >立即購票
              </NuxtLink>
            </div>
            <div class="mb-15">
              <p class="mb-8 fw-bold">節目介紹</p>
              <p>{{ eventInfo.description }}</p>
            </div>
            <div class="text-info mb-15 font-s">
              <p class="mb-8 fw-bold">入場須知</p>
              <ol>
                <li>請保持社交距離，以及佩戴口罩。</li>
                <li>
                  請於節目開始前十五分鐘進場，否則到中場休息時段才可進場。
                </li>
                <li>節目進行時，請關閉通訊設備鈴聲，以及保持安靜。</li>
                <li>場內請勿飲食。</li>
              </ol>
            </div>
            <div class="text-info font-s">
              <p class="mb-8 fw-bold">購票須知</p>
              <ol>
                <li>購票交易成功後，將不能退款。</li>
                <li>切勿轉售在此平台購買的票卷。</li>
                <li>
                  如購買優惠票（包括學生和長者票），需要在入場時向工作人員展示學生或身分證件。
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- Article -->
      <div>
        <h2 class="font-xl mb-14">獨家點評</h2>
        <!-- <articleCard></articleCard> -->
      </div>
    </div>
    <!-- Related events -->
    <div class="bg-light py-18">
      <div class="container">
        <h2 class="font-xl mb-14">更多相關節目</h2>
        <client-only>
          <SwiperRelatedEvents
            :related-events="relatedEvents"
          ></SwiperRelatedEvents>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClientGetEvent } from '@/api/index'
import SwiperRelatedEvents from '@/components/user/swiper/RelatedEvents.vue'

export default {
  components: {
    // EventCard
    SwiperRelatedEvents,
  },
  async asyncData({ params, store }) {
    try {
      const eventId = params.eventId
      const eventRes = await apiClientGetEvent(eventId)
      const eventInfo = eventRes.data.product
      await store.dispatch('getAllEvents')
      const { allEvents } = store.getters
      return { eventId, eventInfo, allEvents }
    } catch (error) {
      const errorMsg = error.message
      return {
        errorMsg,
      }
    }
  },
  data() {
    return {
      dateTimeTemplate: '',
    }
  },
  computed: {
    isMultipleDates() {
      if (Array.isArray(this.eventInfo.dateTime)) {
        return `/event/${this.eventId}/tickets`
      } else {
        return `/event/${this.eventId}/ticket`
      }
    },
    dateTimeFormat() {
      if (Array.isArray(this.eventInfo.dateTime)) {
        return this.eventInfo.dateTime.map((item) => item.date).join(', ')
      } else {
        return `${this.eventInfo.dateTime.start} - ${this.eventInfo.dateTime.end}`
      }
    },
    ticketPriceFormat() {
      if (typeof this.eventInfo.ticketPrice === 'object') {
        return Object.keys(this.eventInfo.ticketPrice).reduce(
          (acc, curr) =>
            `${acc}<li>${curr}區：$${this.eventInfo.ticketPrice[curr]}</li>`,
          ``
        )
      } else {
        return this.eventInfo.ticketPrice === 0
          ? `<li>免費</li>`
          : `<li>$${this.eventInfo.ticketPrice}</li>`
      }
    },
    relatedEvents() {
      return this.allEvents.filter(
        (event) => event.category === this.eventInfo.category
      )
    },
  },
  mounted() {
    // Error handling
    if (this.errorMsg) {
      this.$showError('載入資料失敗')
      // eslint-disable-next-line no-console
      console.error(this.errorMsg)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.main-image {
  height: 320px;

  @include media-breakpoint-up(md) {
    height: 420px;
  }

  @include media-breakpoint-up(lg) {
    height: 674px;
  }
}

.sub-image {
  height: 160px;

  @include media-breakpoint-up(md) {
    height: 240px;
  }

  @include media-breakpoint-up(lg) {
    height: 320px;
  }
}
</style>
