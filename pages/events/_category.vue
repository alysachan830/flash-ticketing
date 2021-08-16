<template>
  <div>
    <!-- Event cards -->
    <client-only>
      <div class="row mb-19">
        <div
          v-for="event in filterList"
          :key="event.id"
          class="col-lg-3 col-md-4 col-6"
        >
          <EventCard
            :id="event.id"
            :title="event.title"
            :image="event.imageUrl"
            :date-time="event.dateTime"
            :tag="event.tag"
          />
        </div>
        <div v-if="filterList.length === 0">沒有符合搜尋的結果</div>
      </div>
    </client-only>
    <!-- Pagination -->
    <div class="d-flex justify-content-center mb-19">
      <Pagination :total-pages="Math.ceil(totalEvents / 12)" />
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/user/EventCard.vue'
import Pagination from '@/components/common/Pagination.vue'

export default {
  components: {
    EventCard,
    Pagination,
  },
  props: {
    allEvents: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      totalEvents: 0,
    }
  },
  computed: {
    filterList() {
      const currentRoute = this.$route.params.category
      let list
      switch (currentRoute) {
        case 'all': {
          list = this.allEvents
          break
        }
        case 'art': {
          list = this.allEvents.filter((event) => event.category === '藝術展覽')
          break
        }
        case 'dance': {
          list = this.allEvents.filter((event) => event.category === '舞蹈')
          break
        }
        case 'music': {
          list = this.allEvents.filter((event) => event.category === '音樂')
          break
        }
        case 'workshop': {
          list = this.allEvents.filter((event) => event.category === '工作坊')
          break
        }
        default: {
          list = this.allEvents
          break
        }
      }
      this.updatePageNum(list.length)
      return list.slice(
        (this.currentPage - 1) * 12,
        (this.currentPage - 1) * 12 + 12
      )
    },
  },
  created() {
    this.$nuxt.$on('clickPageNum', (n) => {
      this.currentPage = n
    })
    this.$bus.$on('clearPageNum', () => {
      this.currentPage = 1
    })
  },
  methods: {
    updatePageNum(n) {
      this.$nextTick().then(() => (this.totalEvents = n))
    },
  },
}
</script>
