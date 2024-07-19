<template>
  <main
    v-ui:scroll-observer="{ fn: sideRailsAds, debounce: 50, id: 'shop' }"
    :class="[$style.shop, pathExp.Ui.Theme, fixedBackgroundClass]"
    class="ref-shopping-body"
  >
    <div :class="$style.fixedBgWrapper">
      <div id="fixed-bg" :class="$style.fixedBg" />
    </div>
    <span v-ui:responsive>
      <transition name="transitions-fade">
        <div
          v-if="headerImg.Sm && $mm.maxWidth(959)"
          :style="{ minHeight: '1440px' }"
        >
          <img
            :key="headerImg.Sm"
            :class="$style.tabHeaderImage"
            :src="$hopX.image(headerImg.Sm, { width: 960, height: 1440 })"
          >
        </div>
        <div v-else-if="headerImg.Lg" :style="{ minHeight: '760px' }">
          <img
            :key="headerImg.Lg"
            :class="$style.tabHeaderImage"
            :src="$hopX.image(headerImg.Lg, { width: 1366, height: 760 })"
          >
        </div>
      </transition>
    </span>

    <transition name="transitions-fade" mode="out-in">
      <!-- shopping main container -->
      <section v-if="pageData && fetchComplete" key="1" :class="$style.main">
        <EcomRailDisplayAds />
        <MarketplacePurchaseDisclaimer :data="disclaimerData" />
        <!-- START shopping offers -->
        <EcomDefaultShopping :page-data="pageData" />
        <!-- END shopping offers -->
      </section>
      <section v-else key="2" :class="$style.main">
        <div
          v-for="(product, i) in [1, 2, 3, 4, 5, 6, 7]"
          :key="uniqueKey(product, i)"
          :class="$style.product"
        >
          <EcomSpinner kind="bars" :color="pathExp.Ui.Colors.PageBackground" />
        </div>
      </section>
    </transition>

    <EcomDisplayAd placement="bottom-static" position="before-continue" />
    <EcomPageEndNavigation
      :ui="pageNavigationUi"
      :theme="pathExp.Ui.PageNavigation.Theme"
    />
    <EcomDisplayAd
      :class="$style.appearWhenFilled"
      placement="bottom-fixed"
      position="footer"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import MarketplacePurchaseDisclaimer from '~/components/PurchaseDisclaimer.vue'
import EcomPageEndNavigation from '~/components/PageEndNavigation.vue'
import EcomDisplayAd from '~/components/Advertisement.vue'
import EcomRailDisplayAds from '~/components/RailDisplayAds.vue'

export default {
  layout: 'shopping',
  watchQuery (newParams, oldParams) {
    this.$store.dispatch('device/freeze', oldParams.tn)
    return parseInt(newParams.pg)
  },
  key: to => to.fullPath,
  transition (to, from) {
    const SLIDE_LEFT = 'transitions-slide-left'
    const SLIDE_RIGHT = 'transitions-slide-right'
    if (!from) {
      return SLIDE_LEFT
    }
    return +to.query.pg < +from.query.pg ? SLIDE_RIGHT : SLIDE_LEFT
  },
  components: {
    EcomRailDisplayAds,
    EcomPageEndNavigation,
    EcomDisplayAd,
    MarketplacePurchaseDisclaimer
  },
  middleware ({ app, store, query, error }) {
    window.scrollTo(0, 0)

    if (query && query.tn) {
      /* let ad team know to clear any prev filled containers */
      app.$hopX.AdEvent({
        event: 'on_tab_change_detected',
        msg:
          'A new tab is loading with new ad containers, clear prev filled containers'
      })

      store
        .dispatch('products/fetchPage', query.tn)
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          // TODO: Handle this error case prior to production, this represents a
          // ||     critcal error in the application. We should attempt to retry
          // ||     with MAX_ATTEMPTS and log this event to a service
          // error(err)
        })
    }
  },
  data () {
    return {
      withinScrollZone: false,
      isFixedBackground: false
    }
  },
  computed: {
    ...mapGetters('products', {
      pageData: 'getActivePageData',
      fetchComplete: 'getStatusEqSuccess'
    }),
    disclaimerData () {
      const page = this.$store.getters['app/getActivePathExperience']
      return page.Ui.PurchaseDisclaimer
    },
    headerImg () {
      const page = this.$store.getters['app/getActivePathExperience']
      return page.Ui.TabHeaderImage
    },
    uniqueKey () {
      return (product, position) => {
        return `${this.$route.query.tn}-${product.Id ||
          product.DeviceId}-${position}`
      }
    },
    pathExp () {
      return this.$store.getters['app/getPagePathExperienceBySlug'](
        this.$route.query.tn
      )
    },
    pageNavigationUi () {
      if (this.pathExp.Ui.PageNavigation.UiConfig) { // new array button data implementation
        return this.pathExp.Ui.PageNavigation.UiConfig
      } else if (this.pathExp.Ui.PageNavigation.Ui) { // for backwards compatability
        return this.pathExp.Ui.PageNavigation.Ui
      }
      return this.pathExp.Ui.PageNavigation
    },
    withinVisibleViewport () {
      // !! hide prior to showing the PageNavigation Continue button
      return !this.$mm.sm
    },
    fixedBackgroundClass () {
      if (this.isFixedBackground) {
        return this.$style.fixedBg
      }
      return ''
    }
  },

  beforeCreate () {
    this.$store.dispatch(
      'app/setActivePathExperience',
      parseInt(this.$route.query.pg)
    )
  },
  beforeDestroy () {
    this.$hopX.Event.$emit('UI', {
      event: 'on_destroy_scroll_listener',
      action: 'RESET_STATE',
      key: 'scrollObserver',
      value: []
    })
  },
  mounted () {
    this.setPageBackground()
  },
  methods: {
    sideRailsAds (evt) {
      const c = { top: 100, bottom: 560 }
      this.withinScrollZone =
        document.documentElement.scrollTop > c.top &&
        !(
          window.innerHeight + window.pageYOffset >=
          document.documentElement.scrollHeight - c.bottom
        )
    },

    setPageBackground () {
      const pageContainer = document.querySelector('#fixed-bg')
      const theme = this.pathExp.Ui.Theme
      let path = null

      if (theme && window.Spectrum.ThemeConfig[theme]) {
        const baseUrl = window.Spectrum.ThemeConfig[theme].BaseUrl
        const containerDiv = document.querySelector('.' + theme)
        if (containerDiv) {
          path = getComputedStyle(containerDiv).getPropertyValue(
            '--page-background-url'
          )
        }
        // check for fixed bg image
        if (path) {
          path = path.replace(/"/g, '')
          path = path.trim()
          this.pathExp.Ui.FixedBackgroundImage = `${baseUrl + path}`
          pageContainer.style.backgroundImage = `url(${baseUrl + path})`
          this.isFixedBackground = true
        }
      }
      if (this.pathExp.Ui.Colors.PageBackground) {
        pageContainer.style.backgroundColor = this.pathExp.Ui.Colors.PageBackground
      }
    }
  },
  head () {
    return {
      title: `Shop › ${this.pathExp.PageTitle} – PCH`
    }
  }
}
</script>

<style lang="scss" module>
.shop {
  transition: all 0.27s cubic-bezier(0.55, 0, 0.1, 1);
  @include sm {
    overflow-x: hidden;
  }
}

.tabHeaderImage {
  object-fit: cover;
  max-width: calc(100% + 2rem);
  position: relative;
  transform: translateX(-50%) translateY(0%);
  top: calc(-3rem + (var(--agg-adj) - 2rem));
  left: 50%;
}

.fixedBg .tabHeaderImage {
  max-width: calc(100% + 2rem);
}

@media (min-width: 960px) {
  .fixedBg .tabHeaderImage {
    max-width: calc(50% + 2rem);
  }
}

.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  .heroImg {
    margin: 2.5rem 0;
    max-width: 100%;
    object-fit: contain;
  }
}

@keyframes bottom-fixed-appear {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  50% {
    opacity: 0;
    transform: translateY(50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.appearWhenFilled {
  opacity: 0;
  transform: translateY(100%);

  &:not(:empty) {
    animation: bottom-fixed-appear 333ms cubic-bezier(0.075, 0.82, 0.165, 1)
      777ms forwards;
  }
}

:root {
  --promotional-banner-height: 0px;
  --agg-adj: var(--promotional-banner-height);
}

.fixedBgWrapper {
  position: absolute;
  top: 0;
  left: 0;
  .fixedBg {
    position: fixed;
    top: 0;
    left: 0;
    background-size: 100%;
    width: 100%;
    height: 100%;
  }
}

.main {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  // /* adjust for tab header image */
  // smallest phone
  margin-top: -1215.666px;
  min-height: 250px;

  @include sm {
    min-height: 200px;
  }

  /* mobile */
  $i: 100;
  $k: 7px;
  @while $i < 117 {
    $k: $k * 1.0875;
    @media screen and (min-width: ($i - 100) * 20px + 320px) {
      margin-top: calc(#{($i - 100) * $k - 1215.666px} + var(--agg-adj));
    }
    $i: $i + 1;
  }

  /* desktop */
  $j: 100;
  $f: 6px;
  @while $j < 122 {
    $f: $f * 0.975;
    @media screen and (min-width: ($j - 100) * 30px + 960px) {
      margin-top: calc(#{($j - 100) * $f - 487.666px} + var(--agg-adj));
    }
    $j: $j + 1;
  }

  .sideRails {
    position: fixed;
    height: 100vh;
    top: 4.7627rem;
    display: flex;
    align-items: center;
    pointer-events: none;
    > div {
      pointer-events: auto;
      margin-top: -6rem;
    }
    @include md {
      width: calc(100% - 1.5rem);
      max-width: 105rem;
    }
    @include lg {
      width: calc(100% - 1.5rem);
      max-width: 138rem;
    }
    @media (max-width: 1039px) {
      display: none;
      visibility: hidden;
      backface-visibility: hidden;
      z-index: -1;
    }
    @media (min-width: 1080px) and (max-width: 1359px) {
      display: none;
      visibility: hidden;
      backface-visibility: hidden;
      z-index: -1;
    }
    @media (min-width: 1440px) {
      max-width: 144rem;
    }
    @media (min-width: 1759px) {
      max-width: 172rem;
    }
  }
  /* product placeholders loading */
  .product {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 3.337rem auto;
    outline: none;
    width: 34.5rem;
    max-width: calc(100% - 0.0627rem);
    &.seeMoreLikeThis {
      margin-bottom: -1.5rem;
      display: flex;
      flex-flow: column nowrap;
    }
    &.device {
      width: 100vw;
      // max-width: calc(100% + 4rem);
      // margin-left: -2rem;
      overflow: hidden;
      @include md {
        width: calc(100vw - 8px);
      }
    }
  }
  @include md {
    .product {
      width: calc(100% - 1.5rem);
      max-width: 77rem;
    }
  }
  @include lg {
    .product {
      width: calc(100% - 1.5rem);
      max-width: 108rem;
    }
  }
}
</style>
