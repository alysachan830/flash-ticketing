<template>
  <div>
    <!-- Event cards -->
    <client-only>
      <div class="row mb-19">
        <div
          v-for="event in allEvents"
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
}
</script>

<style></style>
