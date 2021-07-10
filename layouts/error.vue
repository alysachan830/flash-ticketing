<template>
  <div class="pt-18">
    <div
      class="
        container
        content-h
        d-flex
        align-items-center
        justify-content-center
      "
    >
      <div class="text-center">
        <h1 v-if="error.statusCode === 404" class="text-primary mb-12">
          <span class="material-icons font-3xl align-bottom me-3"> error </span
          >查無此活動
        </h1>
        <h1 v-else>An error occurred</h1>
        <NuxtLink class="btn btn-outline-primary" to="/">返回首頁</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error', // you can set a custom layout for the error page
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
}
</script>

<style lang="scss" scoped>
.content-h {
  height: calc(100vh - 80px - 64px);
}
</style>
