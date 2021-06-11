// import axios from 'axios'
// // const apiPath = process.env.API_PATH
// // const apiBaseUrl = process.env.API_BASE_URL
// const apiPath = process.env.apiPath
// const apiBaseUrl = process.env.apiBaseUrl

// const productReq = axios.create({
//   baseURL: `${apiBaseUrl}/api/${apiPath}`,
// })

// productReq.interceptors.response.use(
//   (res) => {
//     if (!res.data.success) {
//       const errorMsg = res.data.message
//       throw new Error(errorMsg)
//     }
//     return res
//   },
//   (err) => {
//     // throw error
//     return Promise.reject(err)
//   }
// )


// export const clientGetProduct = () =>
//   productReq.get(`/products?page=1`)
import axios from 'axios'

export const clientGetProduct = (url, path) => {
  const productReq = axios.create({
    baseURL: `${url}/api/${path}`,
  })

  productReq.interceptors.response.use(
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


  return productReq.get(`/products?page=1`)
}