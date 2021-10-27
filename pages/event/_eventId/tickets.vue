<template>
  <div class="pt-23">
    <div class="container">
      <div class="row mb-lg-23 mb-md-18 mb-14 justify-content-between">
        <div class="col-lg-6 mb-10 mb-lg-0">
          <img
            v-img:img,1044="eventInfo.imageUrl"
            class="skeleton-bg rounded-4"
            alt="event image"
          />
        </div>
        <div class="col-lg-4">
          <span class="badge font-lg-s font-xs bg-secondary text-black mb-6">
            {{ eventInfo.category }}
          </span>
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
              <!-- The ESLint waringing is disabled here since the HTML injected here is safe -->
              <!-- eslint-disable-next-line vue/no-v-html -->
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
        <h3 ref="selectTicketTitle" class="font-l mb-2">
          選擇時段、座位與票種
        </h3>
        <p class="text-muted mb-2 font-s">請到主辦方官方網站查看座位劃分</p>
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
          <div
            v-if="eventInfo.ticketPrice !== 0"
            class="col-lg-3 col-md-6 mb-lg-0 mb-4"
          >
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
          <div
            v-if="typeof eventInfo.ticketPrice === 'object'"
            class="col-lg-3 col-md-6 mb-lg-0 mb-4"
          >
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
              type="button"
              class="btn btn-lg btn-primary mt-8 w-md-auto w-100 me-6"
              @click="searchTicket"
            >
              搜尋
            </button>
            <button
              type="button"
              class="btn btn-lg btn-outline-primary mt-8 w-md-auto w-100"
              @click="clearSearch"
            >
              清除搜尋
            </button>
          </div>
        </div>
      </div>

      <div class="row mb-20">
        <div
          v-for="item in ticketInfoFormat"
          :key="item.id"
          class="ticket rounded-3 col-6 col-md-4 col-lg-3 mb-6"
        >
          <keep-alive>
            <TicketCard :item="item" />
          </keep-alive>
        </div>
      </div>
      <!-- Add to cart -->
      <div class="row justify-content-center mb-21">
        <div class="col-md-4">
          <button
            :disabled="Object.keys(tempCart).length === 0"
            type="button"
            class="btn btn-primary w-100 py-4"
            @click="addCart"
          >
            {{
              Object.keys(tempCart).length === 0 ? '請選取票劵' : '加入購物車'
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  apiClientGetEvent,
  apiClientAddCart,
  apiClientUpdateCart,
} from '@/api/index'
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
      loader: {},
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
    // Display tickets

    // 3 situations:
    // - 1. Free event
    // - 2. Event with fixed price
    // - 3. Event with different zones and prices
    let allTickets
    if (this.eventInfo.ticketPrice === 0) {
      allTickets = this.eventInfo.dateTime.map((dateTime) => ({
        zone: '不適用',
        price: '免費',
        ticketType: '不適用',
        id: dateTime.timestamp,
        ...dateTime,
      }))
    } else if (typeof this.eventInfo.ticketPrice === 'number') {
      allTickets = this.eventInfo.dateTime
        .map((dateTime) => {
          return {
            zone: '不適用',
            price: this.eventInfo.ticketPrice,
            ticketType: '正價票',
            id: `${dateTime.timestamp},正價票`,
            ...dateTime,
          }
        })
        .flat()

      if (this.eventInfo.discount > 0) {
        const allDiscountTickets = JSON.parse(JSON.stringify(allTickets)).map(
          (ticket) => {
            ticket.price = ticket.price * (this.eventInfo.discount / 100)
            ticket.ticketType = '優惠票'
            ticket.id = `${ticket.id.split(',')[0]},優惠票`
            return ticket
          }
        )
        allTickets = [...allTickets, ...allDiscountTickets]
      }
    } else {
      allTickets = Object.keys(this.eventInfo.ticketPrice)
        .map((zone) => {
          return this.eventInfo.dateTime.map((dateTime) => {
            return {
              zone: `${zone}區`,
              price: this.eventInfo.ticketPrice[zone],
              ticketType: '正價票',
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
      if (this.tempCart[id] === undefined) {
        this.$set(this.tempCart, id, 1)
      } else {
        this.$set(this.tempCart, id, this.tempCart[id] + 1)
      }
    })

    this.$nuxt.$on('clickRemove', (id) => {
      this.$set(this.tempCart, id, this.tempCart[id] - 1)
      if (this.tempCart[id] === 0) {
        this.$delete(this.tempCart, id)
      }
    })
  },
  mounted() {
    // To remind user select tickets, jump to the select ticket section directly when user visits the page
    const selectTicketTitle = this.$refs.selectTicketTitle.offsetTop
    // Subtract the height of navbar
    window.scrollTo(0, selectTicketTitle - 64)
  },
  methods: {
    // Search function
    searchTicket() {
      if (this.inputDateTime === '') {
        alert('請選擇時段')
        return
      }
      this.tempCart = {}
      this.$bus.$emit('clearInputQuantity')

      const searchdateTime = this.inputDateTime.split(' ')
      const searchDate = searchdateTime[0]
      const searchStart = searchdateTime[1].split('-')[0]
      const searchEnd = searchdateTime[1].split('-')[1]
      let searchResult = this.allTicketInfoFormat.filter(
        (ticketInfo) =>
          ticketInfo.date === searchDate &&
          ticketInfo.startTime === searchStart &&
          ticketInfo.endTime === searchEnd
      )

      // If zones are provided and ticketPrice is not 0
      if (typeof this.eventInfo.ticketPrice === 'object') {
        searchResult = searchResult.filter(
          (ticketInfo) => ticketInfo.zone === this.inputSeat
        )
      }
      if (this.eventInfo.discount > 0) {
        searchResult = searchResult.filter(
          (ticketInfo) => ticketInfo.ticketType === this.inputTicketType
        )
      }
      this.$nextTick().then(() => (this.ticketInfoFormat = searchResult))
    },
    clearSearch() {
      this.tempCart = {}
      this.$bus.$emit('clearInputQuantity')

      this.inputDateTime = `${this.allTicketInfoFormat[0].date} ${this.allTicketInfoFormat[0].startTime}-${this.allTicketInfoFormat[0].endTime}`
      // Set default inputSeat
      if (typeof this.eventInfo.ticketPrice === 'object') {
        this.inputSeat = 'A區'
      } else {
        this.inputSeat = ''
      }
      this.ticketInfoFormat = [...this.allTicketInfoFormat]
    },
    countQty(accumulatedItems, originalItem) {
      if (this.eventInfo.ticketPrice === 0) {
        return 0
      } else {
        let ids
        let updatedItems
        if (accumulatedItems) {
          const newIds = Object.keys(accumulatedItems)
          // Filter out the replaced items
          const exisitingIds = Object.keys(originalItem)
            .filter((key) => !newIds.includes(key))
            .filter((item) => item.includes('票'))
          const exisitingItems = {}
          exisitingIds.forEach((id) => (exisitingItems[id] = originalItem[id]))
          updatedItems = { ...accumulatedItems, ...exisitingItems }
          ids = Object.keys(updatedItems)
        } else {
          ids = Object.keys(this.tempCart)
        }
        const totalPrice = ids.reduce((acc, id) => {
          let perTicketPrice
          let zone
          let ticketType
          if (typeof this.eventInfo.ticketPrice === 'number') {
            ticketType = id.split(',')[1]
            perTicketPrice = this.eventInfo.ticketPrice
          } else {
            ;[zone, ticketType] = id.split(',').slice(1, 3)
            perTicketPrice = this.eventInfo.ticketPrice[zone[0]]
          }
          if (ticketType === '優惠票') {
            perTicketPrice = perTicketPrice * (this.eventInfo.discount / 100)
          }
          let subTotal
          if (accumulatedItems) {
            subTotal = perTicketPrice * updatedItems[id]
          } else {
            subTotal = perTicketPrice * this.tempCart[id]
          }
          return acc + subTotal
        }, 0)
        const qty = totalPrice / this.eventInfo.price
        return qty
      }
    },
    async addCart() {
      try {
        const tempCartIds = Object.keys(this.tempCart)
        await this.$store.dispatch('getCart')
        const { carts } = this.$store.getters
        const existingCartItem = carts.find(
          (item) => item.product_id === this.eventId
        )
        // User has not added this event before
        if (!existingCartItem) {
          const allData = {
            data: {
              product_id: this.eventId,
              qty: this.countQty(),
            },
          }

          tempCartIds.forEach((id) => {
            allData.data[id] = this.tempCart[id]
          })
          this.loader = this.$loading.show()
          const addCartRes = await apiClientAddCart(allData)
          // Clear tempCart and all input quantity
          this.tempCart = {}
          this.$bus.$emit('clearInputQuantity')
          this.$bus.$emit('refreshCartIcon')
          if (!addCartRes.data.success) {
            throw addCartRes.data.message.join()
          }
          this.$showSuccess('已加入購物車')
          this.loader.hide()
        } else {
          // User has added this event before
          // Check if this event item contains the same event period
          // If yes, We have to accumulate the quantity
          // This approach avoids overwritting the same object key and value that are added in the cart before
          const allData = {
            data: {},
          }
          tempCartIds.forEach((id) => {
            if (existingCartItem[id] !== undefined) {
              // Accumulate the quantity
              allData.data[id] = existingCartItem[id] + this.tempCart[id]
            } else {
              // If not, add the key and value to allData
              allData.data[id] = this.tempCart[id]
            }
          })
          allData.data.qty = this.countQty(allData.data, existingCartItem)
          allData.data.product_id = this.eventId
          // Qty will be accumulated if that event is already added in the cart before
          // To avoid accumulation, use update cart API
          this.loader = this.$loading.show()
          const updateCartRes = await apiClientUpdateCart(
            existingCartItem.id,
            allData
          )

          // Clear tempCart and all input quantity
          this.tempCart = {}
          this.$bus.$emit('clearInputQuantity')
          this.$bus.$emit('refreshCartIcon')
          if (!updateCartRes.data.success) {
            throw updateCartRes.data.message.join()
          }
          this.$showSuccess('已加入購物車')
          this.loader.hide()
        }
      } catch (error) {
        this.$showError('加入購物車失敗')
        this.loader.hide()
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
