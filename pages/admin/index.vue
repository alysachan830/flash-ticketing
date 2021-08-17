<template>
  <div>
    <div class="d-flex justify-content-between align-items-start">
      <h2 class="font-xl mb-13">所有節目</h2>
      <NuxtLink to="/admin/edit/new" class="btn btn-primary">新增節目</NuxtLink>
    </div>
    <table class="table mb-12">
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
        <tr v-for="event in filterEvents" :key="event.id">
          <td>{{ event.title }}</td>
          <td>{{ dateTimeFormat(event.dateTime) }}</td>
          <td>
            <!-- The ESLint waringing is disabled here since the HTML injected here is safe -->
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
            <a href="#" @click.prevent="deleteEvent(event)"
              ><span class="material-icons"> clear </span></a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :total-pages="Math.ceil(events.length / 8)" />
  </div>
</template>

<script>
import { apiAdminDeleteProduct } from '@/api/index'
import Pagination from '@/components/common/Pagination.vue'

export default {
  components: {
    Pagination,
  },
  layout: 'empty',
  data() {
    return {
      loader: {},
      currentPage: 1,
      events: [],
    }
  },
  computed: {
    filterEvents() {
      return this.events.slice(
        (this.currentPage - 1) * 8,
        (this.currentPage - 1) * 8 + 8
      )
    },
  },
  created() {
    this.$nuxt.$on('clickPageNum', (n) => {
      this.currentPage = n
    })
    this.$bus.$on('clearPageNum', () => {
      this.currentPage = 1
    })
  },
  mounted() {
    this.getAllEvents()
  },
  methods: {
    async getAllEvents() {
      try {
        const token = this.$cookies.get('flashTicketingAuth').token
        this.loader = this.$loading.show()
        await this.$store.dispatch('adminGetAllEvents', token)
        this.events = this.$store.getters.adminEvents
      } catch (error) {
        this.$showError('載入節目活動資料失敗')
      } finally {
        this.loader.hide()
      }
    },
    dateTimeFormat(dateTime) {
      if (Array.isArray(dateTime)) {
        return dateTime.map((item) => item.date).join(', ')
      } else {
        return `${dateTime.start} - ${dateTime.end}`
      }
    },
    ticketPriceFormat(ticketPrice) {
      if (typeof ticketPrice === 'object') {
        return Object.keys(ticketPrice).reduce(
          (acc, curr) => `${acc}<li>${curr}區：$${ticketPrice[curr]}</li>`,
          ``
        )
      } else {
        return `<li>${ticketPrice}</li>`
      }
    },
    async deleteEvent(event) {
      try {
        const confirmDelete = await this.$showConfirm(
          `是否確定刪除${event.title}？`
        )
        if (!confirmDelete) return
        const token = this.$cookies.get('flashTicketingAuth').token
        const deleteProductRes = await apiAdminDeleteProduct(token, event.id)
        if (!deleteProductRes.data.success) {
          throw deleteProductRes.data.message
        }
        this.$showSuccess('成功刪除此節目')
        // Refresh all events table
        this.getAllEvents()
      } catch (error) {
        this.$showError('刪除節目失敗')
      }
    },
  },
}
</script>
