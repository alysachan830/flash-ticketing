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
            :title="event.title"
            :image="event.imageUrl"
            :date-time="event.dateTime"
            :tag="event.tag"
          ></EventCard>
        </div>
        <div v-if="filterList.length === 0">沒有符合搜尋的結果</div>
      </div>
    </client-only>
    <!-- Pagination -->
    <div class="d-flex justify-content-center mb-19">
      <Pagination></Pagination>
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
  computed: {
    filterList() {
      const currentRoute = this.$route.params.category
      let list
      switch (currentRoute) {
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
      }
      return list
    },
  },
}
</script>

<style class="scss" scoped></style>
