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
          <th scope="col" class="text-nowrap">票種</th>
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
          <td class="font-s font-md-base">{{ ticketType(id) }}</td>
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
                v-model="inputEdit"
                type="number"
                class="edit-input form-control w-25 me-0"
                @blur="closeEdit"
              />
              <p v-else class="text-primary me-6 font-base font-md-m">
                {{ cartItem[id] }}
              </p>
              <a
                href="#"
                @click.prevent="openEdit(id)"
                :class="{ 'd-none': editingId !== '' }"
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
      inputEdit: 0,
    }
  },
  // created() {
  //   this.inputEdit = this.cartItem
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
      if (this.cartItem.product.discount === 0) {
        return '正價票'
      }
      if (ticketId.includes('正價票')) {
        return '正價票'
      } else {
        return '優惠票'
      }
    },
    openEdit(ticketId) {
      this.editingId = ticketId
      this.inputEdit = this.cartItem[ticketId]
      // Since the input is rendered based on v-if,
      // we can only get access to the input node,
      // after the input is rendered on the page
      this.$nextTick().then(() => {
        this.$refs[ticketId][0].firstChild.focus()
      })
    },
    closeEdit() {
      this.editingId = ''
      console.log('blur!')
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
