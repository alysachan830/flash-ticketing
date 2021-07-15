<template>
  <div>
    <ul class="bg-light p-8 rounded-top">
      <li class="d-flex justify-content-between pb-6">
        <div>
          <p class="text-info font-s mb-1">票種</p>
          <p>{{ item.ticketType }}</p>
        </div>
        <p v-if="item.price !== '免費'" class="font-lg-xl font-l">
          ${{ item.price }}
        </p>
        <p v-else class="font-lg-xl font-l">{{ item.price }}</p>
      </li>
      <li class="pb-6">
        <p class="text-info font-s mb-1">座位區域</p>
        <p>{{ item.zone }}</p>
      </li>
      <li class="pb-6" v-if="item.end && item.start">
        <p class="text-info font-s mb-1">節目日期</p>
        <p>{{ item.start }} - {{ item.end }}</p>
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
      <a href="#" :class="`${item.date}${item.price}${item.zone}`">
        <span class="material-icons" @click.prevent="addCart"> add </span>
      </a>
      <span :id="`${item.date}${item.price}${item.zone}`">
        {{ quantity }}
      </span>
      <a href="#" :class="`${item.date}${item.price}${item.zone}`"
        ><span
          :class="[`${item.date}${item.price}${item.zone}`, 'material-icons']"
          @click.prevent="removeCart"
        >
          remove
        </span></a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 0,
    }
  },
  methods: {
    addCart() {
      this.quantity += 1
      //   if (process.server) return
      this.$nuxt.$emit('clickAdd', this.item.id)
    },
    removeCart() {
      if (this.quantity === 0) return
      this.quantity -= 1
      this.$nuxt.$emit('clickRemove', this.item.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.ticket-quantity {
  background: #ededed;
}
</style>
