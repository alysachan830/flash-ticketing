<template>
  <div class="pt-23">
    <div class="container">
      <div class="row mb-lg-23 mb-md-18 mb-14">
        <div class="col-lg-8 mb-10 mb-lg-0">
          <img class="rounded-4" :src="eventInfo.imageUrl" alt="event image" />
        </div>
        <div class="col-lg-3 offset-lg-1">
          <div class="d-flex justify-content-between mb-6">
            <span class="badge font-lg-s font-xs bg-secondary text-black mb-4">
              藝術展覽
            </span>
            <ul class="d-flex">
              <li>
                <a href="#">
                  <span class="me-2 text-info material-icons">
                    bookmark_border
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="text-info material-icons"> share </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="mb-15">
            <h2 class="mb-6">{{ eventInfo.title }}</h2>
            <p>{{ eventInfo.organizer }}</p>
          </div>
          <ul class="mb-15">
            <li class="d-flex mb-6">
              <span class="text-primary material-icons font-m me-4">
                calendar_today
              </span>
              <ul>
                <li>
                  {{ eventInfo.dateTime.startTime }} -
                  {{ eventInfo.dateTime.endTime }}
                </li>
              </ul>
            </li>
            <li class="d-flex mb-6">
              <span class="text-primary material-icons font-m me-4">
                location_on
              </span>
              <p>{{ eventInfo.venue }}</p>
            </li>
            <li class="d-flex mb-6">
              <span class="text-primary material-icons font-m me-4">
                paid
              </span>
              <ul v-html="ticketPriceFormat"></ul>
            </li>
            <li
              v-if="eventInfo.discount > 0 && eventInfo.ticketPrice !== 0"
              class="d-flex"
            >
              <span class="text-primary material-icons font-m me-4">
                local_offer
              </span>

              優惠票可享有 {{ eventInfo.discount }}% 折扣
            </li>
          </ul>
        </div>
      </div>
      <div class="mb-15">
        <h3 class="font-l mb-6">選擇時段、座位與票種</h3>
        <p class="text-muted mb-2 font-s">*優惠票適用於學生、長者、殘疾人士</p>
      </div>

      <div class="row">
        <div
          v-for="(item, i) in ticketInfoFormat"
          :key="i"
          class="ticket rounded-3 col-6 col-md-4 col-lg-3 mb-6"
        >
          <TicketCard :item="item"></TicketCard>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <!-- <Pagination class="mb-17"></Pagination> -->
      </div>
      <!-- Add to cart -->
      <div class="row justify-content-center mb-21">
        <div class="col-4">
          <button class="btn btn-primary w-100 py-4">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClientGetEvent } from '@/api/index'
import TicketCard from '@/components/user/ticket/TicketCard.vue'

export default {
  components: {
    TicketCard,
  },
  middleware: 'ticket',
  async asyncData({ params }) {
    try {
      const eventId = params.eventId
      const eventRes = await apiClientGetEvent(eventId)
      const eventInfo = eventRes.data.product
      return { eventId, eventInfo }
    } catch (error) {
      const errorMsg = error.message
      return {
        errorMsg,
      }
    }
  },
  data() {
    return {
      inputDateTime: '',
      inputTicketType: '正價票',
      inputSeat: 'A區',
      tempCart: {},
      ticketInfoFormat: [],
      allTicketInfoFormat: [],
    }
  },
  computed: {
    dateTimeFormat() {
      return `${this.eventInfo.dateTime.start} - ${this.eventInfo.dateTime.end}`
    },
    ticketPriceFormat() {
      if (typeof this.eventInfo.ticketPrice === 'object') {
        return Object.keys(this.eventInfo.ticketPrice).reduce(
          (acc, curr) =>
            `${acc}<li>${curr}區：$${this.eventInfo.ticketPrice[curr]}</li>`,
          ``
        )
      } else {
        return this.eventInfo.ticketPrice === 0
          ? `<li>免費</li>`
          : `<li>$${this.eventInfo.ticketPrice}</li>`
      }
    },
  },
  created() {
    let allTickets
    if (this.eventInfo.ticketPrice !== 0) {
      allTickets = Object.keys(this.eventInfo.ticketPrice).map((zone) => {
        if (Array.isArray(this.eventInfo.dateTime)) {
          return this.eventInfo.dateTime
            .map((dateTime) => {
              return {
                zone: `${zone}區`,
                price: this.eventInfo.ticketPrice[zone],
                ticketType: '正價票',
                id: `${dateTime.date},${dateTime.startTime}-${dateTime.endTime},${zone}區,正價票`,
                ...dateTime,
              }
            })
            .flat()
        } else {
          return {
            zone: `${zone}區`,
            price: this.eventInfo.ticketPrice[zone],
            ticketType: '正價票',
            id: `${this.eventInfo.dateTime.start}-${this.eventInfo.dateTime.end},${this.eventInfo.dateTime.startTime}-${this.eventInfo.dateTime.endTime},${zone}區,正價票`,
            ...this.eventInfo.dateTime,
          }
        }
      })

      if (this.eventInfo.discount > 0) {
        const allDiscountTickets = JSON.parse(JSON.stringify(allTickets)).map(
          (ticket) => {
            ticket.price = ticket.price * (this.eventInfo.discount / 100)
            ticket.ticketType = '優惠票'
            ticket.id = `${ticket.id.split(',').slice(0, 3).join(',')},優惠票`
            return ticket
          }
        )
        allTickets = [...allTickets, ...allDiscountTickets]
      }
    } else {
      allTickets = [
        {
          zone: '不適用',
          price: '免費',
          ticketType: '不適用',
          id: this.eventId,
          ...this.eventInfo.dateTime,
        },
      ]
    }

    // Copy the result since it will be reused in searching function
    this.ticketInfoFormat = allTickets
    this.allTicketInfoFormat = [...this.ticketInfoFormat]

    // Set default of inputDateTime
    // this.inputDateTime = `${this.allTicketInfoFormat[0].date} ${this.allTicketInfoFormat[0].startTime}-${this.allTicketInfoFormat[0].endTime}`

    // Listen for emit
    this.$nuxt.$on('clickAdd', (id) => {
      // if (process.server) return
      if (this.tempCart[id] === undefined) {
        this.tempCart[id] = 1
      } else {
        this.tempCart[id] += 1
      }
    })

    this.$nuxt.$on('clickRemove', (id) => {
      // if (process.server) return
      this.tempCart[id] -= 1
      if (this.tempCart[id] === 0) {
        delete this.tempCart[id]
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.ticket {
  transition: 0.3s filter;
  &:hover {
    filter: drop-shadow(2px 4px 3px #e0e0e0);
  }
}
</style>
