<template>
  <div>
    <nav class="bg-primary sticky-top py-6">
      <div class="container">
        <div class="row w-100">
          <div class="col-2">
            <NuxtLink to="/" class="d-flex align-items-center me-10 text-white">
              <i class="material-icons font-xl me-2">offline_bolt</i>
              <h1 class="text-uppercase font-s text-start" href="#">
                flash <br />
                ticketing
              </h1>
            </NuxtLink>
          </div>
          <div class="col-3">
            <!-- Search bar -->
            <div
              class="
                search-bar-w
                d-lg-flex d-none
                me-12
                input-group input-group-sm
              "
            >
              <input
                type="text"
                class="form-control font-s"
                placeholder="節目名稱 / 演出者 "
                aria-label="節目名稱 / 演出者 "
                aria-describedby="button-addon2"
              />
              <button
                class="btn btn-secondary"
                type="button"
                id="button-addon2"
              >
                <span class="material-icons align-middle text-primary">
                  search
                </span>
              </button>
            </div>
          </div>
          <div class="offset-1 col-5">
            <div class="d-flex justify-content-end align-items-center">
              <!-- Nuxt links -->
              <div class="d-lg-flex d-none me-5">
                <NuxtLink class="font-s text-nowrap text-white me-8" to="events"
                  >所有節目</NuxtLink
                >
                <NuxtLink
                  class="font-s text-nowrap text-white me-8"
                  to="articles"
                  >節目點評</NuxtLink
                >
                <NuxtLink
                  class="font-s text-nowrap text-white me-8"
                  to="contact"
                  >聯絡我們</NuxtLink
                >
                <NuxtLink class="font-s text-nowrap text-white me-8" to="faq"
                  >常見問題</NuxtLink
                >
              </div>
              <!-- <div class="d-flex w-100 justify-content-end"> -->
              <!-- Shop cart, bookmark, toggle button -->
              <div class="d-flex">
                <a href="#" class="me-4">
                  <span class="material-icons text-white align-middle">
                    shopping_cart
                  </span>
                </a>
                <a href="#" class="me-4">
                  <span class="material-icons text-white align-middle">
                    bookmark
                  </span>
                </a>
                <a
                  class="d-lg-none"
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <span class="material-icons text-white align-middle">
                    menu
                  </span>
                </a>
              </div>
            </div>
            <!-- </div> -->
          </div>
          <!-- <div class="offset-1 col-1">
            </div> -->
        </div>
      </div>
    </nav>
    <a
      class="btn btn-primary"
      data-bs-toggle="offcanvas"
      href="#offcanvasExample"
      role="button"
      aria-controls="offcanvasExample"
    >
      Link with href
    </a>
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample"
    >
      Button with data-bs-target
    </button>

    <!-- Offcanvas -->
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <div class="d-flex align-items-center">
          <i class="material-icons font-xl me-2">offline_bolt</i>
          <h5
            id="offcanvasExampleLabel"
            class="lh-sm text-uppercase font-s text-start offcanvas-title"
            href="#"
          >
            flash <br />
            ticketing
          </h5>
        </div>
        <!-- <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5> -->
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div>
          <!-- Nuxt links -->
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="events"
            >所有節目</NuxtLink
          >
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="articles"
            >節目點評</NuxtLink
          >
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="contact"
            >聯絡我們</NuxtLink
          >
          <NuxtLink class="font-m py-5 text-nowrap me-8" to="faq"
            >常見問題</NuxtLink
          >
        </div>
      </div>
    </div>

    <!-- Offcanvas copy -->
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </div>
        <div class="dropdown mt-3">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
          >
            Dropdown button
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
if (process.browser) {
  require('@/node_modules/bootstrap/js/dist/offcanvas.js')
}
export default {}
</script>

<style lang="scss" scoped>
.container {
  min-height: 0;
}
</style>
