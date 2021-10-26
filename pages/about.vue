<template>
  <div class="py-23 min-vh-100">
    <div class="container">
      <div class="row mb-21">
        <div class="col-md-6 mb-12 mb-md-0">
          <img
            class="rounded-4"
            src="/images/c-yvette-de-wit-NYrVisodQ2M-unsplash.jpg"
            alt="about us"
          />
        </div>
        <div class="col-md-5 offset-md-1">
          <h2 class="mb-12">關於我們</h2>
          <p class="lh-lg mb-16 border-bottom pb-12">
            Flash Ticketing
            是以出售香港藝文節目票劵為主的平台，致力以方便可靠的票務功能，為大眾提供及推廣本地各種文化活動。Flash
            Ticketing
            成立於2018年，曾與過百間藝文機構合作出售各種節目的票劵，活動種類包捨演唱會、藝術展覽、舞台劇以及工作坊等等。
          </p>
          <ul>
            <li class="mb-12">
              <p class="mb-4">如有意合作或查詢，歡迎與公關部聯絡：</p>
              <span class="d-flex">
                <span class="material-icons me-6 text-primary"> email </span>
                <a href="mailto:flashticketinghk@gmail.com"
                  >flashticketinghk@gmail.com</a
                >
              </span>
            </li>
            <li>
              <p class="mb-4">如有任何問題，歡迎與客服中心聯絡：</p>
              <span class="d-flex mb-6">
                <span class="material-icons me-6 text-primary"> email </span>
                <a href="mailto:info@flashticketing.hk"
                  >info@flashticketing.hk</a
                >
              </span>
              <span class="d-flex">
                <span class="material-icons me-6 text-primary"> call </span>
                <a href="tel:+21234567">21234567</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <h2 class="mb-12">常見問題</h2>
      <div id="faq" class="accordion accordion-flush">
        <div class="accordion-item">
          <h2 id="paymentHeading" class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#payment"
              aria-expanded="true"
              aria-controls="payment"
            >
              付款方法選擇？
            </button>
          </h2>
          <div
            id="payment"
            class="accordion-collapse collapse show"
            data-bs-parent="#faq"
          >
            <div class="accordion-body">
              Flash Ticketing 接受 VISA、Paypal 以及 Apple Pay 作為付款方法。
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 id="refundHeading" class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#refund"
              aria-expanded="false"
              aria-controls="refund"
            >
              購買票劵後可否取消交易和退款？
            </button>
          </h2>
          <div
            id="refund"
            class="accordion-collapse collapse"
            data-bs-parent="#faq"
          >
            <div class="accordion-body">
              如需要取消交易和退款，請在購買票劵後的七個工作天內，聯絡客戶服務中心取消交易。本公司將會在接下來的十個工作天內完成取消交易及退款事項，並不會容許顧客以換購其他票劵的方式來代替退款。如有任何爭議，本公司擁有最終決定權。
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 id="getTicketHeading" class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#getTicket"
              aria-expanded="false"
              aria-controls="getTicket"
            >
              交易成功後，如何取得票劵？
            </button>
          </h2>
          <div
            id="getTicket"
            class="accordion-collapse collapse"
            data-bs-parent="#faq"
          >
            <div class="accordion-body">
              當您選購票劵並成功付款後，我們會把電子票劵以及單據以電郵方式寄送給您。如在十五分鐘內沒有收到電郵，請致電本公司客服中心查詢詳情或尋求協助。
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 id="ticketTypeHeading" class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#ticketType"
              aria-expanded="false"
              aria-controls="ticketType"
            >
              哪些類別的人士可購買優惠票？
            </button>
          </h2>
          <div
            id="ticketType"
            class="accordion-collapse collapse"
            data-bs-parent="#faq"
          >
            <div class="accordion-body">
              學生、長者以及傷健人士均可購買優惠票。入場時需要出示相關身分證明文件給職員作核實。注意，並非所有節目活動都有出售優惠票，詳情請留意主辦單位所提供的資料。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
