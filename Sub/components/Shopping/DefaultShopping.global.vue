<template>
  <div class="ref-shopping-offers">
    <article
      v-for="(el, i) in pageData.Items"
      :key="uniqueKey(el, i)"
      v-ui:intersect="{
        cb: productInView(el),
        target: `id-${el.Id}-${i}`,
      }"
      :class="[
        $style.productArticle,
        isAdunitWrapperItem(el) && $style.productArticleOfferWrapper,
        isMidTabBackgroundItem(el),
        isDevice(el, [isMidTabDevice, isAdunitWrapperDevice]),
      ]"
      :style="{
        '--device--bgColor': isMidTabDevice(el)
          ? el.DeviceData.BgColor
          : getNodeOfferClass(el, 'BgColor'),
      }"
    >
      <EcomOfferModule
        :placement-int="i"
        :data="el"
        :len="pageData.Items.length"
      />
    </article>
  </div>
</template>

<script>
export default {
  name: 'EcomDefaultShopping',
  props: {
    pageData: Object
  },
  computed: {
    uniqueKey () {
      return (product, position) => {
        return `${this.$route.query.tn}-${
          product.Id || product.DeviceId
        }-${position}`
      }
    }
  },
  methods: {
    isDevice (el, middlewares) {
      // prettier-ignore
      const runMiddlewares = f => f.map(fn => fn(el)).filter(Boolean).join(' ').trim()
      return el.Component === 'Device' ? runMiddlewares(middlewares) || '' : ''
    },
    isAdunitWrapperItem (el) {
      return el.Decorate?.CodeName === 'AdunitWrapper'
    },
    isAdunitWrapperDevice (el) {
      return (
        el.DeviceData?.CodeName === 'AdunitWrapper' && el.DeviceData.ParentClass
      )
    },
    isMidTabDevice (el) {
      return (
        el.DeviceData?.CodeName === 'MidTab' &&
        `${el.DeviceData.ParentClass} ${el.DeviceData?.OfferClass}`
      )
    },
    isMidTabBackgroundItem (el) {
      return el.Decorate?.CodeName === 'MidTab' ? el.Decorate.OfferClass : ''
    },
    getNodeOfferClass (el, prop) {
      // if (el.DeviceData?.CodeName === 'AdunitWrapper') {
      //   console.log('$ AdunitWrapper')
      //   return ''
      // }

      if (el.Decorate) {
        return el.Decorate && el.Decorate[prop]
      } else if (el.DeviceData) {
        return el.DeviceData && el.DeviceData[prop]
      }
    },
    productInView (product) {
      return (bounds) => {
        this.$hopX.AnalyticEvent('onTabItemInView', {
          /* this is either an adunit or device */
          product
        })
      }
    }
  }
}
</script>

<style lang="scss" module>
.productArticleOfferWrapper {
  max-width: 100%; /* required for MS Windows Browsers */
  @include md {
    border-radius: 3rem;
    background: none !important; /* disable AdunitWrapper full-w bg color */
  }
}
.productArticle {
  width: 100vw;
  max-width: 100%; /* required for MS Windows Browsers */
}
/* product placeholders loading */
.product {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
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
    max-width: 100vw;

    // overflow: hidden;
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
</style>
