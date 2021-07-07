<template>
  <div class="pt-23">
    <div class="container mb-23">
      <!-- Event information -->
      <div class="mb-23">
        <div class="row">
          <div class="col-6">
            <div
              class="main-image bg-img rounded-4 mb-7"
              :style="`background-image: url('/_nuxt/assets/images/hudson-hintze-pzgn0feLJwg-unsplash.jpg');`"
            ></div>
            <div class="row">
              <div class="col-6">
                <div
                  class="sub-image bg-img rounded-4 mb-7"
                  :style="`background-image: url('/_nuxt/assets/images/abhyuday-majhi-bW-vRGOF5EI-unsplash.jpg');`"
                ></div>
              </div>
              <div class="col-6">
                <div
                  class="sub-image bg-img rounded-4 mb-7"
                  :style="`background-image: url('/_nuxt/assets/images/c-michael-afonso-nZU76qWy-T8-unsplash.jpg');`"
                ></div>
              </div>
            </div>
          </div>
          <div class="col-5 offset-1">
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
}
</script>

<style lang="scss" scoped>
.main-image {
  height: 674px;
}

.sub-image {
  height: 320px;
}
</style>
