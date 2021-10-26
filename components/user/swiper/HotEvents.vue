<template>
  <div>
    <div>
      <!-- Slider main container -->
      <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div
            v-for="event in hotEvents"
            :key="event.title"
            class="swiper-slide position-relative"
          >
            <NuxtLink
              :to="`/event/${event.id}`"
              class="slide-img-bg hover__filter--darken rounded-4 skeleton-bg"
              :style="`background-image: url('${event.imageUrl}')`"
            />
            <div class="slide-title-wrap position-absolute">
              <span class="badge font-s bg-secondary text-black mb-4">
                {{ event.category }}
              </span>
              <h2 class="font-xl text-white">{{ event.title }}</h2>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, {
  Autoplay,
  Navigation,
  Pagination,
} from '@/node_modules/swiper/core'

Swiper.use([Autoplay, Navigation, Pagination])

export default {
  props: {
    hotEvents: {
      type: Array,
      default() {
        return []
      },
      require: true,
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
          slidesPerView: 1,
        },

        992: {
          slidesPerView: 1.5,
        },
      },
    })
  },
}
</script>

<style lang="scss" scoped>
@import '@/node_modules/swiper/swiper-bundle.css';
@import '@/assets/stylesheets/all.scss';

.slide-img-bg {
  height: 382px;
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
}

.swiper-button-next {
  margin-right: 20px;
}

.swiper-button-prev {
  margin-left: 20px;
}
</style>
