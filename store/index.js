import { apiClientGetAllEvents, apiClientGetCart } from '@/api/index'

export const state = () => ({
  events: [],
  hotEvents: [],
  newEvents: [],
  carts: [],
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
      // console.log('---- in vuex----')
      // console.log(cartRes.data.data.carts)
      commit({ type: 'SetCart', cartInfo: cartRes.data.data })
    } catch (error) {
      throw new Error(error)
    }
  },

  // async getEvent({ commit }) {
  //   try {
  //     const eventRes = await apiClientGetEvent()
  //     commit({ type: 'AddAllEvents', list: allEventsRes.data.products })
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // },

  // async getEvent({ commit }) {
  //   try {
  //     const allEventsRes = await apiClientGetAllEvents()
  //     commit({ type: 'AddAllEvents', list: allEventsRes.data.products })
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // },
}

export const mutations = {
  AddAllEvents(state, payload) {
    // For objects, Vue cannot detect property addition or deletion. Need to use spread operator for updating object
    // see https://vuex.vuejs.org/zh/guide/mutations.html
    state.events = [...payload.list]
  },
  SetCart(state, payload) {
    state.cartFinalTotal = payload.cartInfo.final_total
    state.carts = [...payload.cartInfo.carts]
  },
}

export const getters = {
  allEvents: (state) => state.events,
  hotEvents: (state) => state.events.filter((event) => event.tag === 'hottest'),
  newEvents: (state) => state.events.filter((event) => event.tag === 'newest'),
  carts: (state) => state.carts,
  cartFinalTotal: (state) => state.cartFinalTotal,
}
