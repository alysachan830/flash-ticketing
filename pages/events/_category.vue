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
  // async asyncData(context) {
  //   try {
  //     await context.store.dispatch('getAllEvents')
  //     const { allEvents } = context.store.getters
  //     const currentRoute = context.params.category
  //     let list
  //     switch (currentRoute) {
  //       // case 'all': {
  //       //   const allList = this.allEvents
  //       //   this.filterEvents = [...allList]
  //       //   break
  //       // }
  //       case 'art': {
  //         list = allEvents.filter((event) => event.category === '藝術展覽')
  //         break
  //       }
  //       case 'dance': {
  //         list = allEvents.filter((event) => event.category === '舞蹈')
  //         break
  //       }
  //       case 'music': {
  //         list = allEvents.filter((event) => event.category === '音樂')
  //         break
  //       }
  //       case 'workshop': {
  //         list = allEvents.filter((event) => event.category === '工作坊')
  //         break
  //       }
  //     }
  //     return {
  //       list,
  //     }
  //   } catch (error) {
  //     const errorMsg = error.message
  //     return {
  //       errorMsg,
  //     }
  //   }
  // },

  mounted() {
    // console.log(this.allEvents)
    // Error handling
    // if (this.errorMsg) {
    //   this.$showError('載入資料失敗')
    //   // eslint-disable-next-line no-console
    //   console.error(this.errorMsg)
    // }
    // const { category } = this.$route.params.category
    // console.log(category)
    // switch (category) {
    //   case 'all': {
    //     const allList = this.allEvents
    //     this.filterEvents = [...allList]
    //     break
    //   }
    //   case 'art': {
    //     const artList = this.allEvents.filter(
    //       (event) => event.category === '藝術展覽'
    //     )
    //     this.filterEvents = [...artList]
    //     break
    //   }
    //   case 'dance': {
    //     const danceList = this.allEvents.filter(
    //       (event) => event.category === '舞蹈'
    //     )
    //     this.filterEvents = [...danceList]
    //     break
    //   }
    //   case 'music': {
    //     const musicList = this.allEvents.filter(
    //       (event) => event.category === '音樂'
    //     )
    //     this.filterEvents = [...musicList]
    //     break
    //   }
    //   case 'workshop': {
    //     const workshopList = this.allEvents.filter(
    //       (event) => event.category === '工作坊'
    //     )
    //     this.filterEvents = [...workshopList]
    //     break
    //   }
    // }
  },
  // watch: {
  //   $route(to, from) {
  //     // react to route changes...
  //     console.log(to)
  //     console.log(from)
  //   },
  // },
}
</script>

<style class="scss" scoped></style>
