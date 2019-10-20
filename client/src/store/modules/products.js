import api from '@/api/api'

const state = {
  products: [],
  product: {},
  isLoading: true
}

const getters = {}

const actions = {
  async findAll({ commit }) {
    const { data: products } = await api({
      method: 'get',
      url: `/products`
    })
    commit('setProducts', products)
  },
  create({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: product } = await api({
          method: 'post',
          url: '/products/create',
          headers: {
            access_token: localStorage.getItem('token')
          },
          data: payload
        })
        if (product) {
          resolve(product)
        }
      } catch (err) {
        reject(err)
      }
    })
  },
  destroy({ commit }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: res } = await api({
          method: 'delete',
          url: `/products/${id}/delete`,
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  },
  findOne({ commit }, productId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: product } = await api({
          method: 'get',
          url: `/products/${productId}`
        })
        console.log(product)
        commit('setDetailProduct', product)
        resolve(product)
      } catch (err) {
        reject(err)
      }
    })
  }
}

const mutations = {
  setProducts(state, products) {
    state.products = products
    state.isLoading = false
  },
  setDetailProduct(state, product) {
    state.product = product
    state.isLoading = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
