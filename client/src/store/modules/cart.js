import api from '@/api/api'

const state = {
  carts: [],
  isLoading: true
}

const getters = {}

const actions = {
  create({ commit }, payload) {
    const { quantity, totalPrice, productId } = payload
    return new Promise(async (resolve, reject) => {
      try {
        const { data: cart } = await api({
          method: 'post',
          url: '/carts/create',
          data: {
            productId,
            quantity,
            totalPrice
          },
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        commit('setCarts', cart)
        resolve(cart)
      } catch (err) {
        reject(err)
      }
    })
  },
  async findAll({ commit }) {
    const { data: carts } = await api({
      method: 'get',
      url: '/carts',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
    console.log('actions')
    console.log(carts)
    commit('findAll', carts)
  },
  updateQty({ state }, payload) {
    console.log('************8')
    console.log(state, payload)
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api({
          method: 'patch',
          url: `/carts/${payload.id}/updateQty`,
          data: {
            quantity: payload.qty
          },
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}

const mutations = {
  setCarts(state, payload) {
    state.carts.push(payload)
    state.isLoading = false
  },
  findAll(state, payload) {
    state.carts = payload
    state.isLoading = false
  },
  updateQty(state, payload) {
    const selectedCart = state.carts.find(cart => cart._id == payload.id)
    selectedCart.quantity = payload.qty
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
