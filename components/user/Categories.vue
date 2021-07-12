<template>
  <div class="row g-0 w-100">
    <div class="col-lg-3 col-6 mb-4 mb-lg-0">
      <NuxtLink
        to="/events/art"
        class="
          category
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
    </div>
    <div class="col-lg-3 col-6 mb-4 mb-lg-0">
      <NuxtLink
        to="/events/music"
        class="
          category
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
    </div>

    <div class="col-lg-3 col-6">
      <NuxtLink
        to="/events/dance"
        class="
          category
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
    </div>

    <div class="col-lg-3 col-6">
      <NuxtLink
        to="/events/workshop"
        class="
          category
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
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.category {
  flex-basis: 160px;
  transition: background 0.3s;

  &:hover {
    background: darken(#f7f7f7, 5%);
  }
}

.nuxt-link-exact-active.nuxt-link-active {
  background: darken(#f7f7f7, 5%);
}
</style>
