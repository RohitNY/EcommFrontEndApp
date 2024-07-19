export const state = () => ({
  offerType: null,
  offer: {}
})

export const actions = {
  setOffer ({ commit }, { offer, offerType }) {
    commit('SET_OFFER_TYPE', offerType)
    commit('SET_OFFER', offer)
  }
}

export const mutations = {
  SET_OFFER_TYPE (state, offerType) {
    state.offerType = offerType
  },
  SET_OFFER (state, offer) {
    state.offer = offer
  }
}

export const getters = {
  getMultiOfferState (state) {
    return state
  }
}
