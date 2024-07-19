import { ProductFetchError } from '~/helpers/customErrors.js'
import { AnalyticEvent } from '~/helpers/utility.js'

const STATUS = Object.freeze({
  1: 'NETWORK_START',
  2: 'NETWORK_FAIL',
  3: 'NETWORK_SUCCESS'
})

export const state = () => ({
  status: 'NETWORK_START | NETWORK_FAIL | NETWORK_SUCCESS'
})

export const actions = {
  fetchSmlt ({ commit, state }, adunit) {
    commit('SET_STATUS', 1)

    const smltUri = adunit.Smlt ? adunit.Smlt.Uri : null

    if (state[smltUri]) {
      commit('SET_STATUS', 3)
      return Promise.resolve()
    }

    /* otherwise fetch products from API */
    return this.$api
      .get(smltUri)
      .then(({ data, status }) => {
        if (status === 200) {
          commit('SET_STATUS', 3)
          commit('SET_PRODUCTS', { smltUri, data })

          AnalyticEvent('onSmltItemsLoaded', {
            adunit,
            response: data,
            items: data.Items || []
          })
        } else {
          AnalyticEvent('onSmltItemsLoadedAttempted', { adunit })

          commit('SET_STATUS', 2)
          throw new ProductFetchError()
        }
      })
      .catch(() => {
        AnalyticEvent('onSmltItemsLoadedAttempted', { adunit })

        commit('SET_STATUS', 2)
        throw new ProductFetchError()
      })
  }
}

export const mutations = {
  SET_PRODUCTS (state, { data }) {
    state[data.Id] = data
  },
  SET_STATUS (state, status) {
    state.status = STATUS[status]
  }
}

export const getters = {
  getItems (state) {
    return id => state[id]
  },
  getItemById (state) {
    return id =>
      Object.entries(state).find(([smltId, smltRespObj]) => {
        return smltRespObj.Id === id
      })
  }
}
