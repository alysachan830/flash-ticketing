<template>
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
          <span class="material-icons align-text-top me-1 text-white font-base">
            calendar_today
          </span>
          06-15 — 07-15
        </p>
        <p>
          <span class="material-icons align-text-top me-1 text-white font-base">
            location_on
          </span>
          國際展覽中心一號展場
        </p>
      </div>
      <button class="btn btn-primary btn-lg">搶先購票</button>
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
// .container {
//   margin: 0 auto;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// }

// .title {
//   font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
//     'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//   display: block;
//   font-weight: 300;
//   font-size: 100px;
//   color: #35495e;
//   letter-spacing: 1px;
// }

// .subtitle {
//   font-weight: 300;
//   font-size: 42px;
//   color: #526488;
//   word-spacing: 5px;
//   padding-bottom: 15px;
// }

// .links {
//   padding-top: 15px;
// }
</style>
