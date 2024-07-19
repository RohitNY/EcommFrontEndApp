<template>
  <header :class="$style.header">
    <HeaderLinks />
    <div
      v-if="hasPromotionalBanner"
      :class="[$style.navWrap, { [$style.navWrapExpanded]: showPromoBanner }]"
    >
      <EcomPromotionalBanner
        v-ui:scroll-observer="{
          fn: handlePromoBanner,
          debounce: 50,
          id: 'promotionalBanner'
        }"
      />
      <EcomShoppingHeader :class="$style.pchBar" />
      <EcomNav :setup="setup" />
    </div>
    <div v-else :class="$style.navWrap">
      <EcomShoppingHeader :class="$style.pchBar" />
      <EcomNav :setup="setup" />
    </div>
  </header>
</template>

<script>
import EcomNav from '~/components/Nav.vue'
import EcomShoppingHeader from '~/components/ShoppingHeader.vue'
import EcomPromotionalBanner from '~/components/Global/PromotionalBanner.vue'
import HeaderLinks from '@/components/HeaderLinks.vue'

export default {
  name: 'EcomHeader',
  components: {
    EcomNav,
    EcomShoppingHeader,
    EcomPromotionalBanner,
    HeaderLinks
  },
  props: {
    setup: Object
  },
  data () {
    return {
      showPromoBanner: true
    }
  },
  computed: {
    hasPromotionalBanner () {
      return window.Spectrum.Bootstrap.PathLevel?.PromotionalBanner || false
    }
  },
  methods: {
    handlePromoBanner (evt) {
      const c = { top: Math.floor(window.innerHeight / 3) }
      this.showPromoBanner = document.documentElement.scrollTop < c.top
    }
  }
}
</script>

<style lang="scss" module>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%; /* required for MS Windows Browsers */
  z-index: 6;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  overflow: hidden;
  pointer-events: none;

  .pchBar {
    pointer-events: auto;
    position: relative;
    z-index: 1;
  }
  .navWrap {
    pointer-events: auto;
    position: relative;
    z-index: 0;
    transform: translateY(calc(-1 * var(--promotional-banner-height)));
    transition: all 0.2s;

    &.navWrapExpanded {
      transform: translateY(0px);
    }
  }
}
</style>
