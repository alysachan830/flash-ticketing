<template>
  <div class="row w-100 g-0">
    <div class="d-flex justify-content-center">
      <div class="row w-100 g-0">
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
              w-auto
              me-3
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
              w-auto
              ms-3
              me-lg-3
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
              w-auto
              me-3
              ms-lg-3
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
              w-auto
              ms-3
            "
          >
            <span class="me-1 text-info align-top material-icons"> work </span>
            工作坊</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

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
