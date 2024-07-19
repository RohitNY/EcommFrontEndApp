import { ProductFetchError } from '~/helpers/customErrors.js'
import { AnalyticEvent } from '~/helpers/utility.js'

const STATUS = Object.freeze({
  1: 'NETWORK_START',
  2: 'NETWORK_FAIL',
  3: 'NETWORK_SUCCESS'
})

export const state = () => ({
  status: 'NETWORK_START | NETWORK_FAIL | NETWORK_SUCCESS',
  activePage: null
})

export const actions = {
  fetchPage ({ commit, state, rootGetters }, slug) {
    commit('SET_STATUS', 1)

    const setup = rootGetters['app/getPagePathExperienceBySlug'](slug)
    if (!setup || !setup.DataUri) {
      commit('SET_STATUS', 2)
      throw new ProductFetchError()
    } else {
      /* if products are available in session just return */
      if (state[slug]) {
        commit('SET_STATUS', 3)
        commit('SET_ACTIVE_PAGE', slug)

        return Promise.resolve('RETURN_STORED_PRODUCTS')
      }

      /* otherwise fetch products from API */
      return this.$api
        .get(setup.DataUri)
        .then(({ data, status }) => {
          if (status === 200) {
            commit('SET_STATUS', 3)
            commit('SET_PRODUCTS', { slug, data })

            AnalyticEvent('onTabItemsLoaded', {
              pageData: data.AnalyticsData,
              items: data.Items
            })

            // this.$router.app._route.query.tn
            if (location.hash.includes(slug)) {
              commit('SET_ACTIVE_PAGE', slug)
            }
          } else {
            commit('SET_STATUS', 2)
            throw new ProductFetchError()
          }
        })
        .catch(() => {
          commit('SET_STATUS', 2)
          AnalyticEvent('onTabItemsLoadedAttempted', {
            item: setup
          })

          throw new ProductFetchError()
        })
    }
  }
}

export const mutations = {
  SET_ACTIVE_PAGE (state, slug) {
    state.activePage = slug
  },
  SET_PRODUCTS (state, { slug, data }) {
    state[slug] = data
  },
  SET_STATUS (state, status) {
    state.status = STATUS[status]
  }
}

export const getters = {
  getActivePageData (state) {
    return state.activePage && state[state.activePage]
  },
  getStatus (state) {
    return state.status
  },
  getStatusEqSuccess (state) {
    return state.status === STATUS[3]
  }
}
