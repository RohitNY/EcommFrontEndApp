import get from 'lodash/get'

export function displayAds (emitter) {
  const adEventsQueueCb = (payload) => {
    const displayAds = get(window, 'Spectrum.DisplayAds')
    if (displayAds) {
      if (!displayAds.Subscribed && displayAds.EventsEmitted) {
        if (displayAds.EventsEmitted.length < (process.env.dev ? 30 : 500)) {
          window.Spectrum.DisplayAds.EventsEmitted.push(payload)
        } else {
          emitter.$off('Ad', 'on_remove_internal_ad_queue', adEventsQueueCb)
          delete window.Spectrum.DisplayAds
        }
      }
    } else {
      emitter.$off('Ad', 'on_remove_internal_ad_queue', adEventsQueueCb)
    }
  }
  emitter.$on('Ad', adEventsQueueCb)
}
