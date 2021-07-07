<template>
  <div>
    <h2 class="font-xl mb-13">新增文章</h2>
    <div class="row mb-16">
      <div class="col-6">
        <!-- Title -->
        <div class="mb-3">
          <label for="title" class="form-label"
            ><span class="text-danger">*</span>文章標題</label
          >
          <input
            id="title"
            v-model.trim="title"
            type="text"
            class="form-control"
          />
        </div>
        <!-- Is public -->
        <div class="form-check mb-8">
          <input
            id="flexCheckDefault"
            v-model="isPublic"
            class="form-check-input"
            type="checkbox"
            value=""
          />
          <label class="form-check-label" for="flexCheckDefault">
            是否發佈
          </label>
        </div>
        <div class="row mb-8">
          <!-- Author -->
          <div class="col">
            <div>
              <label for="author" class="form-label"
                ><span class="text-danger">*</span>作者</label
              >
              <input
                id="author"
                v-model.trim="author"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <!-- Job title -->
          <div class="col">
            <div>
              <label for="authorJobTitle" class="form-label"
                >作者頭銜／職稱</label
              >
              <input
                id="authorJobTitle"
                v-model.trim="authorJobTitle"
                type="text"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <!-- Event title -->
        <div class="mb-8">
          <label for="eventTitle" class="form-label">節目名稱</label>
          <input
            id="eventTitle"
            v-model.trim="eventTitle"
            type="text"
            class="form-control"
          />
        </div>
        <!-- Rating -->
        <div class="row">
          <div class="col-3">
            <div class="mb-3">
              <label for="rating" class="form-label"
                >節目評分 <br />
                <span class="font-s text-info"
                  >1（最低）- 5（最高）</span
                ></label
              >
              <select
                id="rating"
                v-model="rating"
                name="rating"
                class="form-select"
                aria-label="Default select rating"
              >
                <option v-for="n in 5" :key="n" :value="n">
                  {{ n }}
                </option>
              </select>
              <!-- <input
                id="rating"
                v-model="rating"
                type="number"
                class="form-control"
              /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 offset-1">
        <div class="mb-8">
          <h3 class="font-m mb-3">已上傳圖片</h3>
          <span class="text-danger d-block font-s">*圖片大小必須少於 1MB</span>
          <span class="text-danger d-block font-s"
            >*檔案名稱長度必須少於32</span
          >
        </div>
        <!-- Cover image -->
        <div class="mb-16">
          <span class="badge bg-info mb-3">封面圖片（建議使用橫幅圖片） </span>
          <img
            :src="coverImagePreview"
            alt=""
            class="preview-cover-image-h mb-6"
          />
          <div class="input-group">
            <input
              id="coverImageInput"
              ref="coverImage"
              type="file"
              class="form-control"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              @change="addImage"
            />
            <button
              id="coverImage"
              class="btn btn-outline-primary"
              type="button"
              @click="uploadImage"
            >
              上傳
            </button>
          </div>
        </div>
        <!-- Author's avatar -->
        <div>
          <span class="badge bg-info mb-3">作者頭像 </span>
          <img :src="avatarPreview" alt="" class="preview-avatar-h mb-6" />
          <div class="input-group">
            <input
              id="avatarInput"
              ref="avatar"
              type="file"
              class="form-control"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              @change="addImage"
            />
            <button
              id="avatar"
              class="btn btn-outline-primary"
              type="button"
              @click="uploadImage"
            >
              上傳
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="mb-6">
      <h3 class="font-l mb-13">文章內容</h3>
      <ckeditor
        v-model="editorData"
        :editor="editor"
        :config="editorConfig"
      ></ckeditor>
    </div>
    <div class="text-end">
      <button type="button" class="btn btn-primary" @click="createArticle">
        新增文章
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { apiAdminAddArticle } from '~/api/index'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// Node 無 window 物件，因此不能用以上官方方式載入 ckeditor classic 的樣式
let ClassicEditor
if (process.browser) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
}

export default {
  //   name: 'app',
  layout: 'dashboard',
  data() {
    return {
      title: '',
      isPublic: true,
      author: '',
      authorJobTitle: '',
      eventTitle: '',
      rating: 1,
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        ckfinder: {
          uploadUrl: `https://vue3-course-api.hexschool.io/api/vuepractice/admin/upload`,
          // 後端的上傳圖片 API 路徑
          options: {
            resourceType: 'Images',
            // 限定類型為圖片
          },
        },
        // The configuration of the editor.
      },
      coverImage: '',
      coverImagePreview: '',
      avatar: '',
      avatarPreview: '',
    }
  },
  methods: {
    addImage(e) {
      console.log(e.target.files[0])
      switch (e.target.id) {
        case 'coverImageInput':
          this.coverImage = e.target.files[0]
          break
        case 'avatarInput':
          this.avatar = e.target.files[0]
          break
        // no default
        //   console.log(e.target.id)
        //   this.coverImage = e.target.files[0]
        //   console.log(e.target.files[0])
      }
    },
    uploadImage(e) {
      const img = e.target.id
      if (this[img] === '') {
        alert('請選擇圖片')
        return
      }
      const form = new FormData()
      form.append('', this[img])
      const AUTH_TOKEN =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI0ODc4MzU1LCJ1c2VyX2lkIjoiR3BVME9VZU1JYk9WSGo4b1E3RVkzc0lONmRKMiIsInN1YiI6IkdwVTBPVWVNSWJPVkhqOG9RN0VZM3NJTjZkSjIiLCJpYXQiOjE2MjQ4NzgzNTUsImV4cCI6MTYyNTMxMDM1NSwiZW1haWwiOiJhbHlzYWNoYW44MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWx5c2FjaGFuODMwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TAAlAiRfBLVc5mtnKc1i9YvzLLW3ZUyDu8M0E6Ar4jtHPGsNy_InzKWGqJ4vc368ccFtOCLsLRye2myyvkJDriMQrh-Tv2H4ad34YZekYd6Y-KhapafslZm0sboUrCj56sAPKSk1kAuB0k9vCMv5bnWl0jIIdU-Q-nFWdAgw3XjxeG0HFjalQ0WAM6h0BtG8pB94MSzgn2S4xvtG2KxbpSCI64RRGRqDwoJYx5cqUmGh7qWuMdvYRoVyd6vc7-EvIyf7509Cabdc0DoxbIkPnDLJywBfZ_BwN1rmtu3l9I7qOYmq1SJZsADin3u3HkGa0RhTIDh88UD-k8KWFgPQPA'
      axios.defaults.headers.common.Authorization = AUTH_TOKEN
      // const config = {
      //   data: form,
      //   headers: {
      //     Authorization:
      //       'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI0ODc4MzU1LCJ1c2VyX2lkIjoiR3BVME9VZU1JYk9WSGo4b1E3RVkzc0lONmRKMiIsInN1YiI6IkdwVTBPVWVNSWJPVkhqOG9RN0VZM3NJTjZkSjIiLCJpYXQiOjE2MjQ4NzgzNTUsImV4cCI6MTYyNTMxMDM1NSwiZW1haWwiOiJhbHlzYWNoYW44MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWx5c2FjaGFuODMwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TAAlAiRfBLVc5mtnKc1i9YvzLLW3ZUyDu8M0E6Ar4jtHPGsNy_InzKWGqJ4vc368ccFtOCLsLRye2myyvkJDriMQrh-Tv2H4ad34YZekYd6Y-KhapafslZm0sboUrCj56sAPKSk1kAuB0k9vCMv5bnWl0jIIdU-Q-nFWdAgw3XjxeG0HFjalQ0WAM6h0BtG8pB94MSzgn2S4xvtG2KxbpSCI64RRGRqDwoJYx5cqUmGh7qWuMdvYRoVyd6vc7-EvIyf7509Cabdc0DoxbIkPnDLJywBfZ_BwN1rmtu3l9I7qOYmq1SJZsADin3u3HkGa0RhTIDh88UD-k8KWFgPQPA',
      //   },
      // }
      axios
        .post(
          'https://vue3-course-api.hexschool.io/api/vuepractice/admin/upload',
          form
        )
        .then((res) => {
          console.log(res)
          this[img] = ''
          this.$refs[img].value = ''
          this[`${img}Preview`] = res.data.imageUrl
          //   this.imageUrl = res.data.imageUrl
        })
        .catch((err) => console.log(err))
    },
    // uploadImage() {
    //   if (this.coverImage === '') {
    //     alert('請選擇圖片')
    //     return
    //   }
    //   const form = new FormData()
    //   form.append('', this.coverImage)
    //   const AUTH_TOKEN =
    //     'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI0ODc4MzU1LCJ1c2VyX2lkIjoiR3BVME9VZU1JYk9WSGo4b1E3RVkzc0lONmRKMiIsInN1YiI6IkdwVTBPVWVNSWJPVkhqOG9RN0VZM3NJTjZkSjIiLCJpYXQiOjE2MjQ4NzgzNTUsImV4cCI6MTYyNTMxMDM1NSwiZW1haWwiOiJhbHlzYWNoYW44MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWx5c2FjaGFuODMwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TAAlAiRfBLVc5mtnKc1i9YvzLLW3ZUyDu8M0E6Ar4jtHPGsNy_InzKWGqJ4vc368ccFtOCLsLRye2myyvkJDriMQrh-Tv2H4ad34YZekYd6Y-KhapafslZm0sboUrCj56sAPKSk1kAuB0k9vCMv5bnWl0jIIdU-Q-nFWdAgw3XjxeG0HFjalQ0WAM6h0BtG8pB94MSzgn2S4xvtG2KxbpSCI64RRGRqDwoJYx5cqUmGh7qWuMdvYRoVyd6vc7-EvIyf7509Cabdc0DoxbIkPnDLJywBfZ_BwN1rmtu3l9I7qOYmq1SJZsADin3u3HkGa0RhTIDh88UD-k8KWFgPQPA'
    //   axios.defaults.headers.common.Authorization = AUTH_TOKEN
    //   // const config = {
    //   //   data: form,
    //   //   headers: {
    //   //     Authorization:
    //   //       'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI0ODc4MzU1LCJ1c2VyX2lkIjoiR3BVME9VZU1JYk9WSGo4b1E3RVkzc0lONmRKMiIsInN1YiI6IkdwVTBPVWVNSWJPVkhqOG9RN0VZM3NJTjZkSjIiLCJpYXQiOjE2MjQ4NzgzNTUsImV4cCI6MTYyNTMxMDM1NSwiZW1haWwiOiJhbHlzYWNoYW44MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWx5c2FjaGFuODMwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TAAlAiRfBLVc5mtnKc1i9YvzLLW3ZUyDu8M0E6Ar4jtHPGsNy_InzKWGqJ4vc368ccFtOCLsLRye2myyvkJDriMQrh-Tv2H4ad34YZekYd6Y-KhapafslZm0sboUrCj56sAPKSk1kAuB0k9vCMv5bnWl0jIIdU-Q-nFWdAgw3XjxeG0HFjalQ0WAM6h0BtG8pB94MSzgn2S4xvtG2KxbpSCI64RRGRqDwoJYx5cqUmGh7qWuMdvYRoVyd6vc7-EvIyf7509Cabdc0DoxbIkPnDLJywBfZ_BwN1rmtu3l9I7qOYmq1SJZsADin3u3HkGa0RhTIDh88UD-k8KWFgPQPA',
    //   //   },
    //   // }
    //   axios
    //     .post(
    //       'https://vue3-course-api.hexschool.io/api/vuepractice/admin/upload',
    //       form
    //     )
    //     .then((res) => {
    //       console.log(res)
    //       this.coverImage = ''
    //       this.$refs.coverImage.value = ''
    //       this.coverImagePreview = res.data.imageUrl
    //       this.imageUrl = res.data.imageUrl
    //     })
    //     .catch((err) => console.log(err))
    // },
    async createArticle() {
      if (this.title === '' || this.author === '' || this.content === '') {
        alert('請填寫文章標題、作者以及內容')
        return
      }
      const info = {
        data: {
          title: this.title,
          image: this.coverImagePreview,
          create_at: new Date().getTime(),
          author: this.author,
          isPublic: this.isPublic,
          content: this.editorData,
          authorJobTitle: this.authorJobTitle,
          eventTitle: this.eventTitle,
          rating: this.rating,
          avatarImage: this.avatarPreview,
        },
      }
      //   console.log(info)
      try {
        const res = await apiAdminAddArticle(info)
        console.log(res.data)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.preview-cover-image-h {
  max-height: 240px;
}

.preview-avatar-h {
  max-height: 180px;
}
</style>
