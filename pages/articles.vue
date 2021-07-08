<template>
  <div class="pt-18">
    <div class="position-relative mb-16">
      <!-- Banner -->
      <div class="banner-img bg-img filter--dark"></div>
      <div class="banner-title container position-absolute">
        <div class="mb-10">
          <span class="badge font-s bg-secondary text-black mb-4">
            藝術展覽
          </span>
          <h2 class="text-white">VR x 數碼龐克展 — 科幻世界與藝術表現</h2>
        </div>
        <button class="btn btn-primary px-16 py-2">閱讀更多</button>
      </div>
    </div>
    <!-- Search options -->
    <div class="container mb-19">
      <Categories class="mb-19"></Categories>
      <!-- <div class="row">
        <div class="col-lg-6 col-md-4 col-12">
        </div>
      </div> -->
    </div>
    <div class="container">
      <div class="mb-14 d-flex justify-content-between align-items-start">
        <div>
          <h2 class="font-xl mb-4">節目點評</h2>
          <p>為您挑選最高質節目，深入點評各種內容。</p>
        </div>
        <!-- Search bar -->
        <div class="input-group mb-10 w-auto">
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
      <div class="mb-19">
        <articleCard v-for="n in 4" :key="n" class="mb-16"></articleCard>
      </div>
      <div class="d-flex justify-content-center mb-19">
        <Pagination></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.banner-img {
  height: 520px;
  background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/flashticketing/1625410413238.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bQn0N7fWYIW9PUueEzSdl02l5G9AWZrEFQ4KDTMElcBv2t%2F4TqPZcOBkYhHtlWEKPVNLE%2FXbFi4%2F39kHiqpbjDbvYGAEfRw34P7wbkLGM20xE%2Bgk8feMKkMvJJVU0dV1cNLTAvKRjQO3Pa44EELy9lYocbOpWDk8X95o5WxsXk%2B1pEFrAVzEAKVRGTVcVHTnPdtvGBACe0wLtY4NBq2oGDTWsDYgSKLxVSgJ5UeVqhiA8aDyYl2x%2Bk85hu0grujfexbY7l8Ch9GXLladfkN1BV67ozs9ETbnhfj%2FXLtylUdWs0SMVHcBIg9utq0Ogcj4yGNCRM0Dr8t3wD5pYhYTXg%3D%3D');
}

.banner-title {
  left: 0;
  right: 0;
  bottom: 100px;
}
</style>
