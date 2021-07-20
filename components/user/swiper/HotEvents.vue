<template>
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
          class="slide-img-bg hover__filter--darken rounded-4"
          :style="`background-image:url(${event.imageUrl})`"
        >
        </NuxtLink>
        <div class="slide-title-wrap position-absolute">
          <span class="badge font-s bg-secondary text-black mb-4">
            {{ event.category }}
          </span>
          <h2 class="font-xl text-white">{{ event.title }}</h2>
        </div>
      </div>
      <!-- <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div> -->
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
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
      img1: `background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/flashticketing/1625173434912.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=da8BPRMDF5JnemX4M5y5mBwKq1vDshpwDkoT01dU5RwXUTyMoacAlk5j9PH7O2kkGBJRVMFQFn0YlEs5NNIEB9zTiKgvz30%2BXJhY1M4PVNKrJcErhKNHUNhlKFijNOEVflBHAeTWvhjMWrQvCa11pdgvTpKzlqQqtdo5B4dUk0C4OL4tGG7ULJ%2FFJDjXCiR5DrpL7wgYvZUj6ByyTD1FLOfsQuBmS%2FpzAl9MuwgQKFaaLywSijBjjaIhieIJ%2Bv5CnJZPI0Iv8IIndeJAFzbxvsCsPclptlTe%2Fy5Hl%2F8vXVr6lM6yUcdGgSN%2B2i%2B14YE2Z4Sbh6mjE37XLmm2KC1%2BGA%3D%3D')`,
    }
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container', {
      observer: true,
      observeParents: true,
      // slidesPerView: 1.5,
      // loop: true,
      // loopedSlides: 8,
      spaceBetween: 30,
      // centeredSlides: true,
      autoplay: {
        delay: 2500,
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
      // on: {
      //   autoplay() {
      //     vm.$bus.$emit("triggerAnimation");
      //   },
      // },
      // onProgress: this.$bus.$emit("triggerAnimation"),
      // onProgress: console.log("123"),
    })
  },
}
</script>

<style lang="scss" scoped>
@import '@/node_modules/swiper/swiper-bundle.css';

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
