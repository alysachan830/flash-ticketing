/* eslint-disable no-unused-vars */
import axios from 'axios'
import { clientGetProduct } from './clientGetProduct'
// const apiPath = process.env.API_PATH
// const apiBaseUrl = process.env.API_BASE_URL
const apiPath = process.env.apiPath
const apiBaseUrl = process.env.apiBaseUrl

// Create axios instance

axios.interceptors.response.use(
  (res) => {
    if (!res.data.success) {
      const errorMsg = res.data.message
      throw new Error(errorMsg)
    }
    return res
  },
  (err) => {
    // throw error
    return Promise.reject(err)
  }
)

// Set auth header
function setAuthHeaders(axiosInstance, token) {
  axiosInstance.defaults.headers.common.Authorization = token
}

// Client request
const clientRequest = axios.create({
  baseURL: `${apiBaseUrl}/api/${apiPath}`,
})

// Admin sign in
const adminSignIn = axios.create({
  baseURL: apiBaseUrl,
})

// Admin request
const adminRequest = axios.create({
  baseURL: `${apiBaseUrl}/api/${apiPath}/admin/`,
})

clientRequest.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    // Do something with request error
    // console.log('it has error:')
    // console.log(error)
    return Promise.reject(error)
  }
)

adminRequest.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      Authorization:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjI0ODc4MzU1LCJ1c2VyX2lkIjoiR3BVME9VZU1JYk9WSGo4b1E3RVkzc0lONmRKMiIsInN1YiI6IkdwVTBPVWVNSWJPVkhqOG9RN0VZM3NJTjZkSjIiLCJpYXQiOjE2MjQ4NzgzNTUsImV4cCI6MTYyNTMxMDM1NSwiZW1haWwiOiJhbHlzYWNoYW44MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWx5c2FjaGFuODMwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TAAlAiRfBLVc5mtnKc1i9YvzLLW3ZUyDu8M0E6Ar4jtHPGsNy_InzKWGqJ4vc368ccFtOCLsLRye2myyvkJDriMQrh-Tv2H4ad34YZekYd6Y-KhapafslZm0sboUrCj56sAPKSk1kAuB0k9vCMv5bnWl0jIIdU-Q-nFWdAgw3XjxeG0HFjalQ0WAM6h0BtG8pB94MSzgn2S4xvtG2KxbpSCI64RRGRqDwoJYx5cqUmGh7qWuMdvYRoVyd6vc7-EvIyf7509Cabdc0DoxbIkPnDLJywBfZ_BwN1rmtu3l9I7qOYmq1SJZsADin3u3HkGa0RhTIDh88UD-k8KWFgPQPA',
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Forestage API
// export const apiClientGetProduct = clientGetProduct()
export const apiClientGetProduct = clientGetProduct
export const apiClientGetAllEvents = () => clientRequest.get('/products/all')
export const apiClientGetEvent = (id) => clientRequest.get(`/product/${id}`)
export const apiClientGetCart = () => clientRequest.get('/cart')
export const apiClientAddCart = (data) => clientRequest.post('/cart', data)
export const apiClientUpdateCart = (id, data) =>
  clientRequest.put(`/cart/${id}`, data)
export const apiClientApplyCoupon = (data) =>
  clientRequest.post('/coupon', data)
export const apiClientDeleteAllCart = () => clientRequest.delete('/carts')
// export const apiClientGetProduct = (pageNum) =>
//   clientRequest.get(`/products?page=${pageNum}`)

// Complete API
// Backstage API
export const apiAdminSignIn = (data) => adminSignIn.post('/admin/signin', data)
export const apiCheckSignIn = () => adminSignIn.post('/api/user/check')
export const apiAdminCheckSignIn = () => adminSignIn.post('/api/user/check')
export const apiAdminGetProducts = (pageNum) =>
  adminRequest.get(`/products?page=${pageNum}`)
export const apiAdminGetAllProducts = () => adminRequest.get(`/products/all`)
export const apiAdminAddProduct = (data) => adminRequest.post(`/product`, data)
export const apiAdminEditProduct = (id, data) =>
  adminRequest.put(`/product/${id}`, data)
export const apiAdminDeleteProduct = (id) =>
  adminRequest.delete(`/product/${id}`)
export const apiAdminAddArticle = (data) => adminRequest.post(`/article`, data)
