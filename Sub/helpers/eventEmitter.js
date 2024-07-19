import Vue from 'vue'
import { Log as log, Debug as debug } from './console'
import { analyticEvents } from '~/events/appAnalytics'

const VueEventBus = new Vue()
let eventCount = 1

const emitLog = (eventId, eventType, payload) => {
  // * enable with flag => localStorage.setItem('$hopX_Emitter_Log', 'All')
  const myEventLog = log(eventType, eventId)

  const clientLogSetting = localStorage.getItem('$hopX_Emitter_Log')
  if (clientLogSetting) {
    const eventPayload = JSON.stringify(payload)
    if (clientLogSetting === 'All') {
      myEventLog(eventPayload)
    } else {
      if (eventType === 'Ad' && clientLogSetting === 'Ad') {
        myEventLog(eventPayload)
      }
      if (eventType === 'Analytics' && clientLogSetting === 'Analytics') {
        myEventLog(eventPayload)
      }
      if (eventType === 'Devices' && clientLogSetting === 'Devices') {
        myEventLog(eventPayload)
      }
    }
  }
}

const emitter = (eventType, payload) => {
  const emitEventId = ++eventCount

  const emittedPayload = typeof payload === 'string' ? { event: payload /* action */ } : Object.assign({}, payload)
  VueEventBus.$emit(eventType, { event_id: emitEventId, ...emittedPayload })

  return Promise.resolve({
    id: emitEventId,
    payload: emittedPayload
  })
}

export const Event = {
  $on (event, cb) {
    VueEventBus.$on(event, cb)
  },
  $off (eventGroup, event, cb) {
    VueEventBus.$off(eventGroup, cb)

    const myEventLog = log('Unsubscribe', null)
    const eventPayload = JSON.stringify({
      msg: 'Event has been unsubscribed (notice)',
      event_group: `<${eventGroup}>`,
      event
    })

    myEventLog(eventPayload)
  },
  /**
   *
   * @param {string} event type of event such as Device, UI, or Analytics
   * @param {(object|string)} payload the string or object{} containing event details, ie: payload
   * @param {object} runtimeData computed when the event is emitted
   */
  $emit (eventType, payload, runtimeData) {
    if (typeof payload === 'string') {
      /* // ! handle <Devices> Events */
      if (/Device/.test(payload)) {
        return emitter(eventType, payload)
      }

      /* // ! handle <Analytics> Events */
      const fn = analyticEvents[payload]
      if (fn) {
        const computedPayload = fn(runtimeData)
        return emitter(eventType, computedPayload)
      } else {
        debug(
          'error',
          `[${payload}] analyticEvents.events does not have an event matching this name.
          Front-end attempted to emit this event but because a callback is not set
          will skip this event for now. <Missing Implementation>`
        )
        return
      }
    }

    /* all remaining emitted events */
    return emitter(eventType, payload)
  }
}

export const SafeEventEmit = async (eventType, orgPayload = null, runtimeData = null) => {
  try {
    const { id, payload } = await Event.$emit(eventType, orgPayload, runtimeData)
    if (id) {
      emitLog(id, eventType, payload)
    }
  } catch (err) {
    /* Rescue Analytics Error */
  }
}
