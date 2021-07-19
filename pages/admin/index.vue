<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
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
      // const token = this.$cookies.get('flashTicketingAuth').token
      await this.$store.dispatch('adminGetEvents', { token: '', pageNum: 1 })
      this.events = this.$store.getters.adminEvents
    } catch (error) {
      this.$showError('載入節目活動資料失敗')
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
}
</script>

<style></style>
