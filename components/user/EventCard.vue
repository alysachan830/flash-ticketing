<template>
  <NuxtLink to="/" class="card border-0 mb-10">
    <div class="img-wrap rounded-4 mb-4">
      <img
        src="https://storage.googleapis.com/vue-course-api.appspot.com/flashticketing/1625172152483.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=A6g2dOim3jb8EcodT4ceEsWkJ70%2FxnSUcM9kBmsVYu6D7N4yJ2gRrmnuD6qzBA4N7CvKczPW5%2FXRQ4R%2FobN5EKw9bLMY7cLEFvQ0EC1bmi%2Bsopo%2FuQj5PeflPgo3DudOUV4qyAl4d3y4J5fVJQJzTPwP70L4vp094v8A%2BbRtgNQ15LpPo2%2FMK39FQcgZEgkJej1BYd4syzhcdsP3Oftq45wfGw27LlOgjEQmUAvTQVj%2B9cPE43LAUGRGL4sHU%2Fi8Iecx7sSM0n6J6%2B7tXx3%2Fcn1BWKE%2Bf2lY5eBIt4Ln1JyN3rFvCEbmMGRcTHvZrBKCLnIAHAeTxE3UEKStXr8p3A%3D%3D"
        class="hover__filter--darken h-100 position-absolute"
        alt="hot event"
      />
    </div>
    <span class="card-body d-block">
      <div class="d-flex justify-content-between mb-lg-6 mb-2">
        <div>
          <h5 class="card-title font-lg-m font-base">
            亞洲年度新媒體藝術節 2021
          </h5>
          <p>
            <span class="font-base material-icons align-text-top me-2">
              calendar_today
            </span>
            2021.06.08 — 2021.11.09
          </p>
        </div>
        <a href="#"
          ><span
            class="
              favourite-icon
              material-icons
              font-lg-l font-m
              align-baseline
            "
          >
            bookmark_border
          </span></a
        >
      </div>
      <span class="badge font-lg-s font-xs bg-secondary text-black mb-4">
        藝術展覽
      </span>
    </span>
  </NuxtLink>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.card {
  &:hover {
    color: inherit !important;
  }
}

.img-wrap {
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;

  img {
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.1);
    }
  }
}

.card-body {
  padding: 0 4px;
}

.favourite-icon {
  &:hover {
    color: $primary;
  }
}
</style>
