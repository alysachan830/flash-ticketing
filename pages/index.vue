<template>
  <div>
    <!-- Top banner -->
    <div class="position-relative">
      <div
        class="
          top-banner
          bg-img
          d-flex
          justify-content-center
          align-items-center
          img-filter--dark
        "
      ></div>
      <div class="position-absolute top-banner-title text-white text-center">
        <h2 class="mb-8 font-2xl">亞洲年度新媒體藝術節 2021</h2>
        <div class="mb-12 d-flex justify-content-center">
          <p class="me-3">
            <span
              class="material-icons align-text-top me-1 text-white font-base"
            >
              calendar_today
            </span>
            06-15 — 07-15
          </p>
          <p>
            <span
              class="material-icons align-text-top me-1 text-white font-base"
            >
              location_on
            </span>
            國際展覽中心一號展場
          </p>
        </div>
        <button class="btn btn-primary btn-lg px-10">搶先購票</button>
      </div>
    </div>

    <!-- Quick search options -->
    <div class="container pt-15 d-flex align-items-center">
      <p class="font-m text-info pe-12 text-nowrap">快速搜尋</p>
      <div class="d-flex w-100">
        <NuxtLink
          to="/events"
          class="
            quick-search
            text-center text-info
            shadow-sm
            rounded-2
            px-5
            py-3
            me-6
            w-auto
          "
        >
          <span class="text-info align-top material-icons"> palette </span>
          藝術展覽</NuxtLink
        >
        <NuxtLink
          to="/events"
          class="
            quick-search
            text-center text-info
            shadow-sm
            rounded-2
            px-5
            py-3
            me-6
            w-auto
          "
        >
          <span class="text-info align-top material-icons"> music_note </span>
          音樂</NuxtLink
        >

        <NuxtLink
          to="/events"
          class="
            quick-search
            text-center text-info
            shadow-sm
            rounded-2
            px-5
            py-3
            me-6
            w-auto
          "
          ><span class="me-2 text-info align-top material-icons">
            theater_comedy </span
          >舞蹈</NuxtLink
        >
        <NuxtLink
          to="/events"
          class="
            quick-search
            text-center text-info
            shadow-sm
            rounded-2
            px-5
            py-3
            me-6
            w-auto
          "
        >
          <span class="me-1 text-info align-top material-icons"> work </span>
          工作坊</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { apiClientGetProduct } from '../api/index'
export default {
  async asyncData({ env }) {
    // try{
    //   const productRes = await axios.get(`${apiBaseUrl}/api/${apiPath}/products?page=1`);
    //   const products = productsRes.data.products;
    //   return {
    //     products
    //   }
    // }catch(err){
    //   console.log(err)
    // }

    try {
      // const productsRes = await apiClientGetProduct();
      console.log('apiClientGetProduct: ', apiClientGetProduct)
      const productsRes = await apiClientGetProduct()
      console.log('productsRes', productsRes)
      const products = productsRes.data.products
      console.log('products', products)
      return {
        products,
      }
    } catch (err) {
      console.log(err)
      return {
        err,
      }
    }

    // // Error handling
    // try {
    //   // const apiPath = context.env.API_PATH;
    //   // const apiBaseUrl = context.env.API_BASE_URL;
    //   // const productsRes = await axios.get(`${apiBaseUrl}/api/${apiPath}/products?page=1`);
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
  },
  mounted() {
    // Error handling
    if (this.err) {
      alert('載入資料失敗')
    }
    console.log(this.products)
  },
  // data() {
  //   return {
  //     user: null,
  //   }
  // },
  // mounted() {
  //   axios
  //     .get('https://randomuser.me/api/')
  //     .then((res) => {
  //       console.log(res.data)
  //       this.user = res.data.results[0]
  //     })
  //     .catch((err) => console.log(err))
  // },
}
</script>

<style lang="scss" scoped>
.top-banner {
  background-image: url('@/assets/images/brandon-erlinger-ford-wI2Hafqr_f4-unsplash.jpg');
  // background: center / cover no-repeat
  //   url('@/assets/images/brandon-erlinger-ford-wI2Hafqr_f4-unsplash.jpg');
  height: 388px;
}

.top-banner-title {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.quick-search {
  flex-basis: 160px;
  // background: #f7f7f7;
  transition: background 0.3s;

  &:hover {
    background: darken(#f7f7f7, 5%);
  }
}
</style>
