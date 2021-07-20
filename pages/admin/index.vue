<template>
  <div>
    <h2 class="font-xl mb-13">所有節目</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">節目標題</th>
          <th scope="col">時間</th>
          <th scope="col">價錢</th>
          <th scope="col">狀態</th>
          <th scope="col">編輯</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.title }}</td>
          <td>{{ dateTimeFormat(event.dateTime) }}</td>
          <td>
            <!-- eslint-disable vue/no-v-html -->
            <ul v-html="ticketPriceFormat(event.ticketPrice)"></ul>
          </td>
          <td>{{ event.is_enabled ? '已啟用' : '未啟用' }}</td>
          <td>
            <NuxtLink :to="`/admin/edit/${event.id}`"
              ><span class="material-icons"> edit </span></NuxtLink
            >
          </td>
          <td>
            <span class="material-icons"> clear </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      events: [],
    }
  },
  async mounted() {
    try {
      const token = this.$cookies.get('flashTicketingAuth').token
      await this.$store.dispatch('adminGetAllEvents', token)
      this.events = this.$store.getters.adminEvents
    } catch (error) {
      this.$showError('載入節目活動資料失敗')
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  methods: {
    dateTimeFormat(dateTime) {
      if (Array.isArray(dateTime)) {
        return dateTime.map((item) => item.date).join(', ')
      } else {
        return `${dateTime.start} - ${dateTime.end}`
      }
    },
    ticketPriceFormat(ticketPrice) {
      if (typeof ticketPrice === 'object') {
        // return Object.keys(ticketPrice).join(',')
        return Object.keys(ticketPrice).reduce(
          (acc, curr) => `${acc}<li>${curr}區：$${ticketPrice[curr]}</li>`,
          ``
        )
      } else {
        return `<li>${ticketPrice}</li>`
      }
    },
  },
}
</script>

<style></style>
