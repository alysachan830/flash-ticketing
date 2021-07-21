import {
  apiClientGetAllEvents,
  apiClientGetCart,
  apiAdminSignIn,
  apiAdminGetAllProducts,
} from '@/api/index'

export const state = () => ({
  events: [],
  hotEvents: [],
  newEvents: [],
  carts: [],
  isSignIn: false,
  adminEvents: [],
  adminEditingOrder: {},
  adminEditingCoupon: {},
  cartInfo: {},
})

export const actions = {
  async getAllEvents({ commit }) {
    try {
      const allEventsRes = await apiClientGetAllEvents()
      commit({ type: 'AddAllEvents', list: allEventsRes.data.products })
    } catch (error) {
      throw new Error(error)
    }
  },
  async getCart({ commit }) {
    try {
      const cartRes = await apiClientGetCart()
      commit({ type: 'SetCart', cartInfo: cartRes.data.data })
    } catch (error) {
      throw new Error(error)
    }
  },
  checkSignIn({ commit }, hasCookie) {
    commit('SetSignInStatus', hasCookie)
  },
  async signIn({ commit }, payload) {
    try {
      const { username, password } = payload
      const signInRes = await apiAdminSignIn({ username, password })
      if (!signInRes.data.success) {
        throw new Error(signInRes.data.message)
      }
      commit('SetAuth', signInRes)
    } catch (error) {
      throw new Error(error)
    }
  },
  async adminGetAllEvents({ commit }, token) {
    try {
      const getProductsRes = await apiAdminGetAllProducts(token)
      if (!getProductsRes.data.success) {
        throw new Error(getProductsRes.data.message)
      }
      commit('SetAdminEvents', getProductsRes)
    } catch (error) {
      // Something wrong with user's token
      // User's token may be expired or user deleted the token
      // It means that user has not signed in yet

      // Reset isSignIn to false
      commit('SetSignInStatus', false)

      // Remove all cookie
      this.$cookies.removeAll()
      this.$router.push('/login')
    }
  },
  adminEditOrder({ commit }, order) {
    commit('SetAdminEditingOrder', order)
  },
  adminEditCoupon({ commit }, coupon) {
    commit('SetAdminEditingCoupon', coupon)
  },
}

export const mutations = {
  AddAllEvents(state, payload) {
    // For objects, Vue cannot detect property addition or deletion. Need to use spread operator for updating object
    // see https://vuex.vuejs.org/zh/guide/mutations.html
    state.events = [...payload.list]
  },
  SetCart(state, payload) {
    // state.cartFinalTotal = payload.cartInfo.final_total
    state.cartFinalTotal = payload.cartInfo.total
    state.carts = [...payload.cartInfo.carts]
    state.cartInfo = JSON.parse(JSON.stringify(payload.cartInfo))
  },
  SetAuth(state, signInRes) {
    this.$cookies.set(
      'flashTicketingAuth',
      { token: signInRes.data.token },
      { expires: signInRes.data.expired }
    )
    state.isSignIn = true
  },
  SetSignInStatus(state, hasCookie) {
    state.isSignIn = hasCookie
  },
  SetAdminEvents(state, getProductsRes) {
    const allEvents = Object.keys(getProductsRes.data.products).map(
      (key) => getProductsRes.data.products[key]
    )
    state.adminEvents = allEvents
  },
  SetAdminEditingOrder(state, order) {
    state.adminEditingOrder = JSON.parse(JSON.stringify(order))
  },
  SetAdminEditingCoupon(state, coupon) {
    state.adminEditingCoupon = JSON.parse(JSON.stringify(coupon))
  },
}

export const getters = {
  allEvents: (state) => state.events,
  hotEvents: (state) => state.events.filter((event) => event.tag === 'hottest'),
  newEvents: (state) => state.events.filter((event) => event.tag === 'newest'),
  carts: (state) => state.carts,
  cartFinalTotal: (state) => state.cartFinalTotal,
  signInStatus: (state) => state.isSignIn,
  adminEvents: (state) => state.adminEvents,
  adminEditingOrder: (state) => state.adminEditingOrder,
  adminEditingCoupon: (state) => state.adminEditingCoupon,
  cartInfo: (state) => state.cartInfo,
}
