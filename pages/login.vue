<template>
  <div>
    <div
      class="vh-100 bg-primary d-flex justify-content-center align-items-center"
    >
      <div class="row justify-content-center w-100">
        <div class="px-12 px-md-0 col-md-4">
          <h2 class="text-white mb-16 text-center font-2xl">管理員登入</h2>
          <form class="mb-20">
            <div class="mb-6">
              <label for="email" class="form-label text-white">電郵</label>
              <input id="email" type="email" class="login-input form-control" />
            </div>
            <div class="mb-16">
              <label for="password" class="form-label text-white">密碼</label>
              <input
                id="password"
                type="password"
                class="login-input form-control"
              />
            </div>
            <button type="submit" class="btn btn-secondary text-primary w-100">
              登入
            </button>
          </form>
          <NuxtLink class="d-flex justify-content-center" to="/">
            <div class="d-flex">
              <i class="material-icons font-2xl text-white me-2"
                >offline_bolt</i
              >
              <h1 class="fw-bold text-uppercase font-base text-white">
                flash <br />ticketing
              </h1>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
}
</script>

<style lang="scss" scoped>
.login-input {
  background-color: transparent !important;
  color: #ffffff;
}
</style>
