/* eslint-disable */
/*  */
/*  */
/*  */
// * Display Ads Examples
// * Display Ads Examples
// * Display Ads Examples
/*  */
/*  */
/*  */
/*  */
/*  */
/* ad events example */
const fill = (elm, adSize, color = '000/fff') => {
  color = {
    970: '444/fff',
    728: '044/fff',
    320: 'ff0/000',
    300: '132/fff',
    160: '56a/fff',
    120: 'ff0/000',
  }[adSize[0]]

  if (elm.classList.contains('m4d-wrap__bottom-static')) {
    color = 'ff7/111'
  }

  elm.innerHTML = `<img src="https://dummyimage.com/${adSize[0]}x${adSize[1]}/${color}">`
}
const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

const setAd = (size, idx) => {
  return size[idx] || size[idx - 1]
}

const hideEmptyPlaceholders = () => {
  setTimeout(() => {
    Array.from(document.querySelectorAll('.m4d-wrap'))
      .filter((el) => {
        if (!el.classList.contains('m4d-wrap__rail-fixed')) {
          if (el.children[0] && el.children[0].tagName === 'SPAN') {
            return el.children[0]
          }
        }
      })
      .forEach((el) => (el.style.display = 'none'))
  }, 1000)
}

setTimeout(() => {
  window.Spectrum.Event.$on('Ad', ({ event, data }) => {
    if (!data) return {}
    const elm = document.getElementById(data.containerId)

    /*
      fill inline-static slots to support promotional headers
    */
    // if (1 === 1) {
    //   setTimeout(() => {
    //     const size = data.supports.slice(0, 2)
    //     const i = rand(0, 2)

    //     if (size.length > 0 && data.placement === 'inline-static') {
    //       if (parseInt(data.position) % 3 === 0) {
    //         fill(elm, setAd(size, i))
    //       }
    //     } else if (size.length > 0 && data.placement !== 'inline-sticky') {
    //       fill(elm, setAd(size, i))
    //     }

    //     hideEmptyPlaceholders()
    //   }, 0)
    // }

    /*
      fill all with best case
    */
    if (1 === 1) {
      setTimeout(() => {
        const size = data.supports.slice(0, 2)
        const i = 0

        if (size.length > 0 && data.placement === 'inline-sticky') {
          const n = parseInt(data.position)
          if (!isNaN(n) && n % 2 === 0) {
            fill(elm, size[i])
          }
        } else if (size.length > 0 && data.placement !== 'inline-static') {
          fill(elm, size[i])
        }
      }, 0)
    }

    /*
      fill with 1st and 2nd best case
    */
    // if (1 === 1) {
    //   setTimeout(() => {
    //     const size = data.supports.slice(0, 2)
    //     const i = rand(0, 2)

    //     if (size.length > 0 && data.placement === 'inline-sticky') {
    //       fill(elm, setAd(size, i))
    //     } else if (size.length > 0 && data.placement !== 'inline-static') {
    //       fill(elm, setAd(size, i))
    //     }
    //   }, 0)
    // }

    /*
      fill all except bottom fixed
    */
    // if (1 === 1) {
    //   setTimeout(() => {
    //     const size = data.supports.slice(0, 2)
    //     const i = rand(0, 1)

    //     if (data.placement === 'bottom-fixed') { return }

    //     if (size.length > 0 && data.placement === 'inline-sticky') {
    //       fill(elm, size[i])
    //     } else if (size.length > 0 && data.placement !== 'inline-static') {
    //       fill(elm, size[i])
    //     }
    //   }, 0)
    // }

    /*
      fill with inline sticky
    */
    // if (1 === 1) {
    //   setTimeout(() => {
    //     const size = data.supports.slice(0, 2)
    //     const i = rand(0, 1)

    //     if (size.length > 0 && data.placement === 'inline-sticky') {
    //       fill(elm, size[i])
    //     } else if (size.length > 0 && data.placement !== 'inline-static') {
    //       fill(elm, size[i], 'aaa/222')
    //     }
    //   }, 0)
    // }

    /*
      fill with inline static (best case only)
    */
    // if (1 === 1) {
    //   setTimeout(() => {
    //     const size = data.supports.slice(0, 2)
    //     const i = rand(0, 1)

    //     if (size.length > 0 && data.placement === 'inline-static') {
    //       fill(elm, size[i], 'aaa/222')
    //     } else if (size.length > 0 && data.placement !== 'inline-sticky') {
    //       fill(elm, size[i])
    //     }
    //   }, 0)
    // }

    /*
      fill with inline sticky and static
    */
    // if (1 === 1) {
    //   setTimeout(() => {
    //     const size = data.supports.slice(0, 2)
    //     const i = rand(0, 1)

    //     if (size.length > 0 && data.placement !== 'inline-static' && data.position !== '2') {
    //       fill(elm, size[i])
    //     }

    //     if (size.length > 0 && data.placement === 'inline-static' && data.position === '2') {
    //       fill(elm, size[i], 'aaa/222')
    //     }
    //   }, 0)
    // }

    /*
      fill lazy load (with a delay to emphasize lazy loading)
    */
    // if (event === 'on_ad_container_visible') {
    //   setTimeout(() => {
    //     const size = data.supports.slice(0, 2)
    //     const i = rand(0, 2)

    //     if (size.length > 1 && data.placement !== 'inline-static' && data.position !== '2') {
    //       fill(elm, size[i])
    //     }

    //     if (size.length > 1 && data.placement === 'inline-static' && data.position === '2') {
    //       fill(elm, size[i], 'aaa/222')
    //     }
    //   }, 2500)
    // }
  })
}, 1500)

/* //! minified in-console example (best fill)  */
// const _f=(t,e,n="000/fff")=>{t.innerHTML=`<img src="https://dummyimage.com/${e[0]}x${e[1]}/${n}">`};window.Spectrum.Event.$on("Ad",({event:t,data:e})=>{const n=document.getElementById(e.containerId);setTimeout(()=>{const t=e.supports.slice(0,2);t.length>0&&"inline-sticky"===e.placement?_f(n,t[0]):t.length>0&&"inline-static"!==e.placement&&_f(n,t[0])},0)});

/* //! hide all inline-sticky height adjustments if inline sticky is not used */
// ;(function(){
//   var stylesheet = document.styleSheets[0];
//   stylesheet.addRule('.m4d-wrap-sticky-adjacent', 'display: none', 0)
// })()
