import api from '@/api/api'

const state = {
  isLogin: false
}

const getters = {}

const actions = {
  login ({ commit }, payload) {
    const { email, password } = payload
    return new Promise(async (resolve, reject) => {
      try {
        const { data: user } = await api({
          method: 'post',
          url: '/users/login',
          data: {
            email,
            password
          }
        })
        localStorage.setItem('token', user.token)
        resolve()
        commit('isLogin')
      } catch (err) {
        reject(err)
      }
    })
  },
  register ({ commit }, payload) {
    const { email, password, phoneNumber, address } = payload
    return new Promise(async (resolve, reject) => {
      try {
        const { data: user } = await api({
          method: 'post',
          url: '/users/register',
          data: {
            email,
            password,
            phoneNumber: phoneNumber || '',
            address: address || ''
          }
        })
        localStorage.setItem('token', user.token)
        resolve()
        commit('isLogin')
      } catch (err) {
        reject(err)
      }
    })
  },
  logout ({ commit }) {
    localStorage.clear()
    commit('isLogin')
  }
}

const mutations = {
  isLogin (state) {
    if (localStorage.getItem('token')) {
      state.isLogin = true
    } else {
      state.isLogin = false
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
