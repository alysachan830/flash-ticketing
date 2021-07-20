<template>
  <div>
    <div v-if="isSignIn" class="d-flex">
      <div
        class="
          side-bar-w
          py-16
          bg-primary
          h-100
          d-flex
          position-fixed
          flex-column
          justify-content-between
        "
      >
        <!-- Sidebar link -->
        <div>
          <NuxtLink
            class="py-7 ps-16 pe-20 mb-17 d-flex align-items-center"
            to="/admin"
          >
            <i class="material-icons font-2xl text-white me-2">offline_bolt</i>
            <h1 class="fw-bold text-uppercase font-base">
              flash <br />ticketing
            </h1>
          </NuxtLink>
          <NuxtLink class="py-7 ps-16 pe-20" to="/admin">
            <i class="material-icons text-white align-bottom me-2"
              >smart_display</i
            >
            節目活動</NuxtLink
          >
          <NuxtLink class="py-7 ps-16 pe-20" to="/admin/orders">
            <i class="material-icons text-white align-bottom me-2"
              >format_list_bulleted</i
            >
            訂單</NuxtLink
          >
          <NuxtLink class="py-7 ps-16 pe-20" to="/admin/coupons">
            <i class="material-icons text-white align-bottom me-2"
              >confirmation_number</i
            >
            優惠劵</NuxtLink
          >
        </div>
        <!-- Avatar -->
        <div class="ps-16 pe-20">
          <div class="d-flex align-items-center mb-3">
            <div class="avatar rounded-circle me-2"></div>
            <span class="text-white font-s">David Chan</span>
          </div>
          <button
            type="button"
            class="btn btn-outline-light w-100"
            @click="logout"
          >
            登出
          </button>
        </div>
      </div>
      <NuxtChild class="ps-200 py-14 pe-20 w-100" />
    </div>
    <div
      v-else
      class="
        vh-100
        d-flex
        justify-content-center
        align-items-center
        font-2xl
        text-primary
      "
    >
      <span class="material-icons font-4xl me-12"> error_outline </span>
      請先登入
    </div>
  </div>
</template>

<script>
import { apiAdminLogout } from '@/api/index'

export default {
  layout: 'empty',
  // If user has not signed in, all admin pages will be hidden
  computed: {
    isSignIn() {
      return this.$store.getters.signInStatus
    },
  },
  mounted() {
    // When user access the page, check if user has cookie
    // If yes, set the sign in state in Vuex to true
    if (this.$cookies.get('flashTicketingAuth')?.token) {
      this.$store.dispatch('checkSignIn', true)
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    async logout() {
      try {
        await apiAdminLogout()
        this.$showSuccess('已成功登出')
        // Turn sign in status to false in Vuex
        this.$store.dispatch('checkSignIn', false)
        // Clear cookie
        this.$cookies.removeAll()
        this.$router.push('/login')
      } catch (error) {
        this.$showError('登出失敗')
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

a {
  color: #fff;
  transition: 0.2s background;
  &:hover {
    color: #fff !important;
    background: rgba($secondary, 0.2);
  }
}

.nuxt-link-exact-active.nuxt-link-active {
  background: rgba($secondary, 0.2);
}

.avatar {
  width: 48px;
  height: 48px;
  background: url('~/assets/images/ivana-cajina-_7LbC5J-jw4-unsplash.jpg')
    center/cover no-repeat;
}

.side-bar-w {
  width: 260px;
}

.ps-200 {
  padding-left: 352px;
}
</style>
