<script>
import EcomAdvertisement from '~/components/Advertisement.vue'

/* Product Presentor Components */
import Adunit from '~/components/ProductPresentor/AdunitShell.vue'
import Device from '~/components/ProductPresentor/DeviceShell.vue'

export default {
  name: 'EcomOfferModule',
  functional: true,
  props: {
    data: Object,
    placementInt: Number,
    len: Number
  },
  render (h, ctx) {
    let adunitTheme = []
    const isDev = str => (process.env.dev ? str : '')

    const i = parseInt(ctx.props.placementInt)
    const isDevice = ctx.props.data.Component === 'Device'
    const Component = isDevice ? Device : Adunit

    /* device helper classes */
    const adunitWrapper = ctx.props.data.Decorate?.CodeName === 'AdunitWrapper'

    if (!isDevice /* is Adunit */) {
      const offerTypeInt = ctx.props.data.OfferType
      const uiTypeInt = ctx.props.data.Ui ? ctx.props.data.Ui : null
      const ui = uiTypeInt ? ctx.parent.$hopX.adunitUiMap(uiTypeInt).ui : ''
      const type = ctx.parent.$hopX.adunitOfferMap(offerTypeInt).type
      let theme = ''
      if (ctx.props.data.Theme) {
        theme = ctx.props.data.Theme
      } else if (ui === 'marketplace') { // default marketplace theme if Theme is null
        theme = 'marketplace-standard'
      } else { // default themes if Theme is null
        theme = 'standard'
      }
      adunitTheme = [
        'adunit-themes',
        `adunit-themes--${type}`.toLowerCase(),
        `adunit-themes--${theme}`.toLowerCase(),
        `adunit-themes--${type}-${theme}`.toLowerCase(),
        adunitWrapper ? ctx.props.data.Decorate?.OfferClass : ''
      ]
    }

    const renderOfferModuleWithoutDisplayAdContainersWithAboveTemplate =
      ctx.props.data.Decorate?.Position === 'AboveAdunit' || false

    const renderOfferModuleWithoutDisplayAdContainers =
      ctx.props.data.Decorate?.RemoveAds /* for adunits */ ||
      ctx.props.data.DeviceData?.RemoveAds /* for devices */ ||
      false

    const getStyle = (className) => {
      try {
        return ctx.parent.$style[className]
      } catch (error) {
        console.log('$test', 'invalid style not found on parent selector')
      }
    }

    const PrimaryOfferModule = (aboveAdunitSlot = {}) =>
      h(Component, {
        props: {
          data: ctx.props.data,
          itemIndex: i,
          adunitTheme: adunitTheme.join('.')
        },
        attrs: {
          class: [
            ...adunitTheme,
            getStyle('product'),
            ctx.props.data.Smlt ? getStyle('seeMoreLikeThis') : '',
            ctx.props.data.Smlt ? 'ref-has-smlt' : '',
            isDevice ? getStyle('device') : ''
          ]
            .join(' ')
            .trim()
        },
        scopedSlots: {
          ...aboveAdunitSlot
        }
      })

    if (renderOfferModuleWithoutDisplayAdContainersWithAboveTemplate) {
      return [
        PrimaryOfferModule({
          aboveAdunit (props) {
            return h({
              data () {
                return ctx.props.data.Decorate
              },
              template: ctx.props.data.Decorate?.Template.replace(
                'v-show="false"',
                ''
              )
            })
          }
        })
      ]
    } else if (renderOfferModuleWithoutDisplayAdContainers) {
      return [PrimaryOfferModule()]
    } else {
      const withAd = i > 0 && i % 1 === 0

      const adWrap = (placement, position, className) => {
        return h(
          'div',
          {
            class: 'm4d-wrap-sticky'
          },
          [
            h(EcomAdvertisement, {
              props: {
                placement,
                position: String(position)
              },
              class: getStyle(className)
            })
          ]
        )
      }

      return [
        withAd && adWrap('inline-sticky', i, 'inlineAd'),
        h('div', {
          class: 'm4d-wrap-sticky-adjacent'
        }),

        h(
          'div',
          {
            attrs: {
              id: `inline-device--${String(i)}`
            },
            class: 'inline-device'
          },
          isDev(`inline-device id#: inline-device--${String(i)}`)
        ),

        withAd &&
          i !== ctx.props.len - 1 &&
          h(EcomAdvertisement, {
            props: {
              placement: 'inline-static',
              position: String(i)
            },
            class: getStyle('inlineStaticAd')
          }),

        PrimaryOfferModule()
      ]
    }
  }
}
</script>

<style lang="scss">
/* externally injectable inline device container */
.inline-device {
  position: relative;
  display: flex;
  justify-content: center;

  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}

.m4d-wrap-sticky {
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  height: 174rem;
  width: calc(100% - 2rem);
  pointer-events: none;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  > div {
    pointer-events: auto;
    width: 100%;
  }
}
.m4d-wrap-sticky + .m4d-wrap-sticky-adjacent {
  width: 1px;
  visibility: hidden;
  pointer-events: none;
}
.ref-shopping-body {
  section article:last-of-type {
    .m4d-wrap-sticky {
      height: 30rem;
    }
  }
}
</style>
