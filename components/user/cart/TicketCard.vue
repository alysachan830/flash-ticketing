<template>
  <div
    class="
      d-flex
      justify-content-between
      align-items-start
      py-6
      border-top
      font-md-base font-s
    "
  >
    <ul>
      <li>{{ dateTimeFormat.date }}</li>
      <li>{{ dateTimeFormat.startTime }} - {{ dateTimeFormat.endTime }}</li>
    </ul>
    <div>Zone A</div>
    <ul>
      <li>成人票</li>
      <li>$320</li>
    </ul>
    <div class="d-flex justify-content-between align-items-center">
      <a href="#"><span class="material-icons font-base">add</span></a>
      <p class="text-primary mx-md-12 mx-6 font-m">{{ cartItem[ticketId] }}</p>
      <a href="#"><span class="material-icons font-base">remove</span></a>
    </div>
    <a href="#"><span class="material-icons font-base">clear</span></a>
  </div>
</template>

<script>
export default {
  props: {
    ticketId: {
      type: String,
      required: true,
    },
    cartItem: {
      type: Object,
      required: true,
    },
    // ticketQty: {
    //   type: Number,
    //   required: true,
    // },
  },
  computed: {
    dateTimeFormat() {
      const dateInfo = this.cartItem.product.dateTime
      if (Array.isArray(dateInfo)) {
        // 3 types of data if it is an array
        // e.g:
        // 1, 1625854073524,A區,正價票
        // 2. 1625894762703,優惠票
        // 3. 1625898341971
        const selectedDateTimestamp = this.ticketId.split(',')[0]
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
  },
}
</script>

<style></style>
