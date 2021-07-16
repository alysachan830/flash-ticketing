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
              {{ eventInfo.category }}
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
          <button class="btn btn-primary w-100 py-4" @click="addCart">
            <!-- :disabled="Object.keys(tempCart).length === 0 ? true : false" -->
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiClientGetEvent,
  // apiClientAddCart,
  // apiClientUpdateCart,
} from '@/api/index'
// import { apiClientGetEvent } from '@/api/index'
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
  },
  created() {
    let allTickets
    if (this.eventInfo.ticketPrice === 0) {
      allTickets = this.eventInfo.dateTime.map((dateTime) => ({
        zone: '不適用',
        price: '免費',
        ticketType: '不適用',
        id: `${dateTime.date},${dateTime.startTime}-${dateTime.endTime}`,
        ...dateTime,
      }))
    } else {
      allTickets = Object.keys(this.eventInfo.ticketPrice)
        .map((zone) => {
          return this.eventInfo.dateTime.map((dateTime) => {
            return {
              zone: `${zone}區`,
              price: this.eventInfo.ticketPrice[zone],
              ticketType: '正價票',
              // id: `${dateTime.date},${dateTime.startTime}-${dateTime.endTime},${zone}區,正價票`,
              id: `${dateTime.timestamp},${zone}區,正價票`,
              ...dateTime,
            }
          })
        })
        .flat()

      if (this.eventInfo.discount > 0) {
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
    countQty(accumulatedItems, originalItem) {
      if (this.eventInfo.ticketPrice === 0) {
        return 0
      } else {
        let ids
        let updatedItems
        if (accumulatedItems) {
          console.log('----accmulated items----')
          console.log(accumulatedItems)
          const newIds = Object.keys(accumulatedItems)
          // Filter out the replaced items
          const exisitingIds = Object.keys(originalItem)
            .filter((key) => !newIds.includes(key))
            .filter((item) => item.includes('票'))
          const exisitingItems = {}
          exisitingIds.forEach((id) => (exisitingItems[id] = originalItem[id]))
          // console.log('----exisiting ids----')
          // console.log(exisitingIds)
          // key.includes('票')
          // The updated id list
          // console.log('----new ids----')
          // console.log(newIds)
          // ids = [...newIds, ...exisitingIds]
          // console.log(ids)
          console.log('updateItems')
          updatedItems = { ...accumulatedItems, ...exisitingItems }
          ids = Object.keys(updatedItems)
          console.log(updatedItems)
        } else {
          ids = Object.keys(this.tempCart)
        }
        // const ids = Object.keys(this.tempCart)
        const totalPrice = ids.reduce((acc, id) => {
          const [zone, ticketType] = id.split(',').slice(1, 3)
          // console.log(zone, ticketType)
          let perTicketPrice = this.eventInfo.ticketPrice[zone[0]]
          // console.log(perTicketPrice)
          if (ticketType === '優惠票') {
            perTicketPrice = perTicketPrice * (this.eventInfo.discount / 100)
          }
          // console.log('----perTicketPrice---')
          // console.log(perTicketPrice)
          let subTotal
          if (accumulatedItems) {
            subTotal = perTicketPrice * updatedItems[id]
          } else {
            subTotal = perTicketPrice * this.tempCart[id]
          }
          // console.log('----subTotal---')
          // console.log(subTotal)
          // console.log(acc)
          return acc + subTotal
        }, 0)
        console.log(totalPrice)
        const qty = totalPrice / this.eventInfo.price
        // if (accumulatedItems) {
        //   // To accumulate qty, we have to add the original qty and deduct the replaced ticket qty
        //   // calculate the old qty
        //   originalItem[]
        //   // qty = qty + originalItem.qty - originalItem[]
        // }
        return qty
      }
    },
    async addCart() {
      // const allTickets = Object.keys(this.tempCart).map((tempItem) => {
      //   const [timestamp, zone, ticketType] = tempItem.split(',')
      //   const dateTime = this.eventInfo.dateTime.find(
      //     (item) => item.timestamp === timestamp
      //   )
      //   return {
      //     zone,
      //     ticketType,
      //     dateTime,
      //     product_id: this.eventId,
      //     qty: this.tempCart[tempItem],
      //   }
      // })

      // const data = {
      //   data: {
      //     product_id: '-MeBVWJEY7ntu4Cz0a1T',
      //     qty: 4.75,
      //     // '1625854073524,C區,優惠票': 1,
      //     '1625854614761,A區,正價票': 1,
      //     '1625854614761,B區,正價票': 2,
      //   },
      // }

      try {
        if (Object.keys(this.tempCart).length === 0) {
          this.$showError('請選購票卷！')
          return
        }
        const tempCartIds = Object.keys(this.tempCart)
        await this.$store.dispatch('getCart')
        const { carts } = this.$store.getters
        const existingCartItem = carts.find(
          (item) => item.product_id === this.eventId
        )
        console.log(carts)
        // User has not added this event before
        if (!existingCartItem) {
          const allData = {
            data: {
              product_id: this.eventId,
              qty: this.countQty(),
            },
          }
          // console.log(allData)

          tempCartIds.forEach((id) => {
            allData.data[id] = this.tempCart[id]
          })
          // console.log(allData)
          // const addCartRes = await apiClientAddCart(allData)
          // console.log(addCartRes.data.data)
          // this.$showError('已加入購物車')
        } else {
          console.log('之前已有加這 event !')
          // User has added this event before
          // Check if this event item contains the same event period
          // If yes, We have to accumulate the quantity
          // This approach avoids overwritting the same object key and value that is added in the cart time before
          const allData = {
            data: {
              // product_id: this.eventId,
              // qty: this.countQty(),
            },
          }
          tempCartIds.forEach((id) => {
            if (existingCartItem[id] !== undefined) {
              console.log('有此時段，要累加！')
              // Accumulate the quantity
              allData.data[id] = existingCartItem[id] + this.tempCart[id]
            } else {
              console.log('沒有此時段，不用累加！')
              // If not, add the key and value to allData
              allData.data[id] = this.tempCart[id]
            }
          })
          allData.qty = this.countQty(allData.data, existingCartItem)
          allData.product_id = this.eventId
          // Qty will be accumulated if that event is already added in the cart before
          // To avoid accumulation, use update cart API

          console.log(allData)
          // apiClientUpdateCart(this.eventId, allData)
        }

        // const addCartRes = await apiClientAddCart(data)
        // console.log(addCartRes.data)
        // this.$showError('已加入購物車')

        // tempCartIds.forEach( tempCartId => {

        // })
      } catch (error) {
        this.$showError('加入購物車失敗')
        console.log(error)
      }
    },
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
