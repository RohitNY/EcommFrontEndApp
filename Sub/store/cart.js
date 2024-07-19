import get from 'lodash/get'
import { debug, AnalyticEvent } from '~/helpers/utility.js'

const req = (state, action) => (offer = {}) => {
  delete offer._isMultiOffer
  delete offer._title

  const item = state.items.find(item => item.Id === offer.Id) || {}
  const payload = {
    Action: action,
    Payload: {
      CartId: state.cartId || get(window, 'Spectrum.Bootstrap.Cart.Id'),
      OfferCodeSet: item.OfferCodeSet,
      OfferCode: item.OfferCode,
      ...offer
    }
  }
  // debug('info', `Cart ${action} ${JSON.stringify(payload, null, 2)}`)
  return payload
}

/* store */
const STATUS = Object.freeze({
  1: 'NETWORK_START',
  2: 'NETWORK_FAIL',
  3: 'NETWORK_SUCCESS'
})

export const state = () => ({
  status: 'NETWORK_START | NETWORK_FAIL | NETWORK_SUCCESS',
  cartId: window.Spectrum.CartId,
  isFull: false,
  items: [],
  uiNotices: []
})

export const getItemFromCart = (item, cartItems) => {
  return cartItems.find(i => i.OfferCode === item.OfferCode) || false
}

export const actions = {
  init ({ commit }, cart) {
    commit('INIT', cart)
  },
  add ({ commit }, offer) {
    commit('SET_STATUS', 1)
    commit('ADD', offer)
  },
  update ({ commit }, offer) {
    commit('SET_STATUS', 1)
    commit('UPDATE', offer)
  },
  remove ({ commit }, offer) {
    commit('SET_STATUS', 1)
    commit('REMOVE', offer)
  },
  setServerCart ({ commit }, cart) {
    commit('SET_SERVER_CART', cart)
  },
  restoreItems ({ commit }) {
    commit('RESTORE_ITEMS')
  },
  uiNotice ({ commit }, msg) {
    commit('SET_UI_NOTICE', msg)
  },
  uiNoticesClear ({ commit }) {
    commit('CLEAR_UI_NOTICES')
  },
  setStatus ({ commit }, status) {
    if (status === 1) {
      commit('SET_STATUS', status)
    } else {
      setTimeout(() => {
        commit('SET_STATUS', status)
      }, 333)
    }
  }
}

export const mutations = {
  INIT (state, cart) {
    state.cartUri = cart.Uri
    state.isFull = cart.IsFull
    state.items = [].concat(cart.Items || [])
    state.analyticsData = cart.AnalyticsData || {}
    state.copyItems = [].concat(state.items)
  },
  SET_SERVER_CART (state, cart) {
    state.cartId = cart.Id
    state.cartUri = cart.Uri
    state.isFull = cart.IsFull
    state.items = cart.Items || []
    state.uiNotices = cart.UiNotices || []
    state.analyticsData = cart.AnalyticsData || {}

    state.copyItems = [].concat(state.items)
  },
  RESTORE_ITEMS (state) {
    state.items = [].concat(state.copyItems)
  },
  UPDATE (state, offer) {
    const updateReq = req(state, 'UPDATE')(offer)

    this.$api
      .post(state.cartUri, updateReq)
      .then((resp) => {
        AnalyticEvent('onUpdateCartItem', {
          request: updateReq,
          response: resp.data
        })

        this.dispatch('cart/setServerCart', resp.data)
        this.dispatch('modal/open', 'EcomModalMiniCart')
        this.dispatch('cart/setStatus', 3)
      })
      .catch(() => {
        AnalyticEvent('onUpdateCartItemFailed', {
          request: updateReq,
          response: { Items: [].concat(state.items) }
        })

        const product = getItemFromCart(updateReq.Payload, state.items)
        this.dispatch('cart/uiNoticesClear').then(() => {
          this.dispatch('cart/uiNotice', {
            Id: Math.random(),
            Type: 'Danger',
            Msg: `Sorry but we're having technical difficulties updating 
            <b>${product.Title || 'that item'}</b> in your cart at this time. Please try again.`
          })
        })

        debug('error', 'API call failed [Needs UI]')
        this.dispatch('cart/setStatus', 2)
      })
  },
  ADD (state, offer) {
    const productTitle = offer._title
    const item = getItemFromCart(offer, state.items)
    if (item) {
      // debug('error', 'Cannot ADD item which is already in your cart [Needs UI]')
      this.dispatch('cart/uiNoticesClear').then(() => {
        this.dispatch('cart/uiNotice', {
          Id: Math.random(),
          Type: 'Warning',
          Msg: `<b>${item.Title}</b> is already added to your cart.`
        })
      })

      this.dispatch('modal/open', 'EcomModalMiniCart')
      this.dispatch('cart/setStatus', 3)
      return
    }
    const isMultiOffer = offer._isMultiOffer
    if (!isMultiOffer) {
      this.dispatch('modal/open', 'EcomModalMiniCart')
    }

    const addReq = req(state, 'ADD')(offer)
    this.$api
      .post(state.cartUri, addReq)
      .then((resp) => {
        this.dispatch('cart/setServerCart', resp.data)
        this.dispatch('cart/setStatus', 3)

        if (resp.data.IsFull && isMultiOffer) {
          this.dispatch('modal/open', 'EcomModalMiniCart')
        }

        AnalyticEvent('onAddToCart', {
          request: addReq,
          response: resp.data
        })
      })
      .catch(() => {
        debug('error', 'API call failed [Needs UI]')

        const products = window.$ecom.$store.getters['products/getActivePageData']
        AnalyticEvent('onAddToCartFailed', {
          request: addReq,
          response: Object.freeze(products)
        })

        this.dispatch('cart/uiNoticesClear').then(() => {
          this.dispatch('cart/uiNotice', {
            Id: Math.random(),
            Type: 'Danger',
            Msg: `Sorry, something went wrong. Please try adding <b>${productTitle ||
              'that item'}</b> to your cart again.`
          })
        })

        this.dispatch('cart/setStatus', 2)
      })
  },
  REMOVE (state, offer) {
    // remove item prior to API call
    const refItems = [].concat(state.items)
    state.items = state.items.filter(e => e.OfferId !== offer.Id)

    const removeReq = req(state, 'REMOVE')(offer)
    this.$api
      .post(state.cartUri, removeReq)
      .then((resp) => {
        AnalyticEvent('onRemoveFromCart', {
          request: removeReq,
          response: { Items: refItems }
        })

        this.dispatch('cart/setServerCart', resp.data)
        this.dispatch('cart/setStatus', 3)
      })
      .catch(() => {
        debug('error', 'API call failed [Needs UI]')

        AnalyticEvent('onRemoveFromCartFailed', {
          request: removeReq,
          response: { Items: refItems }
        })
        // const product = getItemFromCart(removeReq.Payload, state.items)
        this.dispatch('cart/uiNoticesClear').then(() => {
          this.dispatch('cart/uiNotice', {
            Id: Math.random(),
            Type: 'Danger',
            Msg: 'Sorry, something went wrong. Please try again.'
          })
        })
        this.dispatch('cart/restoreItems')
        this.dispatch('cart/setStatus', 2)
      })
  },
  SET_STATUS (state, status) {
    state.status = STATUS[status]
  },
  SET_UI_NOTICE (state, msg) {
    state.uiNotices.push(msg)
  },
  CLEAR_UI_NOTICES (state) {
    state.uiNotices = []
  }
}

export const getters = {
  getCartStore (state) {
    return state
  },
  getCart ({ items }) {
    return items
  },
  getCartStatus ({ status }) {
    return status
  },
  getCartNotices ({ uiNotices }) {
    return uiNotices
  },
  getCartCount ({ items }) {
    // return items.reduce((acc, item) => {
    //   return acc + item.Qty
    // }, 0)
    return items.length
  }
}
