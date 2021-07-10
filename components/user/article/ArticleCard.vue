<template>
  <a class="article-link" href="#">
    <span class="d-block">
      <div class="card mb-3 overflow-hidden">
        <div class="row g-0">
          <div class="col-lg-8 col-md-5 position-relative">
            <div
              :style="`background-image:url(${img1})`"
              class="article-img rounded-start"
            ></div>
            <div
              class="
                article-info
                position-absolute
                text-white
                d-flex
                flex-column
                justify-content-between
                h-100
                p-12 p-xl-15
                w-100
              "
            >
              <div>
                <span class="d-block mb-4 font-xs font-md-s">推介指數</span>
                <span class="font-xl-4xl font-3xl lh-1">4.5</span>
                <div>
                  <span class="material-icons font-base"> star </span>
                  <span class="material-icons font-base"> star </span>
                  <span class="material-icons font-base"> star </span>
                  <span class="material-icons font-base"> star </span>
                </div>
              </div>
              <div>
                <div class="mb-4 d-flex align-items-center">
                  <span
                    class="badge font-xs bg-secondary text-black me-2 lh-base"
                  >
                    藝術展覽
                  </span>
                  <p>機械人與數碼龐克</p>
                </div>
                <h2 class="font-xl-xl font-md-l lh-base">
                  VR x 數碼龐克展 — 科幻世界與藝術表現
                </h2>
              </div>
            </div>
            <!-- <div :style="`background-image: ${img1}`" class="article-img"></div> -->
            <!-- <img
              src="@/assets/images/jurien-huggins-drIebcFZqpE-unsplash.jpg"
              class="img-fluid rounded-start"
              alt="article image"
              style="height: 352px"
            /> -->
          </div>
          <div class="col-lg-4 col-md-7 p-md-13 p-8">
            <div
              class="card-body d-flex flex-column justify-content-between h-100"
            >
              <div class="mb-5 mb-md-0">
                <!-- <h5 class="card-title">Card title</h5> -->
                <p class="card-text mb-md-3 font-xxl-base font-s lh-base">
                  不以招地源天公；的又型、衣位中他名且分系象展不價、式看舉兒離時操、說持於公、中後以海：有見海感。思進說話怎子沒！如野果動眾。年建變如我深個千維支沒配大表起心多就長明致且數球感住有點草或家，完說長？認日用不起們傳計我停時火月...
                </p>
                <p class="card-text">
                  <small class="text-muted font-md-s font-xs"
                    >發佈日期：06-06-2021</small
                  >
                </p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-outline-primary font-s font-md-base">
                  閱讀更多
                </button>
                <a href="#" class="text-primary font-s font-md-base"
                  >查看節目<span class="material-icons">
                    chevron_right
                  </span></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  </a>
</template>

<script>
export default {
  data() {
    return {
      img1: `https://storage.googleapis.com/vue-course-api.appspot.com/flashticketing/1625410413238.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bQn0N7fWYIW9PUueEzSdl02l5G9AWZrEFQ4KDTMElcBv2t%2F4TqPZcOBkYhHtlWEKPVNLE%2FXbFi4%2F39kHiqpbjDbvYGAEfRw34P7wbkLGM20xE%2Bgk8feMKkMvJJVU0dV1cNLTAvKRjQO3Pa44EELy9lYocbOpWDk8X95o5WxsXk%2B1pEFrAVzEAKVRGTVcVHTnPdtvGBACe0wLtY4NBq2oGDTWsDYgSKLxVSgJ5UeVqhiA8aDyYl2x%2Bk85hu0grujfexbY7l8Ch9GXLladfkN1BV67ozs9ETbnhfj%2FXLtylUdWs0SMVHcBIg9utq0Ogcj4yGNCRM0Dr8t3wD5pYhYTXg%3D%3D`,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

a:hover {
  color: inherit;
}

.card {
  border-radius: 10px;

  &-body {
    padding: 0;
  }
}

.article-link {
  transition: filter 0.3s;
  &:hover {
    filter: drop-shadow(0.5px 0.5px 3px #e0e0e0);
  }
}

.article-img {
  height: 352px;
  background-size: cover;
  filter: brightness(50%);
  // transition: transform 0.3s;
  // &:hover {
  //   transform: scale(1.1);
  // }
}

.article-info {
  top: 0;
  left: 0;
  // transition: background 0.3s;
  // &:hover {
  //   // transform: scale(1.1);
  //   background: rgb($primary, 0.2);
  // }
}

.rounded-start {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 10px !important;

  @include media-breakpoint-up(md) {
    border-bottom-left-radius: 10px !important;
  }
}
</style>
