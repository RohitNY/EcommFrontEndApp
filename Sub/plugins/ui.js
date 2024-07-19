import Vue from 'vue'
import debounce from 'lodash/debounce'
import createObserver from '~/helpers/intersectionObserver'
import { Event } from '~/helpers/utility.js'

const UI_STATE = {
  scrollObserver: [],
  responsiveElements: []
}

export function addAnimationClass (el, animationClasses, { immediate, onenter }) {
  if (!el || !animationClasses) {
    return
  }

  if (immediate) {
    el.addEventListener(
      'animationend',
      () => {
        el.classList.remove('animated', ...animationClasses.split(' '))
      },
      false
    )
    requestAnimationFrame(() => {
      el.classList.add('animated', ...animationClasses.split(' '))
    })
  }

  if (onenter) {
    el.addEventListener('animationstart', handleAnimationStart, false)
    el.addEventListener('animationend', handleAnimationEnd, false)
    const observer = createObserver(el, (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.$$observer = observer
          requestAnimationFrame(() => {
            el.classList.add('animated', ...animationClasses.split(' '))
          })
        }
      })
    })
  }
}
function handleAnimationStart () {
  this.classList.remove('u-display-hidden')
  this.parentNode.classList.remove('u-display-hidden') // TODO: reconsider this 💩
}
function handleAnimationEnd () {
  this.classList.remove('animated')
  onDestroy.call(this)
}
function onDestroy () {
  if (this.$$observer) {
    this.$$observer.unobserve(this)
  }

  this.removeEventListener('animationstart', handleAnimationStart, false)
  this.removeEventListener('animationend', handleAnimationEnd, false)
}

/* ---------------------------------------------------------------------------------------------- */
const responsive = {
  cb () {
    UI_STATE.responsiveElements.forEach(([vnode, cb]) => {
      vnode.context.$forceUpdate()
      if (cb && typeof cb === 'function') {
        cb.call(vnode.context)
      }
    })
  }
}
function responsiveEventHandler (vnode, cb = null) {
  UI_STATE.responsiveElements.push([vnode, cb])
}
window.addEventListener('resize', debounce(() => responsive.cb(), 100, { leading: true, trailing: true, maxWait: 300 }))
/* ---------------------------------------------------------------------------------------------- */

function scrollEventHandler () {
  const throttle = window.scrollEventHandlerThrottle || new Map()
  window.scrollEventHandlerThrottle = throttle

  window.onscroll = function (evt) {
    while (true) {
      const b = UI_STATE.scrollObserver.pop()
      if (!b) {
        break
      } else if (b && typeof b.fn === 'function') {
        if (throttle.has(b.id)) {
          window.removeEventListener('scroll', throttle.get(b.id), { passive: true })
          throttle.delete(b.id)
        }
        if (!throttle.has(b.id)) {
          const func = debounce(() => b.fn(evt), b.debounce, { leading: true, trailing: true })
          window.addEventListener('scroll', func, { passive: true })
          throttle.set(b.id, func)
        }
      }
    }
  }
}
scrollEventHandler()
/* ---------------------------------------------------------------------------------------------- */

function intersectionObserver (cb, elmId, el = null) {
  const target = el || document.querySelector('#' + elmId)
  if (!target) {
    return
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
    /* chrome only support and slow (revisit) */
    // delay: 100,
    // trackVisibility: true
  }

  const callback = debounce((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.1) {
        observer.unobserve(target)
        // cb(entry.boundingClientRect)
        cb(el)
      }
    })
  }, 50)

  const observer = new IntersectionObserver(callback, options)
  observer.observe(target)
}
/* ---------------------------------------------------------------------------------------------- */

export default function () {
  Vue.directive('ui', {
    bind (el, binding, vnode) {
      if (binding.arg === 'animate') {
        addAnimationClass(el, binding.value, binding.modifiers)
      }
      if (binding.arg === 'responsive') {
        responsiveEventHandler(vnode, binding.value?.cb)
      }
      if (binding.arg === 'scroll-observer') {
        UI_STATE.scrollObserver.push(binding.value)
      }
    },
    inserted (el, binding) {
      if (el && binding.arg === 'intersect') {
        intersectionObserver(binding.value.cb, binding.value.target, el)
      }
    }
  })
}

Event.$on('UI', (payload) => {
  if (payload.action === 'RESET_STATE') {
    UI_STATE[payload.key] = payload.value
  }
})
