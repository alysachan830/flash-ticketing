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
      <li>2021-06-06</li>
      <li>20:00 - 21:00</li>
    </ul>
    <div>Zone A</div>
    <ul>
      <li>成人票</li>
      <li>$320</li>
    </ul>
    <!-- <p class="ticket-price">成人票 $320</p> -->
    <div class="d-flex justify-content-between align-items-center">
      <a href="#"><span class="material-icons font-base">add</span></a>
      <p class="text-primary mx-md-12 mx-6 font-m">1</p>
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
  },
}
</script>

<style></style>
