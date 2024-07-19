/**
 *
 * @param {*} el
 * @param {*} handleIntersect
 */
export default function createObserver (el, handleIntersect) {
  const options = {
    root: null,
    rootMargin: '0px'
  }

  const observer = new IntersectionObserver(handleIntersect, options)
  observer.observe(el)

  return observer
}
