<template>
  <div>
    <h2 class="font-xl mb-13">{{ isNew ? '新增節目活動' : '編輯節目活動' }}</h2>
    <div class="row mb-13">
      <div class="col-7">
        <!-- Title -->
        <div class="mb-20">
          <div class="mb-3">
            <label for="title" class="form-label">節目標題</label>
            <input
              id="title"
              v-model="title"
              type="text"
              class="form-control"
            />
          </div>
          <!-- Is enable -->
          <div class="form-check mb-8">
            <input
              id="flexCheckDefault"
              v-model="is_enabled"
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
                <input
                  id="organizer"
                  v-model="organizer"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="venue" class="form-label">地點 </label>
                <input
                  id="venue"
                  v-model="venue"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-20">
          <!-- Ticket price -->
          <h3 class="font-m mb-8">票價</h3>
          <div class="mb-8">
            <label for="discount" class="form-label"
              >優惠票折扣（例如8折就填寫80）
            </label>
            <div class="col-2">
              <input
                id="discount"
                v-model.number="discount"
                type="number"
                class="form-control"
                placeholder="80"
              />
            </div>
          </div>
          <!-- Ticket charging options -->
          <div v-if="isNew" class="mb-8">
            <p class="mb-3">收費方式</p>
            <div class="form-check">
              <input
                id="fixedPrice"
                v-model="chargingOption"
                value="fixedPrice"
                class="form-check-input"
                type="radio"
                name="ticketCharge"
              />
              <label class="form-check-label" for="fixedPrice">
                劃一收費
              </label>
            </div>
            <div class="form-check">
              <input
                id="seatPrice"
                v-model="chargingOption"
                value="seatPrice"
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
          <!-- <div v-else>
            <div v-if="typeof eventInfo.ticketPrice === 'number'">
              <p class="mb-3">票價</p>
              <input type="number" v-model.number="fixedPrice" />
            </div>
          </div> -->
          <!-- Charge by seating zone -->
          <div class="mb-8">
            <div v-if="chargingOption === 'seatPrice'">
              <div class="row align-items-end mb-16">
                <div class="col-2">
                  <label for="seatZone" class="form-label">區域 </label>
                  <input
                    id="seatZone"
                    v-model.trim="seatZone"
                    type="text"
                    class="form-control"
                    placeholder="A"
                  />
                </div>
                <div class="col-2">
                  <label for="ticketPrice" class="form-label">票價 </label>
                  <input
                    id="ticketPrice"
                    v-model.number="seatZonePrice"
                    type="number"
                    class="form-control"
                  />
                </div>
                <div class="col-4">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="addTicketPrice"
                  >
                    {{ isNew ? '新增' : '新增或修改' }}
                  </button>
                </div>
              </div>
              <p class="font-xs text-info">
                注意：能修改已有座位區域價錢，但不能刪除已有座位區域
              </p>
              <!-- Seat zone price table -->
              <div v-if="Object.keys(ticketPrice).length > 0" class="row">
                <div class="col-6">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">區域</th>
                        <th scope="col">價錢</th>
                        <th scope="col">刪除</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="zone in Object.keys(ticketPrice)" :key="zone">
                        <!-- <th scope="row">1</th> -->
                        <td>{{ zone }} 區</td>
                        <td>${{ ticketPrice[zone] }}</td>
                        <td>
                          <!-- User cannot delete existing zones -->
                          <a
                            v-if="
                              !isNew &&
                              eventInfo.ticketPrice[zone] === undefined
                            "
                            href="#"
                            @click.prevent="deleteSeatPrice(zone)"
                          >
                            <i class="material-icons"> clear </i>
                          </a>
                          <p v-else>-</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- <ul>
                <li v-for="seat in Object.keys(ticketPrice)" :key="seat">
                  {{ seat }} 區：$ {{ ticketPrice[seat] }}
                </li>
              </ul> -->
            </div>
            <div v-else>
              <div class="col-2">
                <label for="ticketPrice" class="form-label">票價 </label>
                <input
                  id="ticketPrice"
                  v-model.number="fixedPrice"
                  type="number"
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-20">
          <h3 class="font-m mb-8">節目種類</h3>
          <!-- Event categories -->
          <div class="row">
            <div class="col-3">
              <label for="catgories" class="mb-3">節目種類</label>
              <select
                id="catgories"
                v-model="category"
                class="form-select"
                aria-label="Default select catgories"
              >
                <option value="藝術展覽">藝術展覽</option>
                <option value="舞蹈">舞蹈</option>
                <option value="音樂">音樂</option>
                <option value="工作坊">工作坊</option>
              </select>
            </div>
            <div class="col-3">
              <label for="tag" class="mb-3">標籤</label>
              <select
                id="tag"
                v-model="tag"
                class="form-select"
                aria-label="Default select tag"
              >
                <!-- <option selected>請選擇標籤</option> -->
                <option value="newest">最新</option>
                <option value="hottest">最熱門</option>
                <option value="recommended">推薦</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mb-20">
          <h3 class="font-m mb-8">節目時間</h3>
          <div class="mb-8">
            <p v-if="isNew" class="mb-3">節目時間</p>
            <div v-if="isNew" class="mb-8">
              <div class="form-check">
                <input
                  id="period"
                  v-model="dateOption"
                  value="period"
                  class="form-check-input"
                  type="radio"
                  name="dateOption"
                  @change="clearAllDateInput"
                />
                <label class="form-check-label" for="period">劃一時段 </label>
              </div>
              <div class="form-check">
                <input
                  id="selectedDate"
                  v-model="dateOption"
                  value="selectedDate"
                  class="form-check-input"
                  type="radio"
                  name="dateOption"
                  @change="clearAllDateInput"
                />
                <label class="form-check-label" for="selectedDate">
                  某日時段或多個某日時段
                </label>
              </div>
            </div>
            <!-- 某一時段 -->
            <!-- Date range -->
            <div v-if="dateOption === 'period'" class="mb-6">
              <div class="mb-6">
                <p class="mb-2">選擇時期</p>
                <v-date-picker
                  v-model="range"
                  :model-config="modelConfig"
                  is-range
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <div class="flex justify-center items-center">
                      <input
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                        class="border px-2 py-1 rounded"
                      />
                      <svg
                        style="width: 20px; height: 20px"
                        class="w-4 h-4 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                      <input
                        class="border px-2 py-1 rounded"
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                      />
                    </div>
                  </template>
                </v-date-picker>
              </div>
              <!-- Time range -->
              <div>
                <p class="mb-2">選擇劃一時段</p>
                <div class="d-flex">
                  <input
                    v-model="range.startTime"
                    type="time"
                    class="form-control"
                  />
                  <svg
                    style="width: 42px; height: 42px"
                    class="mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  <input
                    v-model="range.endTime"
                    type="time"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <!-- 某日時段或多個某日時段 -->
            <div v-if="dateOption === 'selectedDate'">
              <div class="mb-6">
                <p>選擇單一日期</p>
                <v-date-picker
                  v-model="selectedDate.date"
                  :model-config="modelConfig"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="bg-white border px-2 py-1 rounded"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </v-date-picker>
              </div>
              <div class="mb-6">
                <p class="mb-2">選擇時段</p>
                <input v-model="selectedDate.startTime" type="time" />
                <svg
                  style="width: 20px; height: 20px"
                  class="mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <input v-model="selectedDate.endTime" type="time" />
              </div>
              <button
                class="btn btn-primary d-block mb-8"
                @click="addSelectedDate"
              >
                新增時段
              </button>
              <div v-if="selectedDates.length > 0">
                <p>已選擇時段</p>
                <p v-if="!isNew" class="font-xs text-info">
                  注意：無法修改已有日期和時段
                </p>
                <hr />
                <ul class="mb-8">
                  <li
                    v-for="(selectedDateTime, i) in selectedDates"
                    :key="selectedDateTime.timestamp"
                    class="badge bg-secondary text-dark font-s me-6 mb-3"
                  >
                    <span class="me-4">
                      {{ selectedDateTime.date }}
                      {{ selectedDateTime.startTime }}-{{
                        selectedDateTime.endTime
                      }}</span
                    >
                    <a
                      v-if="
                        !isNew &&
                        eventInfo.dateTime.find(
                          (item) =>
                            item.timestamp === selectedDateTime.timestamp
                        ) === undefined
                      "
                      href="#"
                      class="d-inline-block vertical-middle"
                      @click.prevent="deleteSelectedDate(i)"
                      ><i class="align-text-bottom font-base material-icons">
                        clear
                      </i></a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Event description -->
        <div>
          <h3 class="font-m mb-8">節目描述</h3>
          <label class="d-block mb-3" for="description">節目描述</label>
          <textarea
            id="description"
            v-model="description"
            name="description"
            class="description d-block w-100"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <!-- Image upload -->
      <div class="col-4 offset-1">
        <div class="mb-19">
          <div class="mb-8">
            <h3 class="font-m mb-3">已上傳圖片</h3>
            <span class="text-danger d-block font-s"
              >*圖片大小必須少於 1MB</span
            >
            <span class="text-danger d-block font-s"
              >*檔案名稱長度必須少於32</span
            >
          </div>
          <span class="badge bg-info mb-6">主圖片</span>

          <img :src="mainImagePreview" alt="" class="preview-image-h mb-6" />
          <div class="input-group">
            <input
              id="mainImage"
              ref="mainImage"
              type="file"
              class="form-control"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              @change="addImage"
            />
            <button
              id="mainImageSubmit"
              class="btn btn-outline-primary"
              type="button"
              @click="uploadImage"
            >
              上傳
            </button>
          </div>
        </div>
        <span class="badge bg-info mb-6">其他圖片</span>
        <div v-if="imagesUrl.length > 0" class="sub-image-wrap mb-6">
          <img
            v-for="url in imagesUrl"
            :key="url"
            :src="url"
            alt=""
            class="preview-image-h mb-6"
          />
        </div>
        <div class="input-group">
          <input
            id="subImage"
            ref="subImage"
            type="file"
            class="form-control"
            aria-describedby="subImage"
            aria-label="Upload"
            @change="addSubImage"
          />
          <button
            id="subImageSubmit"
            class="btn btn-outline-primary"
            type="button"
            @click="uploadSubImage"
          >
            上傳
          </button>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary btn-lg" @click="submitEvent">
        {{ isNew ? '建立活動' : '編輯活動' }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { apiClientGetEvent } from '@/api/index'
// import vCalendar from 'v-calendar'

export default {
  layout: 'dashboard',
  data() {
    return {
      isNew: true,
      eventInfo: {},
      selectedDates: [],
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
      selectedDate: {
        date: new Date(), // moment().format('YYYY-MM-DD'),
        startTime: '',
        endTime: '',
      },
      dates: [
        {
          date: new Date(),
        },
      ],
      selected: {},
      range: {
        start: new Date(),
        end: new Date(),
        startTime: '',
        endTime: '',
      },
      dateOption: 'period',
      chargingOption: 'fixedPrice',
      seatZone: '',
      seatZonePrice: 0,
      fixedPrice: 0,
      title: '',
      description: '',
      is_enabled: true,
      imageUrl: '',
      imagesUrl: [],
      dateTime: {
        eventDate: '',
        eventStartTime: '',
        eventEndTime: '',
      },
      allDates: [],
      category: '藝術展覽',
      organizer: '',
      venue: '',
      // seats: [],
      tag: 'newest',
      ticketPrice: 0, //*
      discount: 0,
      mainImage: '',
      mainImagePreview: '',
      subImage: '',
      // 以下資料雖然將不會使用，但是這些也是API必須要傳的參數
      // unit: '張',
      // origin_price: 0,
      // price: 0,
    }
  },
  watch: {
    chargingOption() {
      this.ticketPrice = this.chargingOption === 'fixedPrice' ? 0 : {}
    },
  },
  async mounted() {
    const eventId = this.$route.params.eventId
    if (eventId === 'new') return
    this.isNew = false
    try {
      const getEventRes = await apiClientGetEvent(eventId)
      this.eventInfo = getEventRes.data.product
      this.setInput()
      if (!getEventRes.data.success) {
        throw getEventRes.data.message
      }
    } catch (error) {
      this.$showError('載入節目資料失敗')
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  methods: {
    setInput() {
      this.title = this.eventInfo.title
      this.is_enabled = this.eventInfo.is_enabled
      this.organizer = this.eventInfo.organizer
      this.venue = this.eventInfo.venue
      this.discount = this.eventInfo.discount
      this.category = this.eventInfo.category
      this.tag = this.eventInfo.tag
      this.description = this.eventInfo.description
      this.mainImagePreview = this.eventInfo.imageUrl
      this.imagesUrl = this.eventInfo.imagesUrl
      if (typeof this.eventInfo.ticketPrice === 'number') {
        this.chargingOption = 'fixedPrice'
        this.fixedPrice = this.eventInfo.ticketPrice
      } else {
        this.chargingOption = 'seatPrice'
        this.$nextTick().then(
          () => (this.ticketPrice = { ...this.eventInfo.ticketPrice })
        )
      }
      if (Array.isArray(this.eventInfo.dateTime)) {
        this.dateOption = 'selectedDate'
        this.selectedDates = JSON.parse(JSON.stringify(this.eventInfo.dateTime))
        // this.selectedDate.date
      } else {
        this.dateOption = 'period'
        this.range.start = this.eventInfo.dateTime.start
        this.range.end = this.eventInfo.dateTime.end
        this.range.startTime = this.eventInfo.dateTime.startTime
        this.range.endTime = this.eventInfo.dateTime.endTime
      }
      //   if(typeof this.eventInfo.ticketPrice === 'object'){

      //   }
    },
    addSelectedDate() {
      // this.selectedDate.date === '' ||
      if (
        this.selectedDate.date === '' ||
        this.selectedDate.endTime === '' ||
        this.selectedDate.startTime === ''
      ) {
        alert('請選擇單一日期和時段')
        return
      }
      // By default, date will be today,
      // but type is object and we have to format it as string
      if (typeof this.selectedDate.date !== 'string') {
        this.selectedDate.date = moment().format('YYYY-MM-DD')
      }
      this.selectedDates.push({
        ...this.selectedDate,
        timestamp: new Date().getTime(),
      })
      this.selectedDate = {
        date: new Date(),
        startTime: '',
        endTime: '',
      }
    },
    removeDate(date, hide) {
      this.dates = this.dates.filter((d) => d !== date)
      hide()
    },
    dateSelected(e, date, toggle) {
      this.selected = date
      toggle({ ref: e.target })
    },
    clearAllDateInput() {
      this.selectedDate = {
        date: new Date(),
        startTime: '',
        endTime: '',
      }
      this.range = {
        start: new Date(),
        end: new Date(),
        startTime: '',
        endTime: '',
      }
    },
    deleteSelectedDate(index) {
      this.selectedDates.splice(index, 1)
    },
    // end of v-calendar
    addTicketPrice() {
      if (this.seatZone === '' || this.seatZonePrice === 0) {
        alert('請填寫區域和票價！')
        return
      }
      this.$set(this.ticketPrice, this.seatZone, this.seatZonePrice)
      this.seatZone = ''
      this.seatZonePrice = 0
    },
    deleteSeatPrice(zone) {
      this.$delete(this.ticketPrice, zone)
    },
    validateDateTime() {
      if (Object.values(this.dateTime).includes('')) {
        alert('請填寫節目日期、開始和結束時間')
        return
      }
      this.dateTime = {
        eventDate: '',
        eventStartTime: '',
        eventEndTime: '',
      }
    },
    deleteEventDateTime(index) {
      this.allDates.splice(index, 1)
    },
    addImage(e) {
      this.mainImage = e.target.files[0]
      console.log(e.target.files[0])
    },
    uploadImage() {
      if (this.mainImage === '') {
        console.log('請選擇圖片')
        return
      }
      const form = new FormData()
      form.append('', this.mainImage)
      const AUTH_TOKEN =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI1NDA5MTg4LCJ1c2VyX2lkIjoiR3BVME9VZU1JYk9WSGo4b1E3RVkzc0lONmRKMiIsInN1YiI6IkdwVTBPVWVNSWJPVkhqOG9RN0VZM3NJTjZkSjIiLCJpYXQiOjE2MjU0MDkxODgsImV4cCI6MTYyNTg0MTE4OCwiZW1haWwiOiJhbHlzYWNoYW44MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWx5c2FjaGFuODMwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.aquUuQ1goSLkyJKcwWKx4LDj37f8ajbfL9jC5P7JGBeGM2PV0QHfQavxpmyX2Bw46wYQ5DuN7FPQFqGVR7jDZtqaxZddHOE52Ht_pbBStrM89-f2ALgIrR8nOAwCXJjIEChDGBjAQi0jM_GTzREbz3UzuFydZgRRazuo9Ctc1qidt9qEnkY1G6yqBxoO50RGX-h9oYVXJTvmblxw2hEPUkx4jtF4-Zt5cICSQe1IT_IMiJef2JbTLpVKP2InLYh0YQJkg656aUdY6GXYTGZi6F3SZHCVg0x-cLG_wEZpzx7fzvQhiYD5pSC4kIcxuucuXdT1r7kbk9I9JGAvJ6CxYg'
      axios.defaults.headers.common.Authorization = AUTH_TOKEN
      axios
        .post(
          `https://vue3-course-api.hexschool.io/api/${process.env.API_PATH}/admin/upload`,
          form
        )
        .then((res) => {
          console.log(res)
          this.mainImage = ''
          this.$refs.mainImage.value = ''
          this.mainImagePreview = res.data.imageUrl
          this.imageUrl = res.data.imageUrl
        })
        .catch((err) => console.log(err))
    },
    addSubImage(e) {
      this.subImage = e.target.files[0]
      console.log(e.target.files[0])
    },
    uploadSubImage() {
      if (this.subImage === '') {
        console.log('請選擇圖片')
        return
      }
      const form = new FormData()
      form.append('', this.subImage)
      const AUTH_TOKEN =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI1NDA5MTg4LCJ1c2VyX2lkIjoiR3BVME9VZU1JYk9WSGo4b1E3RVkzc0lONmRKMiIsInN1YiI6IkdwVTBPVWVNSWJPVkhqOG9RN0VZM3NJTjZkSjIiLCJpYXQiOjE2MjU0MDkxODgsImV4cCI6MTYyNTg0MTE4OCwiZW1haWwiOiJhbHlzYWNoYW44MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWx5c2FjaGFuODMwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.aquUuQ1goSLkyJKcwWKx4LDj37f8ajbfL9jC5P7JGBeGM2PV0QHfQavxpmyX2Bw46wYQ5DuN7FPQFqGVR7jDZtqaxZddHOE52Ht_pbBStrM89-f2ALgIrR8nOAwCXJjIEChDGBjAQi0jM_GTzREbz3UzuFydZgRRazuo9Ctc1qidt9qEnkY1G6yqBxoO50RGX-h9oYVXJTvmblxw2hEPUkx4jtF4-Zt5cICSQe1IT_IMiJef2JbTLpVKP2InLYh0YQJkg656aUdY6GXYTGZi6F3SZHCVg0x-cLG_wEZpzx7fzvQhiYD5pSC4kIcxuucuXdT1r7kbk9I9JGAvJ6CxYg'
      axios.defaults.headers.common.Authorization = AUTH_TOKEN
      axios
        .post(
          `https://vue3-course-api.hexschool.io/api/${process.env.API_PATH}/admin/upload`,
          form
        )
        .then((res) => {
          console.log(res)
          this.subImage = ''
          this.$refs.subImage.value = ''
          this.imagesUrl.push(res.data.imageUrl)
        })
        .catch((err) => console.log(err))
    },
    submitEvent() {
      if (this.dateOption === 'period') {
        if (typeof this.range.start !== 'string') {
          this.range.start = moment().format('YYYY-MM-DD')
        } else if (typeof this.range.end !== 'string') {
          this.range.end = moment().format('YYYY-MM-DD')
        }
      }
      const info = {
        data: {
          title: this.title,
          category: this.category,
          description: this.description,
          is_enabled: Number(this.is_enabled),
          imageUrl: this.imageUrl,
          imagesUrl: this.imagesUrl,
          // Note: 需預先判斷selectedDates此陣列是不是已經有資料
          dateTime:
            this.dateOption === 'period' ? this.range : this.selectedDates,
          organizer: this.organizer,
          venue: this.venue,
          // Note: 需預先判斷 ticketPrice 如果是物件，裏面是不是已經有資料
          ticketPrice: this.ticketPrice,
          discount: this.discount,
          tag: this.tag,
          // 以下資料雖然將不會使用，但是這些也是API必須要傳的參數
          origin_price: 0,
          price: 0,
          unit: '張',
        },
      }
      console.log(info)

      const AUTH_TOKEN =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI1NDA5MTg4LCJ1c2VyX2lkIjoiR3BVME9VZU1JYk9WSGo4b1E3RVkzc0lONmRKMiIsInN1YiI6IkdwVTBPVWVNSWJPVkhqOG9RN0VZM3NJTjZkSjIiLCJpYXQiOjE2MjU0MDkxODgsImV4cCI6MTYyNTg0MTE4OCwiZW1haWwiOiJhbHlzYWNoYW44MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWx5c2FjaGFuODMwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.aquUuQ1goSLkyJKcwWKx4LDj37f8ajbfL9jC5P7JGBeGM2PV0QHfQavxpmyX2Bw46wYQ5DuN7FPQFqGVR7jDZtqaxZddHOE52Ht_pbBStrM89-f2ALgIrR8nOAwCXJjIEChDGBjAQi0jM_GTzREbz3UzuFydZgRRazuo9Ctc1qidt9qEnkY1G6yqBxoO50RGX-h9oYVXJTvmblxw2hEPUkx4jtF4-Zt5cICSQe1IT_IMiJef2JbTLpVKP2InLYh0YQJkg656aUdY6GXYTGZi6F3SZHCVg0x-cLG_wEZpzx7fzvQhiYD5pSC4kIcxuucuXdT1r7kbk9I9JGAvJ6CxYg'
      axios.defaults.headers.common.Authorization = AUTH_TOKEN
      axios
        .post(
          `https://vue3-course-api.hexschool.io/api/${process.env.API_PATH}/admin/product`,
          info
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
    },
  },
}
</script>

<style lang="scss" scoped>
.description {
  resize: none;
}

.preview-image-h {
  max-height: 240px;
}

.sub-image-wrap {
  overflow: scroll;
  height: 364px;
}
</style>
