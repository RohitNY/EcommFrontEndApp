<template>
  <div
    :id="targetId"
    v-ui:intersect="{
      cb: emitAdEvent('on_ad_container_visible'),
      target: targetId,
    }"
    :class="[
      'm4d-wrap',
      `m4d-wrap__${placement}`,
      `m4d-wrap__${placement}--${position}`,
      isDev && 'm4d-wrap--dev',
    ]"
  >
    <span v-if="isDev" class="text">
      #id:
      <b>{{ `m4d-${placement}-${position}` }}</b>
    </span>
  </div>
</template>

<script>
let inlineStickyHeightAdj = null
const displayAds = new Map()

const filterSupported = (elm, sizes) => {
  const _el = document.getElementById(elm)
  if (_el) {
    const bounds = _el.getBoundingClientRect()
    return sizes.filter((size) => {
      if (size) {
        const width = size[0]
        return parseInt(width) <= bounds.width
      }
    })
  }
}

const getComputedValues = (id) => {
  return displayAds.get(id + window.innerWidth) || null
}

const setComputedValues = (id, values) => {
  if (values.length > 0) {
    displayAds.set(id + window.innerWidth, values)
  }
  return values
}

export default {
  name: 'EcomDisplayAd',
  props: {
    placement: String,
    position: String
  },
  computed: {
    isDev () {
      return process.env.dev
    },
    targetId () {
      return `m4d-${this.placement}-${this.position}`
    },
    supportedDisplayAdSizes () {
      // || Mobile:
      //  * inline-sticky    320x50, 300x50  -  between every N products
      //  * bottom-static    300x250, 250x250, 320x50, 300x50  -  directly above "Continue" button
      //  * bottom-fixed     320x50, 300x50

      // || Tablet:
      //  * inline-sticky    970x90, 728x90, 320x50, 300x50  -  between every N products
      //  * bottom-static    970x90, 728x90, 320x50, 300x50
      //  * bottom-fixed     970x90, 728x90, 320x50, 300x50

      // || Desktop:
      //  * rail-fixed       300x600, 160x600, 120x600, 300x250  -  Left and Right of products
      //  * inline-sticky    970x90, 728x90  -  between every N products
      //  * bottom-static    970x90, 728x90
      //  * bottom-fixed     970x90, 728x90

      return (elm, placement) => {
        const supportedSizes = getComputedValues(placement)
        if (supportedSizes) {
          return supportedSizes
        }

        /* ELSE
          compute for each placement type
        */
        const SQUARE = [250, 250]
        const SMALL_SQUARE = [200, 200]
        const BANNER = [468, 60]
        const MOBILE_BANNER = [320, 50]
        const MOBILE_BANNER_SMALL = [300, 50]
        const LEADERBOARD = [728, 90]
        const INLINE_RECTANGLE = [300, 250]
        const LARGE_RECTANGLE = [336, 280]
        const SKYSCRAPER = [120, 600]
        const WIDE_SKYSCRAPER = [160, 600]
        const LARGE_LEADERBOARD = [970, 90]
        const HALF_PAGE_AD = [300, 600]
        const BILLBOARD = [970, 250]

        const sizes = {
          'rail-fixed': [
            HALF_PAGE_AD,
            WIDE_SKYSCRAPER,
            SKYSCRAPER,
            LARGE_RECTANGLE,
            INLINE_RECTANGLE
          ],
          'inline-sticky': [
            LARGE_LEADERBOARD,
            LEADERBOARD,
            BANNER,
            MOBILE_BANNER,
            MOBILE_BANNER_SMALL
          ],
          'inline-static': [
            BILLBOARD,
            LARGE_LEADERBOARD,
            LEADERBOARD,
            BANNER,
            LARGE_RECTANGLE,
            INLINE_RECTANGLE,
            SQUARE,
            SMALL_SQUARE,
            MOBILE_BANNER,
            MOBILE_BANNER_SMALL
          ],
          'bottom-static': [
            BILLBOARD,
            LARGE_LEADERBOARD,
            LEADERBOARD,
            BANNER,
            LARGE_RECTANGLE,
            INLINE_RECTANGLE,
            SQUARE,
            SMALL_SQUARE,
            MOBILE_BANNER,
            MOBILE_BANNER_SMALL
          ],
          'bottom-fixed': [
            LARGE_LEADERBOARD,
            LEADERBOARD,
            BANNER,
            MOBILE_BANNER,
            MOBILE_BANNER_SMALL
          ]
        }

        /* cache and return supported ad size */
        return setComputedValues(
          placement,
          filterSupported(elm, sizes[placement])
        )
      }
    }
  },
  beforeDestroy () {
    if (this.observer) {
      this.observer.disconnect()
      window.SpectrumShopDiv = null
    }
  },
  mounted () {
    const supportedSizes = this.supportedDisplayAdSizes(
      this.targetId,
      this.placement
    )

    if (this.placement === 'inline-sticky') {
      const $el = this.$el.parentElement.nextSibling

      if (!inlineStickyHeightAdj) {
        const supportedHeights = supportedSizes.map(set => set[1])
        const heightAdjustment = Math.max(...supportedHeights)
        inlineStickyHeightAdj = Math.floor(heightAdjustment * 1.1) + 'px'
      }

      /* store as data-attr for use later */
      $el.setAttribute('data-h', inlineStickyHeightAdj)

      if (!window.SpectrumShopDiv) {
        window.SpectrumShopDiv = document.querySelector('.ref-shopping-body')
        const config = { attributes: false, childList: true, subtree: true }
        const callback = function (mutationsList, observer) {
          for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
              if (/inline-sticky/.test(mutation.target.id)) {
                const adjContainer = mutation.target.parentElement.nextSibling
                adjContainer.style.height = adjContainer.getAttribute('data-h')
              }
            }
          }
        }
        this.observer = new MutationObserver(callback)
        this.observer.observe(window.SpectrumShopDiv, config)
      }
    }

    /* container available event (disabled but retained here for reference) */
    // eslint-disable-next-line no-constant-condition
    if (false) {
      // this.$hopX.AdEvent({
      //   msg: `Display Ad ${this.placement} #${this.targetId}`,
      //   event: 'on_ad_container_available',
      //   data: {
      //     containerId: this.targetId,
      //     supports: supportedSizes,
      //     placement: this.placement,
      //     position: this.position
      //   }
      // })
    }
  },
  methods: {
    emitAdEvent (event) {
      return () => {
        this.$hopX.AdEvent({
          msg: `Display Ad ${this.placement} #${this.targetId}`,
          event,
          data: {
            // path: location.hash,
            containerId: this.targetId,
            supports: this.supportedDisplayAdSizes(
              this.targetId,
              this.placement
            ),
            placement: this.placement,
            position: this.position
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
// Square – 250 x 250
// Small Square – 200 x 200
// Banner – 468 x 60
// Leaderboard – 728 x 90
// Inline Rectangle – 300 x 250
// Large Rectangle – 336 x 280
// Skyscraper – 120 x 600
// Wide Skyscraper – 160 x 600
// Half-Page Ad – 300 x 600
// Large Leaderboard – 970 x 90
@mixin landscape-ad {
  @media screen and (max-height: 449px) and (orientation: landscape) {
    @content;
  }
}

.m4d-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  // background: rgb(255, 255, 255);
  font-size: 1.77rem;
  overflow: hidden;

  &--dev {
    box-shadow: inset 0 0 2px 4px rgba(148, 255, 41, 0.337);
  }

  &:empty {
    visibility: hidden;
    pointer-events: none;
  }

  &__bottom-static {
    max-height: 25rem;
    max-width: 97rem;
    margin: 0 auto;
    margin-top: 5rem;

    @include landscape-ad {
      max-width: 50vw;
      width: 50vw;
    }
  }

  &__bottom-fixed {
    background-color: #c5cac9;
    position: fixed;
    z-index: 5;
    bottom: 0;
    left: 0;
    font-size: 1.5rem;
    width: 100vw;
    max-width: 100%; /* required for MS Windows Browsers */

    @include sm {
      // height: 5.1rem;
      max-height: 5.1rem;
    }
    @include md {
      // height: 9.1rem;
      max-height: 9.1rem;
    }

    @include landscape-ad {
      // width: 50vw;
      // left: 50%;
      // transform: translateX(-50%);
      display: none;
    }
  }

  &__inline-sticky {
    width: calc(100% - 2rem);

    margin: 0 auto;
    // height: 9rem;
    max-height: 25rem;
    position: sticky;
    z-index: 5;
    top: 12rem;
    // left: 0;
    // padding-left: 3rem;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    backface-visibility: hidden;

    @include md {
      max-width: 80rem;
    }
    @include lg {
      max-width: 97rem;
    }
    @include landscape-ad {
      max-width: 50vw;
      width: 50vw;
    }
  }

  &__inline-static {
    width: calc(100% - 2rem);

    max-height: 25rem;
    // max-width: 97rem;
    margin: 0 auto;

    @include md {
      max-width: 80rem;
    }
    @include lg {
      max-width: 97rem;
    }
    @include landscape-ad {
      max-width: 50vw;
      width: 50vw;
    }
  }

  &__rail-fixed {
    position: absolute;
    height: 60rem;
    max-height: 60rem;
    width: 12rem;
    white-space: nowrap;

    @media (min-width: 1440px) {
      width: 16rem;
    }

    @media (min-width: 1759px) {
      width: 30rem;
    }

    &--page-left {
      float: left;
      .text {
        transform: rotate(-90deg);
      }
    }
    &--page-right {
      float: right;
      right: 0;
      .text {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
