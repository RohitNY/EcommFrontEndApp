<template>
  <nav>
    <ul ref="navMenu" :class="$style.navPageList">
      <li v-for="page in setup.PathExperiences" :key="page.Id">
        <nuxt-link
          v-show="page.Visited"
          :ref="page.Slug"
          :class="$style.link"
          exact
          :exact-active-class="$style.active"
          :to="{
            name: 'shop',
            query: {
              tn: page.Slug,
              pg: page.Placement
            }
          }"
        >
          {{ page.PageTitle }}
        </nuxt-link>
      </li>
      <li ref="pageTitleUnderline" :class="$style.activeUnderline" />
    </ul>
  </nav>
</template>

<script>
let reqId, gStop, gStart, gEnd, gDirection

function animateToActivePageTitle (elm) {
  const stop = () => {
    if (reqId) {
      cancelAnimationFrame(reqId)
    }
    gStop = true
    gStart = null
    gEnd = null
    gDirection = null
  }

  const start = () => {
    if (gStart === gEnd) {
      return
    }
    reqId = requestAnimationFrame(animate)
    gStop = false
  }

  const animateForward = () => {
    gStart += 10
    elm.scrollLeft = gStart
  }

  const animateBackward = () => {
    gEnd -= 10
    elm.scrollLeft = gEnd
  }

  const animate = () => {
    !gStop && gDirection === 'forward' ? animateForward() : animateBackward()
    gStart > gEnd ? stop() : start()
  }

  return start()
}

export default {
  name: 'EcomNav',
  props: {
    setup: Object
  },
  watch: {
    '$route.query' (newParmas, prevParams) {
      const { tn: slug, pg: newPage } = newParmas
      const { pg: prevPage } = prevParams

      if (slug) {
        this.$nextTick(() => {
          this.$refs[slug].forEach(({ $el }) => {
            this.slideToActive($el, slug, newPage, prevPage)
          })
        })
      }
    }
  },
  mounted () {
    const slug = this.$route.query.tn
    if (slug) {
      this.$refs[slug].forEach(({ $el }) => this.slideToActive($el, slug))
    }
  },
  methods: {
    async slideToActive (elm, slug, newPage = 1, prevPage = 0) {
      await this.$hopX.sleep(500)

      const nav = this.$refs.navMenu
      if (nav && nav.scrollWidth > nav.clientWidth) {
        /* sm */
        const active = elm.parentNode
        const maxScrollLeft = nav.scrollWidth - nav.clientWidth

        let scrollLeft =
          active.offsetLeft + active.clientWidth / 2 - nav.clientWidth / 2
        if (scrollLeft <= 0) {
          scrollLeft = 0
        } else if (scrollLeft > maxScrollLeft) {
          scrollLeft = maxScrollLeft
        }

        gStart = nav.scrollLeft
        gEnd = scrollLeft
        gDirection = newPage > prevPage ? 'forward' : 'backward'

        animateToActivePageTitle(nav)
        await this.moveUnderline(elm, slug)
      } else {
        /* md+ viewport */
        await this.scrollIntoView(elm)
        await this.moveUnderline(elm, slug)
      }
    },
    scrollIntoView (activeElement) {
      return new Promise((resolve) => {
        activeElement.parentNode.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        })
        resolve()
      })
    },
    moveUnderline (activeElement, slug) {
      return new Promise((resolve) => {
        const animate = () => {
          const underline = this.$refs.pageTitleUnderline
          const navMenu = this.$refs.navMenu
          const { width, left } = activeElement.getBoundingClientRect()
          const scrollLeft = this.$refs.navMenu?.scrollLeft
          const activePath = this.$store.getters[
            'app/getPagePathExperienceBySlug'
          ](slug)

          if (underline) {
            underline.style.width = `${width}px`
            underline.style.transform = `translateX(${left + scrollLeft}px)`
            underline.style.backgroundColor =
              activePath.Ui.Colors?.PageTitleUnderline ||
              activePath.Ui.Colors?.TabHeaderTextUnderline ||
              '#ffffff'
          }

          navMenu.style.color =
            activePath.Ui.Colors?.TabHeaderTextColor || '#ffffff'
          navMenu.style.background =
            activePath.Ui.Colors?.TabHeaderBackground || 'rgba(0, 0, 0, 0.6)'

          if (activePath.Ui.Colors.TabHeaderTextColor) {
            const tabLinks = navMenu.querySelectorAll('li a')
            for (let x = 0; x < tabLinks.length; x++) {
              tabLinks[x].style.color = activePath.Ui.Colors.TabHeaderTextColor
            }
          }
        }

        requestAnimationFrame(animate)
        resolve()
      })
    }
  }
}
</script>

<style lang="scss" module>
/* sub-header - nav links */

nav {
  pointer-events: auto;
}
.activeUnderline {
  width: 5px;
  height: 4px;
  position: absolute;
  bottom: 6px;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
    width 0.2s ease-in, background-color 0.2s ease-in;
}

.navPageList {
  position: relative;
  padding: 0;
  list-style: none;
  background-color: rgba(0, 0, 0, 0.6);
  height: 4.8rem;
  width: 100vw;
  max-width: 100%; /* required for MS Windows Browsers */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row nowrap;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .link {
    &:link,
    &:active,
    &:visited,
    &:hover {
      font-family: var(--app-font-bold);
      font-size: 1.47rem;
      text-transform: uppercase;
      text-decoration: none;
      color: white;
      margin: 0 1.777rem;
      opacity: 0.6;
    }
    &.active {
      opacity: 1;
      cursor: default;
    }
  }
}
</style>
