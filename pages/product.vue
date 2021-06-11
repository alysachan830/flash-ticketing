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
      <p> 直接顯示 baseUrl： {{ $config.baseUrl }} </p>
      <p> 商品列表 (有拆分API)：{{ products }} </p>
    </main>
  </div>
</template>

<script>
import { apiClientGetProduct } from '../api/index'
// import axios from 'axios'
export default {
  async asyncData({ env }) {
    // Success
    // try {
    //   const productsRes = await axios.get(`${env.apiBaseUrl}/api/${env.apiPath}/products?page=1`);
    //   const products = productsRes.data.products
    //   return {
    //     products,
    //   }
    // } catch (err) {
    //   console.log(err)
    //   return {
    //     err,
    //   }
    // }

    // const productsRes = apiClientGetProduct();
    const apiBaseUrl = env.apiBaseUrl;
    const apiPath = env.apiPath;
    try {
      // const productsRes = await apiClientGetProduct();
      console.log('apiClientGetProduct: ', apiClientGetProduct);
      const productsRes = await apiClientGetProduct();
      console.log('productsRes', productsRes);
      const products = productsRes.data.products
      console.log('products', products);
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
    // console.log(this.products)
    // console.log(this.baseUrl)
    console.log(`Products from server:`, this.products)
  },
}
</script>

<style></style>
