import axios from 'axios'
const apiPath = process.env.apiPath
const apiBaseUrl = process.env.apiBaseUrl

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

// Client axios instance interceptor
clientRequest.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Client API
export const apiClientGetAllEvents = () => clientRequest.get('/products/all')
export const apiClientGetEvent = (id) => clientRequest.get(`/product/${id}`)
export const apiClientGetCart = () => clientRequest.get('/cart')
export const apiClientAddCart = (data) => clientRequest.post('/cart', data)
export const apiClientUpdateCart = (id, data) =>
  clientRequest.put(`/cart/${id}`, data)
export const apiClientApplyCoupon = (data) =>
  clientRequest.post('/coupon', data)
export const apiClientDeleteCart = (id) => clientRequest.delete(`/cart/${id}`)
export const apiClientDeleteAllCart = () => clientRequest.delete('/carts')
export const apiClientSubmitOrder = (data) => clientRequest.post('/order', data)

// Admin API
export const apiAdminSignIn = (data) => adminSignIn.post('/admin/signin', data)
export const apiCheckSignIn = () => adminSignIn.post('/api/user/check')
export const apiAdminLogout = () => adminSignIn.post('/admin/logout')
export const apiAdminCheckSignIn = () => adminSignIn.post('/api/user/check')

export const apiAdminGetAllProducts = (token) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.get('/products/all')
}
export const apiAdminAddProduct = (token, data) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.post(`/product`, data)
}
export const apiAdminEditProduct = (token, id, data) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.put(`/product/${id}`, data)
}
export const apiAdminDeleteProduct = (token, id) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.delete(`/product/${id}`)
}

export const apiAdminUploadImage = (token, formData) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.post('/upload', formData)
}
export const apiAdminGetOrders = (token, pageNum) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.get(`/orders?page=${pageNum}`)
}
export const apiAdminEditOrder = (token, id, data) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.put(`/order/${id}`, data)
}
export const apiAdminDeleteOrder = (token, id) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.delete(`/order/${id}`)
}
export const apiAdminDeleteAllOrders = (token) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.delete('/orders/all')
}
export const apiAdminGetCoupons = (token, pageNum) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.get(`/coupons?page=${pageNum}`)
}

export const apiAdminAddCoupon = (token, data) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.post('/coupon', data)
}

export const apiAdminEditCoupon = (token, id, data) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.put(`/coupon/${id}`, data)
}

export const apiAdminDeleteCoupon = (token, id) => {
  adminRequest.defaults.headers.common.Authorization = token
  return adminRequest.delete(`/coupon/${id}`)
}
