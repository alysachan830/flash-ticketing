<template>
  <div>
    <h2 class="font-xl mb-13">建立節目活動</h2>
    <div class="row mb-13">
      <div class="col-7">
        <!-- Title -->
        <div class="mb-16">
          <div class="mb-3">
            <label for="title" class="form-label">節目標題 </label>
            <input id="title" type="text" class="form-control" />
          </div>
          <!-- Is enable -->
          <div class="form-check mb-8">
            <input
              id="flexCheckDefault"
              class="form-check-input"
              type="checkbox"
              value=""
            />
            <label class="form-check-label" for="flexCheckDefault">
              是否啟用
            </label>
          </div>
          <!-- Organizer -->
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="organizer" class="form-label">主辦單位 </label>
                <input id="organizer" type="text" class="form-control" />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="venue" class="form-label">地點 </label>
                <input id="venue" type="text" class="form-control" />
              </div>
            </div>
          </div>
        </div>
        <!-- Ticket price -->
        <h3 class="font-m mb-8">票價</h3>
        <div class="mb-8">
          <label for="discount" class="form-label"
            >優惠票折扣（例如8折就填寫80）
          </label>
          <div class="col-2">
            <input
              id="discount"
              type="number"
              class="form-control"
              placeholder="80"
            />
          </div>
        </div>
        <!-- Ticket charging choices -->
        <div class="mb-8">
          <p class="mb-3">收費方式</p>
          <div class="form-check">
            <input
              id="fixedPrice"
              class="form-check-input"
              type="radio"
              name="ticketCharge"
            />
            <label class="form-check-label" for="fixedPrice"> 劃一收費 </label>
          </div>
          <div class="form-check">
            <input
              id="seatPrice"
              class="form-check-input"
              type="radio"
              name="ticketCharge"
              checked
            />
            <label class="form-check-label" for="seatPrice">
              按座位區域收費
            </label>
          </div>
        </div>
        <!-- Charge by seating zone -->
        <div class="mb-8">
          <div class="row align-items-end">
            <div class="col-2">
              <label for="seatZone" class="form-label">區域 </label>
              <input
                id="seatZone"
                type="text"
                class="form-control"
                placeholder="A"
              />
            </div>
            <div class="col-2">
              <label for="ticketPrice" class="form-label">票價 </label>
              <input id="ticketPrice" type="number" class="form-control" />
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-primary">新增</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-5"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>

<style></style>
