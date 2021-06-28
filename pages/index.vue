<template>
  <div class="container">
    <div>
      <Logo />
      <Menu></Menu>
      <h1 class="title">flash_ticketing</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Menu from '@/components/Menu.vue'
import { apiClientGetProduct } from '../api/index'
export default {
  components: {
    Menu,
  },
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
