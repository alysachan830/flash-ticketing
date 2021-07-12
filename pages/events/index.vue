<template>
  <div>
    <!-- Event cards -->
    <client-only>
      <div class="row mb-19">
        <div
          v-for="event in displayedEvents"
          :key="event.id"
          class="col-lg-3 col-md-4 col-6"
        >
          <EventCard
            :title="event.title"
            :image="event.imageUrl"
            :date-time="event.dateTime"
            :tag="event.tag"
          ></EventCard>
        </div>
      </div>
    </client-only>
    <!-- Pagination -->
    <div class="d-flex justify-content-center mb-19">
      <Pagination :total-pages="Math.ceil(allEvents.length / 12)"></Pagination>
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
      displayedEvents: [],
    }
  },
  methods: {
    // changePageNum(pageNum) {
    //   console.log('--- in parent ---')
    //   console.log(pageNum)
    // },
  },
  // computed: {
  //   visibleEvents() {
  //     this.allEvents.slice(
  //       (this.currentPage - 1) * 8,
  //       (this.currentPage - 1) * 8 + 8
  //     )
  //   },
  // },
  watch: {
    allEvents() {
      this.displayedEvents = this.allEvents.slice(
        (this.currentPage - 1) * 12,
        (this.currentPage - 1) * 12 + 12
      )
    },
  },
  created() {
    this.$nuxt.$on('clickPageNum', (n) => {
      console.log('-----from parent----')
      console.log(n)
    })
  },
}
</script>

<style></style>
