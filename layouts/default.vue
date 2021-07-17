<template>
  <div>
    <Navbar></Navbar>
    <Nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/user/layout/Navbar.vue'
import Footer from '@/components/user/layout/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style lang="scss"></style>
