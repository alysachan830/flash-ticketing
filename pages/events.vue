<template>
  <div class="pt-18">
    <div class="position-relative">
      <div class="top-banner-wrap position-relative">
        <div class="filter--dark top-banner bg-img"></div>
        <div class="position-absolute top-banner-title text-white text-center">
          <h2 class="mb-8 font-2xl">機械人與數碼龐克</h2>
          <div class="mb-12 d-flex justify-content-center">
            <p class="me-3">
              <span
                class="material-icons align-text-top me-1 text-white font-base"
              >
                calendar_today
              </span>
              2021-07-31 — 2021-08-31
            </p>
            <p>
              <span
                class="material-icons align-text-top me-1 text-white font-base"
              >
                location_on
              </span>
              香港動漫電競中心展覽廳
            </p>
          </div>
          <button class="btn btn-primary btn-lg px-10">搶先購票</button>
        </div>
      </div>

      <!-- Advance search -->
      <div ref="advancedSearch" class="advanced-search mb-16 shadow-sm">
        <div class="container">
          <button
            class="
              advanced-search-btn
              btn
              text-info
              font-s
              px-0
              py-6
              d-block
              w-100
              text-start
            "
            data-bs-toggle="collapse"
            data-bs-target="#advancedSearch"
            @click="searchIsActive = !searchIsActive"
          >
            進階搜尋
            <span class="material-icons">
              {{ searchIsActive ? 'expand_less' : 'expand_more' }}
            </span>
          </button>

          <!-- Collapse body -->
          <div
            id="advancedSearch"
            class="collapse mt-4 pb-6"
            @click="stopPropagation"
          >
            <div class="row">
              <div class="col-lg-4 col-md-5 col-4">
                <select v-model="searchPrice" class="form-select">
                  <option value="all">全部</option>
                  <option value="free">免費</option>
                  <option value="under100">$100以內</option>
                  <option value="100to500">$100 - $500</option>
                  <option value="500up">$500以上</option>
                </select>
              </div>
              <div class="col-lg-4 col-md-5 col-4">
                <select v-model="searchTag" class="form-select">
                  <option value="all">全部</option>
                  <option value="hottest">最熱門節目</option>
                  <option value="newest">最新節目</option>
                </select>
              </div>
              <div class="col-md-2 col-4 offset-lg-2">
                <button class="btn btn-primary w-100" @click="filterResult">
                  搜尋
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <Categories class="mb-19"></Categories>
      <div class="row">
        <div class="col-lg-6 col-md-4 col-12">
          <div class="input-group mb-10">
            <span
              id="basic-addon1"
              class="
                bg-transparent
                input-group-text
                material-icons
                font-m
                text-info
              "
            >
              search
            </span>
            <input
              type="text"
              class="form-control border-start-0"
              placeholder="活動名稱"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
      <NuxtChild :all-events="filterList" />
    </div>
  </div>
</template>

<script>
import Categories from '@/components/user/Categories.vue'
// import EventCard from '@/components/user/EventCard.vue'
// import Pagination from '@/components/common/Pagination.vue'

export default {
  components: {
    Categories,
  },
  async asyncData(context) {
    try {
      await context.store.dispatch('getAllEvents')
      const { allEvents } = context.store.getters
      return {
        allEvents,
      }
    } catch (error) {
      const errorMsg = error.message
      return {
        errorMsg,
      }
    }
  },
  data() {
    return {
      searchIsActive: false,
      searchPrice: 'all',
      searchTag: 'all',
      filterList: [],
    }
  },
  watch: {
    $route() {
      this.searchPrice = 'all'
      this.searchTag = 'all'
      this.filterList = this.allEvents
    },
  },
  mounted() {
    // Error handling
    if (this.errorMsg) {
      this.$showError('載入資料失敗')
      // eslint-disable-next-line no-console
      console.error(this.errorMsg)
    }

    // this.filterList = [...this.allEvents]
    this.filterList = this.allEvents
    window.addEventListener('scroll', this.advancedSearchStyle)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.advancedSearchStyle)
  },
  methods: {
    advancedSearchStyle() {
      if (window.scrollY > 388) {
        this.$refs.advancedSearch.style.position = 'fixed'
        this.$refs.advancedSearch.style.top = '64px'
        this.$refs.advancedSearch.style.width = '100%'
        this.$refs.advancedSearch.style['z-index'] = 2
      } else {
        this.$refs.advancedSearch.style.position = 'relative'
        this.$refs.advancedSearch.style.top = '0px'
        this.$refs.advancedSearch.style.width = 'auto'
        this.$refs.advancedSearch.style['z-index'] = 1
      }
    },
    stopPropagation(e) {
      console.log('o')
      e.stopPropagation()
    },
    filterResult() {
      const checkPriceType = (event) => {
        if (typeof event.ticketPrice !== 'number') {
          const priceList = Object.values(event.ticketPrice)
          return priceList.some((price) => checkPrice(price))
        }
        return checkPrice(event.ticketPrice)
      }

      const checkPrice = (price) => {
        switch (this.searchPrice) {
          case 'free':
            return price === 0
          case 'under100':
            return price < 100
          case '100to500':
            return price >= 100 && price <= 500
          case '500up':
            return price >= 500
        }
      }

      if (this.searchPrice === 'all' && this.searchTag === 'all') {
        // return (this.filterList = [...this.allEvents])
        return (this.filterList = this.allEvents)
      } else if (this.searchPrice === 'all') {
        const result = this.allEvents.filter(
          (event) => event.tag === this.searchTag
        )
        return (this.filterList = result)
      } else if (this.searchTag === 'all') {
        const result = (this.filterList = this.allEvents.filter(checkPriceType))
        return (this.filterList = result)
      } else {
        const result = this.allEvents
          .filter((event) => event.tag === this.searchTag)
          .filter(checkPriceType)
        return (this.filterList = result)
      }
    },
  },
}
</script>

<style class="scss" scoped>
.top-banner-wrap {
  height: 388px;
}

.top-banner {
  background-image: url('@/assets/images/c-robynne-hu-HOrhCnQsxnQ-unsplash.jpg');
  height: 388px;
}

.top-banner-title {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.advanced-search {
  background: #fafafa;
}

.advanced-search-btn-wrap {
  top: 0;
  z-index: 2;
}

.advanced-search-btn:focus {
  box-shadow: none !important;
}
</style>
