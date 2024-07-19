import get from 'lodash/get'
import { SafeEventEmit, Event as eventEmitter } from './eventEmitter'
import { Debug } from './console'

export const AnalyticEvent = (appEventName, runtimeData) =>
  SafeEventEmit('Analytics', appEventName, runtimeData)
export const DeviceEvent = (appEventName, runtimeData) =>
  SafeEventEmit('Devices', appEventName, runtimeData)
export const AdEvent = payload => SafeEventEmit('Ad', payload)

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const isTouchscreen = () => {
  return 'ontouchstart' in document.documentElement
}

export const image = (imgPath, o) => {
  if (typeof imgPath === 'string') {
    const params = `output-quality=${o.quality || 70}&resize=${o.width}:${
      o.height
    }`
    return imgPath.search('cacheBuster') > -1
      ? `${imgPath}&${params}`
      : `${imgPath}?${params}`
  }
  return '[QA] The image path was not provided by the API'
}

export function extractActivePage (config) {
  if (!config) {
    Debug(
      'error',
      '[extractActivePage] requires a bootstraps obj with PathExperiences'
    )
    return []
  }
  const page = config.PathExperiences.find(x => x.Active)
  return page
    ? [
      { tn: page.Slug, pg: page.Placement },
      page.RouteName,
      page.Placement,
      page.Slug
    ]
    : []
}

const invertedColorsCache = {}
export function invertColor (i = '#ffffff|rgb(104, 120, 137)') {
  if (typeof i !== 'string') {
    Debug(
      'error',
      `invertColor function requires a string "rgb()" or "hex" value to work properly. 
      Returning #000 as a fallback value.`
    )
    return '#000000'
  }

  if (invertedColorsCache[i]) {
    return invertedColorsCache[i]
  }

  let r
  let g
  let b
  let base = 16

  if (/^#?.{6}$/.test(i)) {
    /* hex */
    r = i.substr(1, 2)
    g = i.substr(3, 2)
    b = i.substr(5, 2)
  } else {
    /* rgb */
    base = 0
    ;[r, g, b] = i.match(/\((.+)\)/)[1].split(', ')
  }

  const yiq =
    (parseInt(r, base) * 299 +
      parseInt(g, base) * 587 +
      parseInt(b, base) * 114) /
    1000

  const invertColor = yiq > 170 ? '#000000' : '#ffffff'
  invertedColorsCache[i] = invertColor

  return invertColor
}

export function adunitOfferMap (type) {
  switch (parseInt(type)) {
    case 1:
      /* 1 - Magazine */
      return {
        component: 'EcomMagazineAdunit',
        type: 'magazine'
      }
    default:
      /* 2 - Merchandise */
      return {
        component: 'EcomMerchandiseAdunit',
        type: 'merchandise'
      }
  }
}

export function adunitUiMap (type) {
  switch (parseInt(type)) {
    case 1:
      /* 2 - Merchandise */
      return {
        component: 'EcomMerchandiseAdunit',
        type: 'merchandise',
        ui: 'standard'
      }
    case 2:
      /* 1 - Magazine */
      return {
        component: 'EcomMagazineAdunit',
        type: 'magazine',
        ui: 'standard'
      }
    case 3:
      return {
        component: 'EcomSuperfeatureAdunit',
        type: 'superfeature',
        ui: 'standard'
      }
    case 4:
      return {
        component: 'MarketplaceMerchandiseAdunit',
        type: 'merchandise',
        ui: 'marketplace'
      }
    case 5:
      return {
        component: 'MarketplaceMagazineAdunit',
        type: 'magazine',
        ui: 'marketplace'
      }
    case 6:
      return {
        component: 'TabMicrositeAdunit',
        type: 'merchandise',
        ui: 'tab-microsite'
      }
    default:
      return {
        component: 'EcomMerchandiseAdunit',
        type: 'merchandise',
        ui: 'standard'
      }
  }
}

export function getParentComponent (prop) {
  let node = this.$parent
  while (!node || !get(node, prop)) {
    if (node) {
      node = node.$parent
    } else {
      break
    }
  }
  return get(node, prop)
}

/* expose helper methods to ShopX app */
export const Event = eventEmitter
export const debug = Debug

/* exposing to window on client only */
if (window && window.Spectrum) {
  window.Spectrum.Event = Event
  window.Spectrum.Debug = debug
}
