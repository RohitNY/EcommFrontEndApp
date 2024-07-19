<template>
  <!-- <div :data-key="$parent.pathExp.Slug + data.Id" :class="$style.adunitShell"> -->
  <div :class="$style.adunitShell">
    <slot name="aboveAdunit" />
    <component :is="offerType.component" :class="$style.adunit" :data="data" />
    <transition data-comp="SMLT" name="transitions-fade" mode="out-in">
      <div
        v-if="smltState === 'SHOW_BUTTON'"
        key="SHOW_BUTTON"
        :class="[$style.seeMoreLikeThis, 'ref-adunit-smlt', isMarketplace ? $style.smltShift : '']"
      >
        <EcomButton
          ref="smlt-button"
          no-ripple="no-ripple"
          :class="$style.btn"
          :data-ref-smlt="smltId"
          @click="fetchSmlt"
        >
          MORE LIKE THIS
          <EcomSpinner
            v-if="getSmlt"
            kind="inline-circle"
            target-node="smlt-button"
          />
        </EcomButton>
      </div>
      <div
        v-if="smltState === 'SHOW_RESULT'"
        key="SHOW_RESULT"
        :class="[$style.seeMoreLikeThis, 'ref-adunit-smlt', isMarketplace ? $style.smltShift : '']"
      >
        <div :class="[$style.products, $style.smltMsg]">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-if="smltResultCount === 0" v-html="noProductsAvailable" />
          <span v-else>
            <nuxt-link :to="similarPath">
              Show items similar to
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="data.Title" />
            </nuxt-link>
          </span>
        </div>
      </div>
      <div
        v-if="smltState === 'SHOW_ERROR'"
        key="SHOW_ERROR"
        :class="[$style.seeMoreLikeThis, 'ref-adunit-smlt', isMarketplace ? $style.smltShift : '']"
      >
        <EcomButton
          ref="smlt-button"
          no-ripple
          :class="$style.btn"
          @click="fetchSmlt"
        >
          PLEASE TRY AGAIN
          <EcomSpinner
            v-if="getSmlt"
            kind="inline-circle"
            target-node="smlt-button"
          />
        </EcomButton>
      </div>
      <div
        v-if="smltState === 'MAX_ATTEMPTS'"
        key="MAX_ATTEMPTS"
        :class="[$style.seeMoreLikeThis, 'ref-adunit-smlt']"
      >
        <div :class="[$style.products, $style.smltMsg]">
          <span>
            Sorry, we're having trouble finding similar items for
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="data.Title" />
            at this time.
            <i>Please continue shopping...</i>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import sample from 'lodash/sample'

import EcomSuperFeatureAdunit from './Adunit/Type/SuperFeatureAdunit.vue'
import EcomMerchandiseAdunit from './Adunit/Type/MerchandiseAdunit.vue'
import EcomMagazineAdunit from './Adunit/Type/MagazineAdunit.vue'
import MarketplaceMerchandiseAdunit from './Adunit/Type/Marketplace/MerchandiseAdunit.vue'
import MarketplaceMagazineAdunit from './Adunit/Type/Marketplace/MagazineAdunit.vue'
import TabMicrositeAdunit from './Adunit/Type/Microsite/MicrositeAdunit.vue'

/* server sent dynamic components */
import EcomCountdownTimer from '~/components/Dynamic/CountdownTimer.vue'

export default {
  components: {
    EcomSuperFeatureAdunit,
    EcomMerchandiseAdunit,
    EcomMagazineAdunit,
    MarketplaceMerchandiseAdunit,
    MarketplaceMagazineAdunit,
    TabMicrositeAdunit
  },
  props: {
    data: Object,
    adunitTheme: String
  },
  data () {
    return {
      getSmlt: false,
      getComplete: false,
      getDone: false,
      getError: false,
      getAttempts: 0
    }
  },
  computed: {
    isSuperFeature () {
      return Boolean(this.data.SuperFeature)
    },
    isMarketplace () {
      return this.offerType?.ui === 'marketplace'
    },
    smltState () {
      if (this.getDone) {
        return 'SHOW_RESULT'
      }
      if (this.getAttempts > 3) {
        return 'MAX_ATTEMPTS'
      }
      if (this.getError) {
        return 'SHOW_ERROR'
      }
      if (this.smltResponseAvailable) {
        return 'SHOW_RESULT'
      }
      if (this.data.Smlt) {
        return 'SHOW_BUTTON'
      }
      return 'HIDE_SMLT'
    },
    similarPath () {
      return {
        path: 'similar',
        query: {
          id: this.data.Smlt?.Id,
          tn: this.$route.query.tn,
          pg: this.$route.query.pg
        }
      }
    },
    offerType () {
      if (this.data.Ui) { //  check for Ui field
        return this.$hopX.adunitUiMap(this.data.Ui)
      } else { // if Ui doesn't exist fallback to Offertype for backward compatibility
        if (this.isSuperFeature) {
          return { component: 'EcomSuperFeatureAdunit' }
        }
        return this.$hopX.adunitOfferMap(this.data.offerType)
      }
    },
    smltId () {
      return this.data.Smlt?.Id || 'UNAVAILABLE'
    },
    smltResponseAvailable () {
      return (
        typeof this.$store.getters['smlt/getItems'](this.data.Smlt?.Id) !==
        'undefined'
      )
    },
    smltResultCount () {
      const smlt = this.$store.getters['smlt/getItems'](this.data.Smlt?.Id)
      return smlt && smlt.Items && smlt.Items.length
    },
    hasFeatureHeader () {
      return this.data.FeatureText || this.data.SubSavings
    },
    noProductsAvailable () {
      const replaceWithMap = {
        '%%User.FirstName%%': window.Spectrum.Bootstrap.User.FirstName,
        '%%Data.Title%%': this.data.Title
      }

      const randomMsgs = [
        "Sorry %%User.FirstName%%, we couldn't find any similar products for <span>%%Data.Title%%</span>"
      ]

      let showMsg = sample(randomMsgs)

      Object.keys(replaceWithMap).forEach((k) => {
        const re = new RegExp(k, 'gi')
        showMsg = showMsg.replace(re, replaceWithMap[k])
      })

      return showMsg
    }
  },
  mounted () {
    // if (!this.$el) { return }
    const countdown = this.$el.querySelector('fa-countdown')
    if (countdown) {
      const endtime = countdown.getAttribute('x-end')
      const ComponentCtor = Vue.extend(EcomCountdownTimer)
      this.componentInst = new ComponentCtor({
        propsData: { endtime }
      })
      this.componentInst.$mount(countdown)
    }
  },
  beforeDestroy () {
    if (this.componentInst) {
      this.componentInst.$destroy(true)
    }
  },
  methods: {
    fetchSmlt () {
      if (!this.getSmlt) {
        const adunit = this.data

        this.$hopX.AnalyticEvent('onSmltButtonClicked', {
          adunit
        })

        this.$store
          .dispatch('smlt/fetchSmlt', adunit)
          .then(async (data) => {
            await this.$hopX.sleep(150)
            if (this.smltResultCount > 0) {
              this.$router.push(this.similarPath)
            }
            this.getDone = true
          })
          .catch(async () => {
            await this.$hopX.sleep(1000)
            this.getError = true
          })
          .then(() => {
            this.getComplete = true
            this.getSmlt = false
            this.getAttempts++
          })
      }

      this.getSmlt = true
    }
  }
}
</script>

<style lang="scss" module>
.adunitShell {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  max-width: calc(100% - 2rem);
}

.adunit {
  // border: var(--adunit-css-1);
  box-shadow: var(--adunit-css-2);
  position: relative;
  outline: none;
  width: 100vw;
  z-index: 2;

  @include sm {
    max-width: calc(100% - 0.4rem);
    overflow: hidden;
  }

  @include md {
    max-width: 77rem;
  }

  @include lg {
    max-width: 106rem;
  }
}

.seeMoreLikeThis {
  box-shadow: var(--adunit-css-2);
  border-bottom-left-radius: var(--adunit-css-3);
  border-bottom-right-radius: var(--adunit-css-3);
  background-color: var(--theme-background-color-smlt-tray);
  transform: translateY(-4.5rem);
  width: calc(100% - 0.5rem);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 3rem auto 0.127rem;
  padding-top: 3.5rem;
  z-index: 1;

  @include sm {
    max-width: calc(100% - 2rem);
  }

  @include md {
    max-width: 106rem;
    // max-width: 90%;
  }
  .products {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    a {
      color: currentColor;
      text-decoration: none;
      > span {
        border-bottom: 1.7px solid currentColor;
      }
    }
    &.smltMsg {
      font-family: var(--adunit-font-1);
      color: var(--adunit-color-26);
      text-align: center;
      font-size: 1.375rem;
      padding: 0.3rem 0.5rem 2.6rem 0.5rem;
      opacity: 0.97;
      @include md {
        font-size: 1.7rem;
      }
      > span > span,
      > span > a > span {
        font-family: var(--adunit-font-2);
      }
    }

    .itemWrap {
      min-height: 18.5rem;
      width: 17rem;
      padding: 1rem;
      @include md {
        width: 21rem;
      }
      .item {
        cursor: pointer;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        @include md {
          transition: all 0.33s ease-in-out;
          &:hover {
            transform: scale(1.025);
          }
        }
        .title {
          font-family: var(--adunit-font-2);
          color: var(--adunit-color-26);
          text-align: center;
          padding: 1rem 0;
          font-size: 1.125rem;
          @include md {
            font-size: 1.375rem;
          }
        }
        .thumbnail {
          object-fit: contain;
          max-width: 100%;
        }
        .viewProductBtn {
          margin: 1.5rem 0 2.5rem;
          .ecomButtonStyle {
            color: var(--adunit-color-24);
            padding: 0.675rem 2rem;
            @include sm {
              font-size: 1.337rem;
            }
            @include md {
              padding: 1rem 3rem;
              font-size: 1.5rem;
            }
            @include lg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }

    @include sm {
      .itemWrap {
        width: 14rem;
      }
    }
  }

  .btn {
    margin: -0.875rem auto 1.4rem;
    > button {
      display: flex;
      justify-content: center;
      align-items: center;
      > div {
        position: relative;
        margin-left: 1.5rem;
      }
    }
    .ecomButtonStyle {
      background-color: var(--theme-background-color-smlt-button);
      font-family: var(--app-font-normal);
      color: var(--theme-font-color-smlt-button);
      border-radius: 3rem;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
      padding: 1.5rem 2rem;
      @include sm {
        font-size: 1.337rem;
      }
      @include md {
        padding: 1.5rem 3rem;
        font-size: 1.5rem;
      }
      @include lg {
        padding: 1.25rem 3.25rem;
        font-size: 1.8rem;
      }
    }
  }
}
.smltShift {
  @include sm {
    transform: translateY(-3rem);
    padding-top: 2rem;
  }
}
</style>
