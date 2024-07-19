/**
 * Zenith - Device Framework
 * -------------------------------------------------------------------------------------------------
 */
import get from 'lodash/get'

export default {
  support: {
    evalSpectrum (path) {
      return /^Spectrum\./.test(path) ? get(window, path) : path
    }
  },
  data: {
    addedToCart: false
  },
  methods: {
    /* category device */
    async addPathExperience (bootstrap) {
      const pathExp = this.$store.getters['app/getPagePathExperienceBySlug'](bootstrap.Slug)
      if (pathExp) {
        await this.$store.dispatch('app/setActivePathExperience', pathExp.Placement)
        await this.$store.dispatch('app/gotoPathExperience', pathExp)
      } else {
        await this.$store.dispatch('app/injectPathExperience', bootstrap)
        await this.$store.dispatch('app/continuePathExperience')
      }
    },
    addToCart ({ OfferCodeSet, OfferCode, Qty = 1 }) {
      this.addedToCart = true
      this.$store.dispatch('cart/add', {
        OfferCodeSet,
        OfferCode,
        Qty
      })
    }
  }
}
