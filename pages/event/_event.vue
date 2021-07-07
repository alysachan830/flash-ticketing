<template>
  <div class="pt-23">
    <div class="container mb-lg-23 mb-21">
      <!-- Event information -->
      <div class="mb-lg-23 mb-21">
        <div class="row">
          <div class="col-lg-6 col-12">
            <div
              class="main-image bg-img rounded-4 mb-7"
              :style="`background-image: url(${img1});`"
            ></div>
            <div class="row">
              <div class="col-6">
                <div
                  class="sub-image bg-img rounded-4 mb-7"
                  :style="`background-image: url(${img1});`"
                ></div>
              </div>
              <div class="col-6">
                <div
                  class="sub-image bg-img rounded-4 mb-7"
                  :style="`background-image: url(${img1});`"
                ></div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1 col-12">
            <div class="mb-20">
              <div class="d-flex justify-content-between mb-11">
                <span
                  class="badge font-lg-s font-xs bg-secondary text-black mb-4"
                >
                  藝術展覽
                </span>
                <ul class="d-flex">
                  <li>
                    <a href="#">
                      <span class="me-2 text-info material-icons">
                        bookmark_border
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="text-info material-icons"> share </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mb-15">
                <h2 class="mb-6">胡桃夾子與他的王國</h2>
                <p>香港芭蕾舞劇團</p>
              </div>
              <ul class="mb-15">
                <li class="d-flex mb-6">
                  <span class="text-primary material-icons font-m me-4">
                    calendar_today
                  </span>
                  <ul>
                    <li>2021-06-06 - 2021-07-07</li>
                    <li>8:00 p.m</li>
                  </ul>
                </li>
                <li class="d-flex mb-6">
                  <span class="text-primary material-icons font-m me-4">
                    location_on
                  </span>
                  <p>世紀廣場一號展覽廳</p>
                </li>
                <li class="d-flex mb-6">
                  <span class="text-primary material-icons font-m me-4">
                    paid
                  </span>
                  <p>$240 (學生票) / $480 (成人票)</p>
                </li>
              </ul>
              <button class="btn btn-primary w-100 py-4">立即購票</button>
            </div>
            <div class="mb-15">
              <p class="mb-8 fw-bold">節目介紹</p>
              <p>
                不以招地源天公；的又型、衣位中他名且分系象展不價、式看舉兒離時操、說持於公、中後以海：有見海感。思進說話怎子沒！如野果動眾。年建變如我深個千維支沒配大表起心多就長明致且數球感住有點草或家，完說長？認日用不起們傳計我停時火月路本內燈形生他散，來商萬金心當！何看因難知寶談助；是情是次來不里多便復親過文由多基育雜，其相如用二？西來許前。
              </p>
            </div>
            <div class="text-info mb-15 font-s">
              <p class="mb-8 fw-bold">入場須知</p>
              <ol>
                <li>請保持社交距離，以及佩戴口罩。</li>
                <li>
                  請於節目開始前十五分鐘進場，否則到中場休息時段才可進場。
                </li>
                <li>節目進行時，請關閉通訊設備鈴聲，以及保持安靜。</li>
                <li>場內請勿飲食。</li>
              </ol>
            </div>
            <div class="text-info font-s">
              <p class="mb-8 fw-bold">購票須知</p>
              <ol>
                <li>購票交易成功後，將不能退款。</li>
                <li>切勿轉售在此平台購買的票卷。</li>
                <li>如購買學生票，需要在入場時向工作人員展示學生證件。</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- Article -->
      <div>
        <h2 class="font-xl mb-14">獨家點評</h2>
        <articleCard></articleCard>
      </div>
    </div>
    <!-- Related events -->
    <div class="bg-light py-18">
      <div class="container">
        <h2 class="font-xl mb-14">更多相關節目</h2>
        <SwiperRelatedEvents></SwiperRelatedEvents>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    const event = params.event
    return { event }
  },
  data() {
    return {
      img1: `https://storage.googleapis.com/vue-course-api.appspot.com/flashticketing/1625172152483.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=A6g2dOim3jb8EcodT4ceEsWkJ70%2FxnSUcM9kBmsVYu6D7N4yJ2gRrmnuD6qzBA4N7CvKczPW5%2FXRQ4R%2FobN5EKw9bLMY7cLEFvQ0EC1bmi%2Bsopo%2FuQj5PeflPgo3DudOUV4qyAl4d3y4J5fVJQJzTPwP70L4vp094v8A%2BbRtgNQ15LpPo2%2FMK39FQcgZEgkJej1BYd4syzhcdsP3Oftq45wfGw27LlOgjEQmUAvTQVj%2B9cPE43LAUGRGL4sHU%2Fi8Iecx7sSM0n6J6%2B7tXx3%2Fcn1BWKE%2Bf2lY5eBIt4Ln1JyN3rFvCEbmMGRcTHvZrBKCLnIAHAeTxE3UEKStXr8p3A%3D%3D`,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/all';

.main-image {
  height: 320px;

  @include media-breakpoint-up(md) {
    height: 420px;
  }

  @include media-breakpoint-up(lg) {
    height: 674px;
  }
}

.sub-image {
  height: 160px;

  @include media-breakpoint-up(md) {
    height: 240px;
  }

  @include media-breakpoint-up(lg) {
    height: 320px;
  }
}
</style>
