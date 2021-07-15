<template>
  <div>
    <ul class="bg-light p-8 rounded-top">
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
      <a href="#" :class="`${item.date}${item.price}${item.zone}`">
        <span class="material-icons"> add </span>
      </a>
      <span
        :id="`${item.date}${item.price}${item.zone}`"
        @click.prevent="addCart"
      >
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
      console.log('emit will happen:')
      if (process.server) return
      //   this.$nuxt.$emit('clickAdd')
      this.$bus.$emit('clickAdd', [this.quantity, this.item])
    },
  },
}
</script>

<style lang="scss" scoped>
.ticket-quantity {
  background: #ededed;
}
</style>
