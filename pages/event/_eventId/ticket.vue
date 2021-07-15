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
                <li>{{ dateTimeFormat }}</li>
                <li v-if="!Array.isArray(eventInfo.dateTime)">
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
      <div class="d-flex justify-content-between mb-15">
        <h3 class="font-l">選擇時段、座位與票種</h3>
        <button class="btn btn-outline-primary">查看座位區域劃分</button>
      </div>
      <p class="text-muted mb-2 font-s">*優惠票適用於學生、長者、殘疾人士</p>
      <!-- Selects -->
      <div class="bg-secondary p-12 rounded-4 mb-md-21 mb-16">
        <div class="row align-items-end">
          <div class="col-lg-3 mb-lg-0 mb-4">
            <label for="dateTime" class="mb-2">節目時段</label>
            <select
              id="dateTime"
              v-model="inputDateTime"
              class="form-select form-select-lg"
            >
              <option
                v-for="dateTime in eventInfo.dateTime"
                :key="dateTime.timestamp"
                :value="`${dateTime.date} ${dateTime.startTime}-${dateTime.endTime}`"
              >
                {{ dateTime.date }} {{ dateTime.startTime }} -
                {{ dateTime.endTime }}
              </option>
            </select>
          </div>
          <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
            <label for="ticketType" class="mb-2">票種</label>
            <select
              id="ticketType"
              v-model="inputTicketType"
              class="form-select form-select-lg"
            >
              <option value="正價票">正價票</option>
              <option v-if="eventInfo.discount > 0" value="優惠票">
                優惠票
              </option>
            </select>
          </div>
          <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
            <label for="seating" class="mb-2">座位區域</label>
            <select
              id="seating"
              v-model="inputSeat"
              class="form-select form-select-lg"
            >
              <option
                v-for="zone in Object.keys(eventInfo.ticketPrice)"
                :key="zone"
                :value="`${zone}區`"
              >
                {{ zone }}區
              </option>
            </select>
          </div>
          <div class="col-3 w-md-auto w-100">
            <button
              class="btn btn-lg btn-primary mt-8 w-md-auto w-100 me-6"
              @click="searchTicket"
            >
              搜尋
            </button>
            <button
              class="btn btn-lg btn-outline-primary mt-8 w-md-auto w-100"
              @click="clearSearch"
            >
              清除搜尋
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <!-- <table class="table mb-6 table-hover">
        <thead>
          <tr>
            <th scope="col">節目時段</th>
            <th scope="col">座位區域</th>
            <th scope="col">票種</th>
            <th scope="col">價錢</th>
            <th scope="col">數量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n">
            <td>2021-06-06 8:00 p.m</td>
            <td>A區</td>
            <td>正價票</td>
            <td>HKD 120</td>
            <td>
              <div class="d-flex">
                <a href="#"
                  ><span class="font-base material-icons"> add </span></a
                >
                <span class="mx-6">1</span>
                <a href="#"
                  ><span class="font-base material-icons"> remove </span></a
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table> -->
      <div class="row">
        <div
          v-for="(item, i) in ticketInfoFormat"
          :key="i"
          class="ticket rounded-3 col-6 col-md-4 col-lg-3 mb-6"
        >
          <TicketCard :item="item"></TicketCard>
          <!-- <ul class="bg-light p-8 rounded-top">
            <li class="d-flex justify-content-between pb-6">
              <p>{{ item.zone }}</p>
              <p class="font-lg-xl font-l">${{ item.price }}</p>
            </li>
            <li class="pb-6">
              <p class="text-info font-s mb-1">節目時段</p>
              <p>{{ item.date }}</p>
              <p>{{ item.startTime }} - {{ item.endTime }}</p>
            </li>
          </ul>
          <div
            class="
              ticket-quantity
              px-8
              py-4
              d-flex
              justify-content-between
              rounded-bottom
            "
          >
            <a
              href="#"
              :class="`${item.date}${item.price}${item.zone}`"
              @click.prevent="addCart"
            >
              <span
                :class="[
                  `${item.date}${item.price}${item.zone}`,
                  'material-icons',
                ]"
              >
                add
              </span>
            </a>
            <span :id="`${item.date}${item.price}${item.zone}`">0</span>
            <a
              href="#"
              :class="`${item.date}${item.price}${item.zone}`"
              @click.prevent="removeCart"
              ><span
                :class="[
                  `${item.date}${item.price}${item.zone}`,
                  'material-icons',
                ]"
              >
                remove
              </span></a
            >
          </div> -->
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <Pagination class="mb-17"></Pagination>
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
  async asyncData({ params, store }) {
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
      if (Array.isArray(this.eventInfo.dateTime)) {
        return this.eventInfo.dateTime.map((item) => item.date).join(', ')
      } else {
        return `${this.eventInfo.dateTime.start} - ${this.eventInfo.dateTime.end}`
      }
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
    // ticketInfoFormat() {
    //   return Object.keys(this.eventInfo.ticketPrice)
    //     .map((zone) => {
    //       return this.eventInfo.dateTime.map((dateTime) => {
    //         return {
    //           zone,
    //           price: this.eventInfo.ticketPrice[zone],
    //           ...dateTime,
    //         }
    //       })
    //     })
    //     .flat()
    // },
  },
  created() {
    let allTickets = Object.keys(this.eventInfo.ticketPrice)
      .map((zone) => {
        return this.eventInfo.dateTime.map((dateTime) => {
          return {
            zone: `${zone}區`,
            price: this.eventInfo.ticketPrice[zone],
            ticketType: '正價票',
            id: `${dateTime.date},${dateTime.startTime}-${
              dateTime.endTime
            },${'正價票'}`,
            ...dateTime,
          }
        })
      })
      .flat()

    if (this.eventInfo.discount > 0) {
      // const allDiscountTickets = JSON.parse(JSON.stringify(allTickets))
      const allDiscountTickets = JSON.parse(JSON.stringify(allTickets)).map(
        (ticket) => {
          ticket.price = ticket.price * (this.eventInfo.discount / 100)
          ticket.ticketType = '優惠票'
          ticket.id = `${ticket.id.split(',').slice(0, 2).join(',')},優惠票`
          return ticket
        }
      )
      allTickets = [...allTickets, ...allDiscountTickets]
    }

    // Copy the result since it will be reused in searching function
    this.ticketInfoFormat = allTickets
    this.allTicketInfoFormat = [...this.ticketInfoFormat]

    // Set default of inputDateTime
    this.inputDateTime = `${this.allTicketInfoFormat[0].date} ${this.allTicketInfoFormat[0].startTime}-${this.allTicketInfoFormat[0].endTime}`

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
  methods: {
    // Search function
    searchTicket() {
      if (this.inputDateTime === '') {
        alert('請選擇時段')
        return
      }
      const searchdateTime = this.inputDateTime.split(' ')
      const searchDate = searchdateTime[0]
      const searchStart = searchdateTime[1].split('-')[0]
      const searchEnd = searchdateTime[1].split('-')[1]
      const searchResult = this.allTicketInfoFormat.filter(
        (ticketInfo) =>
          ticketInfo.date === searchDate &&
          ticketInfo.startTime === searchStart &&
          ticketInfo.endTime === searchEnd &&
          ticketInfo.zone === this.inputSeat &&
          ticketInfo.ticketType === this.inputTicketType
      )
      this.$nextTick().then(() => (this.ticketInfoFormat = searchResult))
    },
    clearSearch() {
      this.inputDateTime = `${this.allTicketInfoFormat[0].date} ${this.allTicketInfoFormat[0].startTime}-${this.allTicketInfoFormat[0].endTime}`
      this.inputSeat = 'A區'
      this.ticketInfoFormat = [...this.allTicketInfoFormat]
    },
    // addCart(item) {
    //   console.log('add cart:')
    //   console.log(item)
    //   //       if (this.tempCart[ticket] === undefined) {
    //   //   this.tempCart[ticket] = 1
    //   // } else {
    //   //   this.tempCart[ticket] += 1
    //   // }
    // },
    // addCart(e) {
    //   const ticket = e.target.classList[0]
    //   const quantityDOM = document.getElementById(ticket)
    //   const currentQuantity = Number(quantityDOM.textContent)
    //   quantityDOM.textContent = currentQuantity + 1

    //   // Update temp cart
    //   if (this.tempCart[ticket] === undefined) {
    //     this.tempCart[ticket] = 1
    //   } else {
    //     this.tempCart[ticket] += 1
    //   }
    // },
    // removeCart(e) {
    //   const ticket = e.target.classList[0]
    //   const quantityDOM = document.getElementById(ticket)
    //   const currentQuantity = Number(quantityDOM.textContent)

    //   // Update temp cart
    //   if (this.tempCart[ticket] === undefined) return
    //   quantityDOM.textContent = currentQuantity - 1
    //   this.tempCart[ticket] -= 1

    //   // Delete empty item in temp cart
    //   if (this.tempCart[ticket] === 0) {
    //     delete this.tempCart[ticket]
    //   }
    // },
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
