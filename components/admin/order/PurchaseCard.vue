<template>
  <div class="card-bg mb-15 p-10 rounded-3 border">
    <h2 class="font-m mb-6">{{ cartItem.product.title }}</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">日期</th>
          <th scope="col">時間</th>
          <th scope="col" class="text-nowrap">座位區域</th>
          <th scope="col" class="text-nowrap">價錢</th>
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
          <td class="font-s font-md-base" style="width: 20%">
            <div :ref="id" class="d-flex align-items-center">
              <input
                v-if="id === editingId"
                v-model.number="inputQty"
                type="number"
                class="edit-input form-control w-25 me-0"
                @blur="updatePurchase(id)"
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
            <a href="#" @click="removeTicket(id)">
              <span class="material-icons font-base">clear</span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
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
      isDelete: false,
    }
  },
  computed: {
    ticketIds() {
      return Object.keys(this.cartItem)
        .filter(
          (item) =>
            item !== 'final_total' &&
            item !== 'id' &&
            item !== 'product' &&
            item !== 'product_id' &&
            item !== 'qty' &&
            item !== 'total' &&
            item !== 'coupon'
          // if user applies coupon, a 'coupon' object will be automatically added to the cart item,
          // so we have to filter out 'coupon'
        )
        .filter((item) => this.cartItem[item] !== 0)
      // Filter out ticket with 0 qty
      // tickets with 0 qty are tickets that were once added to cart but then deleted by the user
    },
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
      const oldQty = this.cartItem[ticketId]
      const oldPrice = perTicketPrice * oldQty
      if (this.isDelete) {
        return -oldPrice
      }
      // Get the different between the old price and the updated price
      return perTicketPrice * this.inputQty - oldPrice
    },
    countQtyEdit(ticketId) {
      const ticketIdInfo = ticketId.split(',')
      switch (ticketIdInfo.length) {
        case 1: {
          return 0
        }
        case 2: {
          const ticketType = ticketIdInfo[1]
          let perTicketPrice
          if (ticketType === '優惠票') {
            perTicketPrice =
              this.cartItem.product.price *
              (this.cartItem.product.discount / 100)
          } else {
            perTicketPrice = this.cartItem.product.price
          }
          const updatedTotal = this.countPrice(ticketId, perTicketPrice)

          return updatedTotal
        }
        case 3: {
          const ticketType = ticketIdInfo[2]
          const zone = ticketIdInfo[1][0]
          let perTicketPrice
          perTicketPrice = this.cartItem.product.ticketPrice[zone]
          if (ticketType === '優惠票') {
            perTicketPrice =
              perTicketPrice * (this.cartItem.product.discount / 100)
          }
          const updatedTotal = this.countPrice(ticketId, perTicketPrice)

          return updatedTotal
        }
      }
    },
    updatePurchase(ticketId) {
      // If isDelete is false, the user is editing cart, not deleting
      if (!this.isDelete) {
        if (this.inputQty === this.cartItem[ticketId]) {
          // Clear input
          this.editingId = ''
          return
        }
        if (this.inputQty < 1) {
          this.$showError('數量不能少於零')
          this.editingId = ''
          return
        }
        if (!Number.isInteger(this.inputQty)) {
          this.$showError('數量需要是整數')
          this.editingId = ''
          return
        }
      }
      const ticketTotal = this.countQtyEdit(ticketId)
      this.$nuxt.$emit('updateQty', {
        ticketTotal,
        ticketId,
        eventId: this.cartItem.id,
        inputQty: this.inputQty,
      })

      // Clear input
      this.editingId = ''
    },
    async removeTicket(ticketId) {
      const confirmDelete = await this.$showConfirm('是否確定刪除此票卷？')
      if (!confirmDelete) return
      this.isDelete = true
      this.updatePurchase(ticketId)
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
