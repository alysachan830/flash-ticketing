<template>
  <div>
    <h1>Product page</h1>
    <nav>
      <nuxt-link to="/product/concert">演出</nuxt-link>
      <nuxt-link to="/product/exhibition">展覽</nuxt-link>
      <nuxt-link to="/product/seminar">講座／研討會</nuxt-link>
    </nav>
    <main>
      <NuxtChild />
    </main>
  </div>
</template>

<script>
import { apiClientGetProduct } from '../api/index'
export default {
  async asyncData() {
    // Error handling
    try {
      const productsReq = await apiClientGetProduct(1)
      const products = productsReq.data.products
      return {
        products,
      }
    } catch (err) {
      console.log(err)
      return {
        err,
      }
    }
  },
  mounted() {
    // Error handling
    if (this.err) {
      alert('載入資料失敗')
    }
    console.log(this.products)
  },
}
</script>

<style></style>
