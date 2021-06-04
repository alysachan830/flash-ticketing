/* eslint-disable no-unused-vars */
import axios from 'axios'
import { clientGetProduct } from './clientGetProduct'
const apiPath = process.env.API_PATH
const apiBaseUrl = process.env.API_BASE_URL

export const apiClientGetProduct = clientGetProduct
// Create axios instance

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

// Forestage API
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
