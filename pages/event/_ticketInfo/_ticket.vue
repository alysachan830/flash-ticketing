<template>
  <div class="pt-23">
    <div class="container">
      <div class="row mb-lg-23 mb-md-18 mb-14">
        <div class="col-lg-8 mb-10 mb-lg-0">
          <img
            class="rounded-4"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/flashticketing/1625410413238.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bQn0N7fWYIW9PUueEzSdl02l5G9AWZrEFQ4KDTMElcBv2t%2F4TqPZcOBkYhHtlWEKPVNLE%2FXbFi4%2F39kHiqpbjDbvYGAEfRw34P7wbkLGM20xE%2Bgk8feMKkMvJJVU0dV1cNLTAvKRjQO3Pa44EELy9lYocbOpWDk8X95o5WxsXk%2B1pEFrAVzEAKVRGTVcVHTnPdtvGBACe0wLtY4NBq2oGDTWsDYgSKLxVSgJ5UeVqhiA8aDyYl2x%2Bk85hu0grujfexbY7l8Ch9GXLladfkN1BV67ozs9ETbnhfj%2FXLtylUdWs0SMVHcBIg9utq0Ogcj4yGNCRM0Dr8t3wD5pYhYTXg%3D%3D"
            alt=""
          />
        </div>
        <div class="col-lg-3 offset-lg-1">
          <div class="d-flex justify-content-between mb-6">
            <span class="badge font-lg-s font-xs bg-secondary text-black mb-4">
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
        </div>
      </div>
      <div class="d-flex justify-content-between mb-15">
        <h3 class="font-l">選擇時段、座位與票種</h3>
        <button class="btn btn-outline-primary">查看座位區域劃分</button>
      </div>
      <p class="text-muted mb-2 font-s">*優惠票適用於學生、長者、殘疾人士</p>
      <!-- Selects -->
      <div class="bg-secondary p-12 rounded-4 mb-md-21 mb-16">
        <div class="row align-items-end">
          <div class="col-lg-3 mb-lg-0 mb-4">
            <label for="dateTime" class="mb-2">節目時段</label>
            <select id="dateTime" class="form-select form-select-lg">
              <option value="free">2021-06-06 8:00 p.m</option>
              <option value="under100">2021-06-16 10:00 p.m</option>
            </select>
          </div>
          <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
            <label for="ticketType" class="mb-2">票種</label>
            <select id="ticketType" class="form-select form-select-lg">
              <option value="normal">正價票</option>
              <option value="discount">優惠票</option>
            </select>
          </div>
          <div class="col-lg-3 col-md-6 mb-lg-0 mb-4">
            <label for="seating" class="mb-2">座位區域</label>
            <select id="seating" class="form-select form-select-lg">
              <option value="a">A區</option>
              <option value="b">B區</option>
            </select>
          </div>
          <div class="col-3 w-md-auto w-100">
            <button class="btn btn-lg btn-primary mt-8 w-md-auto w-100">
              搜尋
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <table class="table mb-6 table-hover">
        <thead>
          <tr>
            <th scope="col">節目時段</th>
            <th scope="col">座位區域</th>
            <th scope="col">票種</th>
            <th scope="col">價錢</th>
            <th scope="col">數量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n">
            <!-- <th scope="row">1</th> -->
            <td>2021-06-06 8:00 p.m</td>
            <td>A區</td>
            <td>正價票</td>
            <td>HKD 120</td>
            <td>
              <div class="d-flex">
                <a href="#"
                  ><span class="font-base material-icons"> add </span></a
                >
                <span class="mx-6">1</span>
                <a href="#"
                  ><span class="font-base material-icons"> remove </span></a
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-end">
        <Pagination class="mb-17"></Pagination>
      </div>
      <!-- Add to cart -->
      <div class="row justify-content-center mb-21">
        <div class="col-4">
          <button class="btn btn-primary w-100 py-4">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
