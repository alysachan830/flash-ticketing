<template>
  <NuxtLink to="/" class="card border-0 mb-10">
    <img
      src="https://storage.googleapis.com/vue-course-api.appspot.com/flashticketing/1625172152483.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=A6g2dOim3jb8EcodT4ceEsWkJ70%2FxnSUcM9kBmsVYu6D7N4yJ2gRrmnuD6qzBA4N7CvKczPW5%2FXRQ4R%2FobN5EKw9bLMY7cLEFvQ0EC1bmi%2Bsopo%2FuQj5PeflPgo3DudOUV4qyAl4d3y4J5fVJQJzTPwP70L4vp094v8A%2BbRtgNQ15LpPo2%2FMK39FQcgZEgkJej1BYd4syzhcdsP3Oftq45wfGw27LlOgjEQmUAvTQVj%2B9cPE43LAUGRGL4sHU%2Fi8Iecx7sSM0n6J6%2B7tXx3%2Fcn1BWKE%2Bf2lY5eBIt4Ln1JyN3rFvCEbmMGRcTHvZrBKCLnIAHAeTxE3UEKStXr8p3A%3D%3D"
      class="card-img-top hover__filter--darken rounded-4 mb-7"
      alt="hot event"
    />
    <span class="card-body d-block">
      <div class="d-flex justify-content-between">
        <div>
          <h5 class="card-title">亞洲年度新媒體藝術節 2021</h5>
          <div class="mb-6">
            <span class="font-base material-icons align-text-top me-2">
              calendar_today </span
            >2021.06.08 — 2021.11.09
          </div>
        </div>
        <a href="#"><span class="material-icons"> bookmark_border </span></a>
      </div>
      <span class="badge font-s bg-secondary text-black mb-4"> 藝術展覽 </span>
    </span>
  </NuxtLink>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.card {
  &-img-top {
    min-height: calc(
      #{map-get($container-max-widths, 'xxl')} / 4 - #{$grid-gutter-width} * 3
    );
  }
  &-body {
    padding: 0 4px;
  }
}
</style>
