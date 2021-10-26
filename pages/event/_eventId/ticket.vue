<template>
  <div class="pt-23">
    <div class="container">
      <div class="row mb-lg-23 mb-md-18 mb-14 justify-content-between">
        <div class="col-lg-6 mb-10 mb-lg-0">
          <img
            v-img:img,1044="eventInfo.imageUrl"
            alt="event image"
            class="rounded-4"
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
        <h3 ref="selectTicketTitle" class="font-l mb-6">
          選擇時段、座位與票種
        </h3>
        <p class="text-muted mb-2 font-s">*優惠票適用於學生、長者、殘疾人士</p>
      </div>

      <div class="row mb-20">
        <div
          v-for="(item, i) in ticketInfoFormat"
          :key="i"
          class="ticket rounded-3 col-6 col-md-4 col-lg-3 mb-6"
        >
          <TicketCard :item="item" />
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

// let loader

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
            id: `${this.eventId},${zone}區,正價票`,
            ...this.eventInfo.dateTime,
          }
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
        // Check if items in temp cart are already existed in cart
        const tempCartIds = Object.keys(this.tempCart)
        await this.$store.dispatch('getCart')
        const { carts } = this.$store.getters
        const existingCartItem = carts.find(
          (item) => item.product_id === this.eventId
        )

        // User has not added this event before
        if (!existingCartItem) {
          if (this.eventInfo.ticketPrice === 0) {
            const allData = {
              data: {
                product_id: this.eventId,
                qty: 0, // Because it is free, qty should be 0, so the total will be counted as 0
              },
            }

            // User's input ticket quantity
            allData.data[this.eventId] = this.tempCart[this.eventId]
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
            return
          }
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
          // If it is a free event, the id will be equal to eventId
          if (tempCartIds[0] === this.eventId) {
            allData.data[this.eventId] =
              existingCartItem[this.eventId] + this.tempCart[this.eventId]
            allData.data.qty = 0 // Qty has to be 0 because the event is free
            allData.data.product_id = this.eventId
          } else {
            tempCartIds.forEach((id) => {
              if (existingCartItem[id] !== undefined) {
                // This ticket is already in the current cart
                // Accumulate the quantity
                allData.data[id] = existingCartItem[id] + this.tempCart[id]
              } else {
                // This ticket is new to the current cart or this event is free
                // Add the key and value to allData
                allData.data[id] = this.tempCart[id]
              }
            })
            allData.data.qty = this.countQty(allData.data, existingCartItem)
            allData.data.product_id = this.eventId
          }
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
