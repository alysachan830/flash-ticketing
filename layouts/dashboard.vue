<template>
  <div class="d-flex">
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
          to="/"
        >
          <i class="material-icons font-2xl text-white me-2">offline_bolt</i>
          <h1 class="fw-bold text-uppercase font-base">
            flash <br />ticketing
          </h1>
        </NuxtLink>
        <NuxtLink class="py-7 ps-16 pe-20" to="events/events">
          <i class="material-icons text-white align-bottom me-2"
            >smart_display</i
          >
          節目活動</NuxtLink
        >
        <NuxtLink class="py-7 ps-16 pe-20" to="orders">
          <i class="material-icons text-white align-bottom me-2"
            >format_list_bulleted</i
          >
          訂單</NuxtLink
        >
        <NuxtLink class="py-7 ps-16 pe-20" to="coupons">
          <i class="material-icons text-white align-bottom me-2"
            >confirmation_number</i
          >
          優惠劵</NuxtLink
        >
        <NuxtLink class="py-7 ps-16 pe-20" to="articles">
          <i class="material-icons text-white align-bottom me-4">description</i
          >評論文章</NuxtLink
        >
        <NuxtLink class="py-7 ps-16 pe-20" to="create-articles">
          <i class="material-icons text-white align-bottom me-2">edit</i>
          新增文章</NuxtLink
        >
      </div>
      <!-- Avatar -->
      <div class="ps-16 pe-20">
        <div class="d-flex align-items-center mb-3">
          <div class="avatar rounded-circle me-2"></div>
          <span class="text-white font-s">David Chan</span>
        </div>
        <button type="button" class="btn btn-outline-light w-100">登出</button>
      </div>
    </div>
    <Nuxt class="ps-200 py-14 pe-20 w-100" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
a {
  color: #fff;
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
