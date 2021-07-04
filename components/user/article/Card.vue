<template>
  <div>
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-7">
          <div
            :style="`background-image:url(${img1})`"
            class="article-img rounded-start"
          ></div>
          <!-- <div :style="`background-image: ${img1}`" class="article-img"></div> -->
          <!-- <img
            src="@/assets/images/jurien-huggins-drIebcFZqpE-unsplash.jpg"
            class="img-fluid rounded-start"
            alt="article image"
            style="height: 352px"
          /> -->
        </div>
        <div class="col-md-5">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
.card {
  border-radius: 10px;
}

.article-img {
  height: 352px;
  background-size: cover;
}

.rounded-start {
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;
}
</style>
