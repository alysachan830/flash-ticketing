<template>
  <div v-if="loading" class="loading-page"></div>
</template>

<script>
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data: () => ({
    loading: false,
    fullPage: true,
    loader: {},
  }),
  methods: {
    start() {
      this.loading = true
      this.loader = this.$loading.show()
    },
    finish() {
      this.loading = false
      this.loader.hide()
    },
  },
}
</script>
