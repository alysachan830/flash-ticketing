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
          <button class="btn btn-primary w-100 py-4" @click="addCart">
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
    const ticketPrice = this.eventInfo.ticketPrice
    if (ticketPrice !== 0) {
      // If the event has different zones and prices, ticketPrice will be an object
      if (typeof ticketPrice === 'object') {
        allTickets = Object.keys(ticketPrice).map((zone) => {
          return {
            zone: `${zone}區`,
            price: ticketPrice[zone],
            ticketType: '正價票',
            // id: `${this.eventInfo.dateTime.start}-${this.eventInfo.dateTime.end},${this.eventInfo.dateTime.startTime}-${this.eventInfo.dateTime.endTime},${zone}區,正價票`,
            id: `${this.eventId},${zone}區,正價票`,
            ...this.eventInfo.dateTime,
          }
          // if (Array.isArray(this.eventInfo.dateTime)) {
          //   return this.eventInfo.dateTime
          //     .map((dateTime) => {
          //       return {
          //         zone: `${zone}區`,
          //         price: ticketPrice[zone],
          //         ticketType: '正價票',
          //         id: `${dateTime.date},${dateTime.startTime}-${dateTime.endTime},${zone}區,正價票`,
          //         ...dateTime,
          //       }
          //     })
          //     .flat()
          // } else {
          //   return {
          //     zone: `${zone}區`,
          //     price: ticketPrice[zone],
          //     ticketType: '正價票',
          //     id: `${this.eventInfo.dateTime.start}-${this.eventInfo.dateTime.end},${this.eventInfo.dateTime.startTime}-${this.eventInfo.dateTime.endTime},${zone}區,正價票`,
          //     ...this.eventInfo.dateTime,
          //   }
          // }
        })
        // If this event has discount
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
      } else {
        // If the event has fixed ticket price, ticketPrice will be a number
        allTickets = [
          {
            zone: '不適用',
            price: ticketPrice,
            ticketType: '正價票',
            id: `${this.eventId},正價票`,
            ...this.eventInfo.dateTime,
          },
          // {
          //   zone: '不適用',
          //   price: ticketPrice * (this.eventInfo.discount / 100),
          //   ticketType: '優惠票',
          //   id: this.eventId,
          //   ...this.eventInfo.dateTime,
          // },
        ]
        // If this event has discount
        if (this.eventInfo.discount > 0) {
          allTickets = [
            ...allTickets,
            {
              zone: '不適用',
              price: ticketPrice * (this.eventInfo.discount / 100),
              ticketType: '優惠票',
              id: `${this.eventId},優惠票`,
              ...this.eventInfo.dateTime,
            },
          ]
        }
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
  methods: {
    countQty(accumulatedItems, originalItem) {
      let ids
      let updatedItems
      if ((accumulatedItems, originalItem)) {
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
        let zone
        let ticketType
        let perTicketPrice
        // If the event has different zones and ticket prices
        if (typeof this.eventInfo.ticketPrice === 'object') {
          ;[zone, ticketType] = id.split(',').slice(1, 3)
          perTicketPrice = this.eventInfo.ticketPrice[zone[0]]
        } else {
          // If the event has fixed ticket price
          ;[zone, ticketType] = id.split(',')
          perTicketPrice = this.eventInfo.ticketPrice
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
    },
    async addCart() {
      try {
        if (Object.keys(this.tempCart).length === 0) {
          this.$showError('請選購票卷！')
          return
        }
        // If the event is free, then we can directly add that ticket to cart
        if (this.eventInfo.ticketPrice === 0) {
          const allData = {
            data: {
              product_id: this.eventId,
              qty: 0, // Because it is free, qty should be 0, so the total will be counted as 0
            },
          }

          // User's input ticket quantity
          allData.data[this.eventId] = this.tempCart[this.eventId]
          console.log(allData)
          const addCartRes = await apiClientAddCart(allData)
          console.log(addCartRes.data)
          // Clear tempCart and all input quantity
          this.tempCart = {}
          this.$bus.$emit('clearInputQuantity')
          if (!addCartRes.data.success) {
            throw addCartRes.data.message.join()
          }
          // console.log(addCartRes.data)
          this.$showSuccess('已加入購物車')
          return
        }
        // Check if items in temp cart are already existed in cart
        const tempCartIds = Object.keys(this.tempCart)
        await this.$store.dispatch('getCart')
        const { carts } = this.$store.getters
        const existingCartItem = carts.find(
          (item) => item.product_id === this.eventId
        )

        // User has not added this event before
        if (!existingCartItem) {
          console.log('還沒有此活動!')
          const allData = {
            data: {
              product_id: this.eventId,
              qty: this.countQty(),
            },
          }
          tempCartIds.forEach((id) => {
            allData.data[id] = this.tempCart[id]
          })
          console.log(allData)
          const addCartRes = await apiClientAddCart(allData)
          // Clear tempCart and all input quantity
          this.tempCart = {}
          this.$bus.$emit('clearInputQuantity')
          console.log(addCartRes.data)
          if (!addCartRes.data.success) {
            throw addCartRes.data.message.join()
          }
          this.$showSuccess('已加入購物車')
        } else {
          console.log('之前已有加這 event !')
          // User has added this event before
          // Check if this event item contains the same event period
          // If yes, We have to accumulate the quantity
          // This approach avoids overwritting the same object key and value that are added in the cart before
          const allData = {
            data: {},
          }
          tempCartIds.forEach((id) => {
            if (existingCartItem[id] !== undefined && id !== this.eventId) {
              console.log('有此時段，要累加！')
              // This ticket is already in the current cart or it is a free event
              // If it is a free event, the id will be equal to eventId
              // Accumulate the quantity
              allData.data[id] = existingCartItem[id] + this.tempCart[id]
            } else {
              console.log('沒有此時段，不用累加！ / 免費活動')
              // This ticket is new to the current cart or this event is free
              // Add the key and value to allData
              allData.data[id] = this.tempCart[id]
            }
          })
          allData.data.qty = this.countQty(allData.data, existingCartItem)
          allData.data.product_id = this.eventId

          console.log('----all data----')
          console.log(allData)
          const updateCartRes = await apiClientUpdateCart(
            existingCartItem.id,
            allData
          )

          // Clear tempCart and all input quantity
          this.tempCart = {}
          this.$bus.$emit('clearInputQuantity')
          console.log(updateCartRes.data)
          if (!updateCartRes.data.success) {
            throw updateCartRes.data.message.join()
          }
          this.$showSuccess('已加入購物車')
        }
      } catch (error) {
        this.$showError('加入購物車失敗')
        // eslint-disable-next-line no-console
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
