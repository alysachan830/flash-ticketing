<template>
  <!-- pt-10
      pb-10
      ps-10
      pe-md-20 pe-10 -->
  <div class="card-bg mb-15 p-10 rounded-3 border">
    <!-- <a class="remove-btn position-absolute" href="#"
      ><span class="material-icons"> close </span></a
    > -->
    <h2 class="font-m mb-6">{{ cartItem.product.title }}</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">日期</th>
          <th scope="col">時間</th>
          <th scope="col" class="text-nowrap">座位區域</th>
          <th scope="col" class="text-nowrap">價錢</th>
          <!-- <th scope="col" class="text-nowrap">價錢</th> -->
          <th scope="col">數量</th>
          <th scope="col" :class="{ 'd-none': editingId !== '' }"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="id in ticketIds" :key="id">
          <td class="font-s font-md-base">{{ dateTimeFormat(id).date }}</td>
          <td class="font-s font-md-base">
            {{ dateTimeFormat(id).startTime }} -
            {{ dateTimeFormat(id).endTime }}
          </td>
          <td class="font-s font-md-base">{{ zone(id) }}</td>
          <td class="font-s font-md-base">
            <ul>
              <li class="font-xs text-nowrap">{{ ticketType(id)[0] }}</li>
              <li>{{ ticketType(id)[1] }}</li>
            </ul>
          </td>
          <!-- <td class="font-s font-md-base">$1000</td> -->
          <td class="font-s font-md-base" style="width: 20%">
            <div :ref="id" class="d-flex align-items-center">
              <!-- <a href="#"><span class="material-icons font-base">add</span></a>
              <p class="text-primary mx-md-12 mx-6 font-m">
                {{ cartItem[id] }}
              </p>
              <a href="#"
                ><span class="material-icons font-base">remove</span></a
              > -->
              <input
                v-if="id === editingId"
                v-model="inputQty"
                type="number"
                class="edit-input form-control w-25 me-0"
                @blur="closeEdit(id)"
              />
              <p v-else class="text-primary me-6 font-base font-md-m">
                {{ cartItem[id] }}
              </p>
              <a
                href="#"
                :class="{ 'd-none': editingId !== '' }"
                @click.prevent="openEdit(id)"
                ><span class="font-base material-icons"> edit </span></a
              >
            </div>
          </td>
          <td
            class="font-s font-md-base"
            :class="{ 'd-none': editingId !== '' }"
          >
            <a href="#">
              <span class="material-icons font-base">clear</span>
            </a>
          </td>
        </tr>
        <!-- <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr> -->
      </tbody>
    </table>
    <!-- <TicketCard
      v-for="id in ticketIds"
      :key="id"
      :ticket-id="id"
      :cart-item="cartItem"
      :ticket-qty="cartItem[id]"
    ></TicketCard> -->
  </div>
</template>

<script>
// import TicketCard from '@/components/user/cart/TicketCard.vue'

export default {
  components: {
    // TicketCard,
  },
  props: {
    cartItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editingId: '',
      inputQty: 0,
    }
  },
  // created() {
  //   this.inputQty = this.cartItem
  // },
  computed: {
    ticketIds() {
      return Object.keys(this.cartItem).filter(
        (item) =>
          item !== 'final_total' &&
          item !== 'id' &&
          item !== 'product' &&
          item !== 'product_id' &&
          item !== 'qty' &&
          item !== 'total'
      )
      // return ticketKeys.map( key => this.cartItem[key])
    },
  },
  created() {
    // this.$bus.$on('closeEdit', () => console.log('close!'))
  },
  methods: {
    dateTimeFormat(ticketId) {
      const dateInfo = this.cartItem.product.dateTime
      if (Array.isArray(dateInfo)) {
        // 3 types of data if it is an array
        // e.g:
        // 1, 1625854073524,A區,正價票
        // 2. 1625894762703,優惠票
        // 3. 1625898341971
        const selectedDateTimestamp = ticketId.split(',')[0]
        const selectedDateObj = dateInfo.find(
          (item) => `${item.timestamp}` === selectedDateTimestamp
        )
        return selectedDateObj
        // const selectedDate = selectedDateObj.date
        // const selectedTime = `${selectedDateObj.startTime} - ${selectedDateObj.endTime}`
      } else {
        return {
          startTime: dateInfo.startTime,
          endTime: dateInfo.endTime,
          date: `${dateInfo.start} - ${dateInfo.end}`,
        }
      }
    },
    zone(ticketId) {
      if (typeof this.cartItem.product.ticketPrice !== 'object') {
        return '-'
      }
      // Possible format:
      // 1. MeDbuK4uIRJuTqp_STC,A區,正價票
      // 2. 1625854073524,A區,正價票
      return ticketId.split(',')[1]
    },
    ticketType(ticketId) {
      const ticketIdInfo = ticketId.split(',')
      switch (ticketIdInfo.length) {
        case 1: {
          return ['正價票', `$${this.cartItem.product.price}`]
        }
        case 2: {
          if (ticketIdInfo[1] === '正價票') {
            return ['正價票', `$${this.cartItem.product.price}`]
          } else {
            return [
              '優惠票',
              `$${
                this.cartItem.product.price *
                (this.cartItem.product.discount / 100)
              }`,
            ]
          }
        }
        case 3: {
          const zone = ticketIdInfo[1][0]
          let price = this.cartItem.product.ticketPrice[zone]
          if (ticketIdInfo[2] === '優惠票') {
            price = price * (this.cartItem.product.discount / 100)
            return ['優惠票', `$${price}`]
          }
          return ['正價票', `$${price}`]
        }
      }
      // if (this.cartItem.product.discount === 0) {
      //   return ['正價票', `$${this.cartItem.product.price}`]
      // }
      // if (ticketId.includes('正價票')) {
      //   return ['正價票', `$${this.cartItem.product.price}`]
      // } else {
      //   return [
      //     '優惠票',
      //     `$${
      //       this.cartItem.product.price * (this.cartItem.product.discount / 100)
      //     }`,
      //   ]
      // }
    },
    openEdit(ticketId) {
      this.editingId = ticketId
      this.inputQty = this.cartItem[ticketId]
      // Since the input is rendered based on v-if,
      // we can only get access to the input node,
      // after the input is rendered on the page
      this.$nextTick().then(() => {
        this.$refs[ticketId][0].firstChild.focus()
      })
    },
    countPrice(ticketId, perTicketPrice) {
      console.log('---- in couting ----')
      const oldQty = this.cartItem[ticketId]
      const oldPrice = perTicketPrice * oldQty
      const oldTotal = this.cartItem.total
      console.log('oldPrice => ' + oldPrice)
      console.log('oldTotal => ' + oldTotal)
      const updatedTotal = oldTotal - oldPrice + perTicketPrice * this.inputQty
      console.log('updatedTotal => ' + updatedTotal)
      return updatedTotal
    },
    countQtyEdit(ticketId) {
      // let qty
      const ticketIdInfo = ticketId.split(',')
      switch (ticketIdInfo.length) {
        case 1: {
          return 0
        }
        case 2: {
          console.log('--- in case 2---')
          const ticketType = ticketIdInfo[1]
          let perTicketPrice
          if (ticketType === '優惠票') {
            perTicketPrice =
              this.cartItem.product.price *
              (this.cartItem.product.discount / 100)
          } else {
            perTicketPrice = this.cartItem.product.price
          }
          console.log('---- before go counting ----')
          console.log('perTicketPrice => ' + perTicketPrice)
          const updatedTotal = this.countPrice(ticketId, perTicketPrice)
          const qty = updatedTotal / this.cartItem.product.price
          console.log('qty => ' + qty)
          return qty
        }
        case 3: {
          console.log('--- in case 3---')
          const ticketType = ticketIdInfo[2]
          const zone = ticketIdInfo[1][0]
          let perTicketPrice
          perTicketPrice = this.cartItem.product.ticketPrice[zone]
          console.log('perTicketPrice with zone => ' + perTicketPrice)
          if (ticketType === '優惠票') {
            perTicketPrice =
              perTicketPrice * (this.cartItem.product.discount / 100)
            console.log(
              '優惠票, DISCOUNT: ' + this.cartItem.product.discount / 100
            )
            console.log(perTicketPrice)
          } else {
            perTicketPrice = this.cartItem.product.price
          }
          console.log('---- before go counting ----')
          console.log('perTicketPrice => ' + perTicketPrice)
          const updatedTotal = this.countPrice(ticketId, perTicketPrice)
          const qty = updatedTotal / this.cartItem.product.price
          console.log('qty => ' + qty)
          return qty
        }
      }
      // if(ticketIdInfo.length === 1){
      //   return 0
      // }else if()
      // const [id, zone, ticketType] = ticketId.split(',')
      // if (zone === undefined && ticketType === undefined) {
      //   return 0
      // }
      // if()
    },
    closeEdit(ticketId) {
      const allData = {
        data: {
          product_id: this.cartItem.id,
          qty: this.countQtyEdit(ticketId),
        },
      }
      allData.data[ticketId] = this.inputQty
      console.log(allData)

      // Clear input
      this.editingId = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-input {
  width: 60px !important;
}

.card-bg {
  background: #fafafa;

  transition: filter 0.3s;
  &:hover {
    filter: drop-shadow(0.5px 0.5px 3px #e0e0e0);
  }
}
</style>
