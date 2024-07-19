/* eslint-disable no-unreachable */
import get from 'lodash/get'
import difference from 'lodash/difference'
import { debug } from '~/helpers/utility.js'

export function dataPropValue (eventName, eventProp) {
  switch (eventProp) {
    case 'Page.AnalyticsData':
      return (pageData = null) => {
        return { page_data: pageData } || dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    case 'Aggregate<Page.Items[n].AnalyticsData>':
      return (items) => {
        const data = items.reduce((arr, i) => {
          arr.push(i.AnalyticsData)
          return arr
        }, [])
        return { items: data } || dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    case 'Aggregate<Similar.Items[n].AnalyticsData>':
      return (items) => {
        const data = items.reduce((arr, i) => {
          arr.push(i.AnalyticsData)
          return arr
        }, [])
        return { items: data } || dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    case 'Spectrum.Bootstrap.AnalyticsData':
      return (setup) => {
        const data = setup.AnalyticsData
        return data || dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    case 'Spectrum.Bootstrap.PathExperiences[n].AnalyticsData':
      return (pathExperiences, slug) => {
        const data = pathExperiences.find(pathExp => pathExp.Slug === slug).AnalyticsData
        return data || dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    case 'Cart.AnalyticsData':
      return (cartStore) => {
        const data = cartStore.analyticsData
        return data || dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    case 'Cart.Items[n].AnalyticsData':
      return (items, offerCode) => {
        const data = items.find(item => item.OfferCode === offerCode).AnalyticsData
        return data || dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    case 'Page.Items[n].AnalyticsData':
      return (items, offerCode) => {
        for (const item of items) {
          // * Adunit
          if (item.Offers) {
            const offers = item.Offers
            for (const offer of offers) {
              if (offer.OfferCode === offerCode) {
                return item.AnalyticsData
              }
            }
          }
          // * Device
          if (item.DeviceId) {
            return item.AnalyticsData
          }
        }
        return dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    case 'Item.AnalyticsData':
      return (item) => {
        const data = item.AnalyticsData
        return data || dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    case 'Similar.AnalyticsData':
      return (item) => {
        const data = item.AnalyticsData
        return { similar: data } || dataPropValue(eventName, `<NoValue> ${eventProp}`)
      }
    default:
      debug(
        'error',
        `[${eventName}] event requested data value(s) for a 
         property named "${eventProp}". A valid case for this
         property could not be found.`
      )
      return null
  }
}

export function getDataProps (obj) {
  const evt = Object.assign({ _fns: [] }, obj)

  if (obj.$data) {
    obj.$data.forEach((el) => {
      evt._fns.push(dataPropValue(obj.event, el))
    })
  }

  return evt
}

export function mergeUsesProps (eventObj, mergeUsesPropsObj) {
  const eventData = eventObj.data
  Object.assign(eventData, mergeUsesPropsObj)

  const everyPropMatched = eventData.$include.every((item) => {
    return Object.prototype.hasOwnProperty.call(mergeUsesPropsObj, item)
  })

  if (!everyPropMatched) {
    const expectedUses = eventData.$include
    const mergedUses = Object.keys(mergeUsesPropsObj)
    debug(
      'error',
      `[${eventObj.event}] is missing a required value defined
         in it's $include property. The missing value(s):
         
         ${difference(expectedUses, mergedUses).join(', ')}`
    )
  }

  delete eventObj.data.$include

  return eventObj
}

export function eventConstructor (eventName, args = null, mergeUsesPropsObj = {}) {
  const path = 'Spectrum.Analytics.Events.' + eventName

  try {
    const evt = get(window, path)
    if (!evt) {
      debug('error', `[${path}] does not return a valid analytics definition.`)
      throw new Error(`Event [${eventName}] is undefined on Spectrum.Analytics.Events configuration object.`)
    } else {
      const processEvent = Object.assign({}, getDataProps(evt))

      if (args) {
        args.forEach((argValueGroup, i) => {
          const res = processEvent._fns[i].apply(null, argValueGroup)
          Object.assign(processEvent, res)
        })
      }

      delete processEvent.$data
      delete processEvent._fns

      const event = processEvent.event
      const msg = processEvent.msg
      const emitEvent = {
        msg,
        event,
        data: {
          ...processEvent
        }
      }
      delete emitEvent.data.event
      delete emitEvent.data.msg

      if (emitEvent.data.$include) {
        mergeUsesProps(emitEvent, mergeUsesPropsObj)
      }

      return emitEvent
    }
  } catch (err) {
    debug('log', '[Rescue Analytics Event]', {
      error: err,
      data: {
        path,
        args,
        mergeUsesPropsObj
      }
    })
  }
}

const events = {
  onInitialLoad ({ setup }) {
    return eventConstructor('PageInitialLoad', [[setup]])
  },
  onApiRedirectFailure (args) {
    return eventConstructor('ApiRequestHardFailure', null, args)
  },
  onTabChange ({ pathExp, slug }) {
    return eventConstructor('PageTabChange', [[pathExp, slug]])
  },
  onTabItemsLoaded ({ pageData, items }) {
    return eventConstructor('TabItemsLoaded', [[pageData], [items]])
  },
  onTabItemsLoadedAttempted ({ item }) {
    return eventConstructor('TabItemsLoadedAttempted', [[item]])
  },
  onTabItemInView ({ product }) {
    const offerCode = product.OfferType ? product.Offers[0].OfferCode /* adunit */ : product.DeviceId /* device */
    const items = [product]

    return eventConstructor('TabItemEnteredView', [[items, offerCode]])
  },
  onSmltButtonClicked ({ adunit }) {
    const offerCode = adunit.Offers[0].OfferCode
    const items = [adunit]

    return eventConstructor('SmltButtonClick', [[items, offerCode]])
  },
  onSmltItemsLoaded ({ adunit, response, items }) {
    return eventConstructor('SmltItemsLoaded', [[adunit], [response], [items]])
  },
  onSmltItemsLoadedAttempted ({ adunit }) {
    return eventConstructor('SmltItemsLoadedAttempted', [[adunit]])
  },
  onMoreInfoClicked ({ adunit }) {
    const offerCode = adunit.Offers[0].OfferCode
    const items = [adunit]

    return eventConstructor('MoreInfoClick', [[items, offerCode]])
  },
  onMainAdunitImageClicked ({ adunit }) {
    const offerCode = adunit.Offers[0].OfferCode
    const items = [adunit]

    return eventConstructor('ImageClick', [[items, offerCode]])
  },
  /* cart events */
  onCartOpenOnHeaderClick () {
    const cart = window.$ecom.$store.getters['cart/getCartStore']

    return eventConstructor('CartOpenOnHeaderClick', [[cart]])
  },
  onCartOpenOnOptionModalClick ({ type }) {
    const cart = window.$ecom.$store.getters['cart/getCartStore']

    return eventConstructor('CartOpenOnOptionSelectClick', [[cart]], {
      offer_type: type
    })
  },
  onAddToCart ({ request, response }) {
    const offerCode = request.Payload.OfferCode
    const items = response.Items

    return eventConstructor('CartItemAdd', [[items, offerCode]])
  },
  onAddToCartFailed ({ request, response }) {
    const offerCode = request.Payload.OfferCode
    const items = response.Items

    return eventConstructor('CartItemAddAttempted', [[items, offerCode]], {
      offer_code: offerCode,
      quantity: request.Payload.Qty
    })
  },
  onUpdateCartItem ({ request, response }) {
    const offerCode = request.Payload.OfferCode
    const items = response.Items

    return eventConstructor('CartItemUpdate', [[items, offerCode]])
  },
  onUpdateCartItemFailed ({ request, response }) {
    const offerCode = request.Payload.OfferCode
    const items = response.Items

    return eventConstructor('CartItemUpdateAttempted', [[items, offerCode]])
  },
  onRemoveFromCart ({ request, response }) {
    const offerCode = request.Payload.OfferCode
    const items = response.Items

    return eventConstructor('CartItemRemove', [[items, offerCode]])
  },
  onRemoveFromCartFailed ({ request, response }) {
    const offerCode = request.Payload.OfferCode
    const items = response.Items

    return eventConstructor('CartItemRemoveAttempted', [[items, offerCode]])
  },
  onCartCheckoutClicked () {
    const cart = window.$ecom.$store.getters['cart/getCartStore']

    return eventConstructor('CartCheckout', [[cart]])
  },
  onProductClicked ({ data, msg, event }) {
    return eventConstructor('AffiliateProductClick', [[data, msg, event]])
  }
}

export const analyticEvents = events
