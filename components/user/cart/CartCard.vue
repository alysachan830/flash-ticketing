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
    <TicketCard v-for="id in ticketIds" :key="id" :ticketId="id"></TicketCard>
  </div>
</template>

<script>
import TicketCard from '@/components/user/cart/TicketCard.vue'

export default {
  components: {
    TicketCard,
  },
  props: {
    cartItem: {
      type: Object,
      required: true,
    },
  },
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
}
</script>

<style lang="scss" scoped>
.card-bg {
  background: #fafafa;

  transition: filter 0.3s;
  &:hover {
    filter: drop-shadow(0.5px 0.5px 3px #e0e0e0);
  }
}
</style>
