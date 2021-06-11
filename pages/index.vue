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
        <p v-if="user">
          Random username: {{ user.name.title }} {{ user.name.first }}
          {{ user.name.last }}
          <br />
          gender: {{ user.gender }}
        </p>
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
