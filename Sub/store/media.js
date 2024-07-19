export const state = () => ({
  offerType: null, /* used for determining image aspect ratio */
  media: {}
})

export const actions = {
  setMedia ({ commit }, { media, offerType }) {
    commit('SET_OFFER_TYPE', offerType)
    commit('SET_MEDIA', media)
  }
}

export const mutations = {
  SET_OFFER_TYPE (state, offerType) {
    state.offerType = offerType
  },
  SET_MEDIA (state, media) {
    state.media = media
  }
}

export const getters = {
  getOfferType (state) {
    return state.offerType
  },
  getMedia (state) {
    return state.media
  }
}
