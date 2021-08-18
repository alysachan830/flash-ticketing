<template>
  <NuxtLink :to="`/event/${id}`" class="card h-100 border-0 pb-22">
    <div class="img-wrap rounded-4 mb-4">
      <img
        :src="image"
        class="hover__filter--darken h-100 w-100 position-absolute"
        alt="event image"
      />
    </div>
    <div class="card-body px-1">
      <div class="d-flex justify-content-between">
        <div>
          <h5 class="card-title font-lg-m font-base mb-6">
            {{ title }}
          </h5>
        </div>
        <span
          class="favourite-icon material-icons font-lg-l font-m align-baseline"
          :class="{ 'text-primary': isFavourite }"
          @click.prevent="addFavourite(id)"
        >
          {{ isFavourite ? 'bookmark' : 'bookmark_border' }}
        </span>
      </div>
    </div>
    <div class="px-1 d-flex justify-content-between align-items-start">
      <p class="mb-1 d-flex">
        <span class="font-base material-icons align-text-top me-3 pt-1">
          calendar_today
        </span>
        <!-- The ESLint waringing is disabled here since the HTML injected here is safe -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span class="date-time" v-html="dateTimeTemplate"> </span>
      </p>
      <span class="badge font-lg-s font-xs bg-secondary text-black">
        {{ formatTag }}
      </span>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    dateTime: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      dateTimeTemplate: '',
      myFavouriteItems: [],
    }
  },
  computed: {
    isFavourite() {
      return this.myFavouriteItems.includes(this.id)
    },
    formatTag() {
      let tagZh
      if (this.tag === 'hottest') {
        tagZh = '最熱門'
      }
      if (this.tag === 'newest') {
        tagZh = '最新'
      }
      return tagZh
    },
  },
  mounted() {
    this.$bus.$on(
      'getFavourite',
      () => (this.myFavouriteItems = this.$getFavourite())
    )
    this.myFavouriteItems = this.$getFavourite()
    if (Array.isArray(this.dateTime)) {
      this.dateTimeTemplate = `${this.dateTime[0].date} - <br>${
        this.dateTime[this.dateTime.length - 1].date
      }`
    } else {
      this.dateTimeTemplate = `${this.dateTime.start} - <br>${this.dateTime.end}`
    }
  },
  methods: {
    addFavourite(id) {
      this.$addFavourite(id)
      // refresh my favourite items data
      this.$nextTick().then(
        () => (this.myFavouriteItems = this.$getFavourite())
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.card {
  &:hover {
    color: inherit !important;
  }
}

.img-wrap {
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;

  img {
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.1);
    }
  }
}

.favourite-icon {
  cursor: pointer;
  &:hover {
    color: $primary;
  }
}
</style>
