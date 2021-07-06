<template>
  <div class="pt-18">
    <div class="position-relative mb-14">
      <div class="filter--dark top-banner bg-img"></div>
      <div class="position-absolute top-banner-title text-white text-center">
        <h2 class="mb-8 font-2xl">機械人與數碼龐克</h2>
        <div class="mb-12 d-flex justify-content-center">
          <p class="me-3">
            <span
              class="material-icons align-text-top me-1 text-white font-base"
            >
              calendar_today
            </span>
            2021-07-31 — 2021-08-31
          </p>
          <p>
            <span
              class="material-icons align-text-top me-1 text-white font-base"
            >
              location_on
            </span>
            香港動漫電競中心展覽廳
          </p>
        </div>
        <button class="btn btn-primary btn-lg px-10">搶先購票</button>
      </div>
    </div>
    <div class="container">
      <a href="#" class="text-info mb-16">
        進階搜尋
        <span class="material-icons"> expand_more </span>
      </a>
      <div class="row align-items-start mb-19">
        <!-- Categories -->
        <div class="col-8">
          <Categories></Categories>
        </div>
        <!-- Search bar -->
        <div class="col-4">
          <div class="input-group mb-10">
            <span
              id="basic-addon1"
              class="
                bg-transparent
                input-group-text
                material-icons
                font-m
                text-info
              "
            >
              search
            </span>
            <input
              type="text"
              class="form-control border-start-0"
              placeholder="作業 / 課程 / 課堂名稱"
              aria-label="作業 / 課程 / 課堂名稱"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
      <!-- Event cards -->
      <div class="row mb-19">
        <div v-for="n in 12" :key="n" class="col-lg-3 col-md-4 col-6">
          <EventCard></EventCard>
        </div>
      </div>
      <!-- Pagination -->
      <div class="d-flex justify-content-center mb-19">
        <Pagination></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style class="scss" scoped>
.top-banner {
  background-image: url('@/assets/images/c-robynne-hu-HOrhCnQsxnQ-unsplash.jpg');
  height: 388px;
}

.top-banner-title {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
