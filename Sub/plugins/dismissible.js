import Vue from 'vue'

export default function () {
  Vue.directive('dismissible', {
    bind (el, binding, vnode) {
      const cb = () => {
        requestAnimationFrame(() => {
          vnode.elm.classList.add('animated', 'fadeOut')
        })
      }

      vnode.elm.addEventListener(
        'animationend',
        (evt) => {
          if (evt.animationName !== 'fadeIn') {
            el.removeEventListener('click', cb, false)
            vnode.elm.classList.remove('animated', 'fadeIn')
            vnode.elm.parentElement.removeChild(vnode.elm)
          }
        },
        false
      )

      requestAnimationFrame(() => {
        vnode.elm.classList.remove('u-display-hidden')
        vnode.elm.classList.add('animated', 'fadeIn')
      })

      el.addEventListener('click', cb, false)
    }
  })
}
