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
  // async asyncData({ env }) {
  //   // Error handling
  //   try {
  //     // const apiPath = context.env.API_PATH;
  //     // const apiBaseUrl = context.env.API_BASE_URL;
  //     // const productsRes = await axios.get(`${apiBaseUrl}/api/${apiPath}/products?page=1`);
  //     const productsRes = await axios.get(`${env.apiBaseUrl}/api/${env.apiPath}/products?page=1`);
  //     const products = productsRes.data.products
  //     return {
  //       products,
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     return {
  //       err,
  //     }
  //   }
  // },
  async asyncData({ $config: { apiBaseUrl, apiPath } }) {
    try{
      const productRes = await axios.get(`${apiBaseUrl}/api/${apiPath}/products?page=1`);
      const products = productsRes.data.products;
      return {
        products
      }
    }catch(err){
      console.log(err)
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
