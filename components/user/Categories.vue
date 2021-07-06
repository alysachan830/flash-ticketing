<template>
  <div class="d-flex w-100">
    <NuxtLink
      to="/events"
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
    <NuxtLink
      to="/events"
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

    <NuxtLink
      to="/events"
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
    <NuxtLink
      to="/events"
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
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.category {
  flex-basis: 160px;
  // background: #f7f7f7;
  transition: background 0.3s;

  &:hover {
    background: darken(#f7f7f7, 5%);
  }
}
</style>
