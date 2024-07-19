export default function (_, inject) {
  const mm = {
    minWidth (val) {
      return window.matchMedia(`(min-width: ${val}px)`).matches
    },
    maxWidth (val) {
      return window.matchMedia(`(max-width: ${val}px)`).matches
    },
    get sm () {
      return window.matchMedia('(max-width: 599px)').matches
    },
    get md () {
      return window.matchMedia('(min-width: 600px) and (max-width: 1079px)').matches
    },
    get lg () {
      return window.matchMedia('(min-width: 1080px)').matches
    },
    get xl () {
      return window.matchMedia('(min-width: 1280px)').matches
    },
    /* Microsoft Edge Browser 12-18 (All versions before Chromium) */
    get msEdge () {
      return /Edge\/1[8|7|6|5|4|3|2]/.test(window.navigator?.userAgent)
    }
  }
  inject('mm', mm)
}
