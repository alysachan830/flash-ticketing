<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top py-6">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Navbar</a> -->
      <NuxtLink to="/" class="d-flex align-items-center me-10 text-white">
        <!-- <h1 class="d-flex align-items-center"> -->
        <i class="material-icons font-xl me-2">offline_bolt</i>
        <h1 class="text-uppercase font-s fw-bold" href="#">
          flash <br />
          ticketing
        </h1>
        <!-- </h1> -->
      </NuxtLink>
      <!-- Search bar -->
      <div class="search-bar-w me-12 input-group input-group-sm">
        <input
          type="text"
          class="form-control font-s"
          placeholder="節目名稱 / 演出者 "
          aria-label="節目名稱 / 演出者 "
          aria-describedby="button-addon2"
        />
        <button class="btn btn-secondary" type="button" id="button-addon2">
          <span class="material-icons align-middle text-primary"> search </span>
        </button>
      </div>
      <!-- Toggler -->
      <div class="d-flex align-items-center">
        <a href="#" class="me-6 d-lg-none">
          <span class="material-icons text-white align-middle">
            shopping_cart
          </span>
        </a>
        <a href="#" class="me-6 d-lg-none">
          <span class="material-icons text-white align-middle"> bookmark </span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink class="font-s nav-link" to="events">所有節目</NuxtLink>
            <!-- <a class="font-s nav-link active" aria-current="page" href="#">Home</a> -->
          </li>
          <li class="nav-item">
            <!-- <a class="font-s nav-link" href="#">Link</a> -->
            <NuxtLink class="font-s nav-link" to="articles">節目點評</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="font-s nav-link" to="contact">聯絡我們</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="font-s nav-link" to="faq">常見問題</NuxtLink>
          </li>
          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
        </ul>
        <!-- <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
        <a href="#" class="me-6 d-md-none d-lg-block">
          <span class="material-icons text-white align-middle">
            shopping_cart
          </span>
        </a>
        <a href="#" class="d-md-none d-lg-block">
          <span class="material-icons text-white align-middle"> bookmark </span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
// import '~bootstrap/js/dist/collapse.js'
// import '../../node_modules/bootstrap/js/dist/collapse.js'
// let ClassicEditor
// if (process.browser) {
//   ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
// }
if (process.browser) {
  require('@/node_modules/bootstrap/js/dist/collapse.js')
}
export default {}
</script>

<style lang="scss" scoped>
// @media (min-width: 992px) {
//   .navbar-expand-lg {
//     justify-content: space-between !important;
//   }
// }

.navbar-dark .navbar-nav .nav-link {
  color: white;

  &:hover {
    color: rgba(255, 255, 255, 0.55);
  }
}

.search-bar-w {
  width: 18%;
}
</style>
