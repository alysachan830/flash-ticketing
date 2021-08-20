<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div
        v-for="event in relatedEvents"
        :key="event.id"
        class="swiper-slide position-relative"
      >
        <EventCard
          :id="event.id"
          :title="event.title"
          :image="event.imageUrl"
          :date-time="event.dateTime"
          :tag="event.tag"
          class="bg-transparent"
        />
      </div>
    </div>
    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import EventCard from '@/components/user/EventCard.vue'

import Swiper, {
  Autoplay,
  Navigation,
  Pagination,
} from '@/node_modules/swiper/core'

Swiper.use([Autoplay, Navigation, Pagination])

export default {
  components: {
    EventCard,
  },
  props: {
    relatedEvents: {
      type: Array,
      require: true,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      swiper: {},
    }
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container', {
      observer: true,
      observeParents: true,
      slidesPerView: 1.5,
      spaceBetween: 30,
      autoplay: {
        delay: 3500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
        },

        992: {
          slidesPerView: 4,
        },
      },
    })
  },
}
</script>

<style lang="scss" scoped>
@import '@/node_modules/swiper/swiper-bundle.css';
@import '@/assets/stylesheets/all';

.slide-img-bg {
  background-size: cover;
  background-position: center;
  filter: brightness(75%);
}

.slide-title-wrap {
  left: 40px;
  top: 40px;
}

.swiper-button-next,
.swiper-button-prev {
  color: #fff;
  font-size: 20px;
  top: 146px;
  @include media-breakpoint-up(md) {
    top: 106px;
  }

  @include media-breakpoint-up(xl) {
    top: 146px;
  }
}

.swiper-button-next {
  margin-right: 20px;
}

.swiper-button-prev {
  margin-left: 20px;
}
</style>
