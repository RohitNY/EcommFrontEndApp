<template>
  <article v-ui:responsive :class="[$style.shoppingLayout, 'container']">
    <header>
      <HeaderLinks />

      <EcomShoppingHeader />
    </header>
    <transition name="transitions-fade">
      <img
        v-if="h.Sm && $mm.maxWidth(959)"
        :key="h.Sm"
        :class="$style.pageBgImg"
        :src="$hopX.image(h.Sm, { width: 960, height: 1440 })"
      >
      <img
        v-else-if="h.Lg"
        :key="h.Lg"
        :class="$style.pageBgImg"
        :src="$hopX.image(h.Lg, { width: 1366, height: 760 })"
      >
      <img
        v-else-if="h"
        :key="h"
        :class="$style.pageBgImg"
        :src="$hopX.image(h, { width: 1366, height: 760 })"
      >
    </transition>
    <nuxt :class="$style.shopping" />
    <EcomFooter :class="$style.footer" />
    <EcomModal />
  </article>
</template>

<script>
import EcomShoppingHeader from '~/components/ShoppingHeader.vue'
import EcomFooter from '~/components/Footer.vue'
import EcomModal from '~/components/Modal.vue'
import HeaderLinks from '@/components/HeaderLinks.vue'

export default {
  components: {
    EcomShoppingHeader,
    EcomFooter,
    EcomModal,
    HeaderLinks
  },
  data () {
    return {
      page: null
    }
  },
  computed: {
    setup () {
      return this.$store.getters['app/getBootstrapConfig']
    },
    h () /* header */ {
      return (
        this.page?.Ui?.FixedBackgroundImage || this.page?.Ui?.TabHeaderImage
      )
    }
  },
  beforeMount () {
    this.setActivePathExperience()
    this.setPageColorVar()
  },
  methods: {
    setPageColorVar () {
      document.documentElement.style.setProperty(
        '--runtime-page-color',
        this.page?.Ui?.Colors?.PageBackground || '#ffffff'
      )
    },
    setActivePathExperience () {
      this.page =
        this.setup.PathExperiences.find(
          path => path.Slug === this.$route.query.tn
        ) || null
      if (!this.page) {
        this.$router.push({ name: 'error' })
      }
    }
  }
}
</script>

<style lang="scss" module>
header {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 3;
  width: 100%;
}
.footer {
  position: relative;
  z-index: 2;

  &:after {
    content: '';
    background: #c5cac9;
    width: 100vw;
    height: 7rem;
  }
}
.shoppingLayout {
  // transition: background-color 300ms ease-out;
  position: relative;
}
.shopping {
  position: relative;
  margin-top: 67px;
  padding-top: 48px;
}
.pageBgImg {
  object-fit: contain;
  position: fixed;
  width: 100vw;
  max-width: 100%; /* required for MS Windows Browsers */

  top: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-repeat: repeat-y;

  @include sm {
    height: 100%;
    object-fit: cover;
  }
}
.pageBgImgMinHeight {
  height: 33.627rem;

  @media (max-width: 1280px) {
    height: 31.5rem;
  }
  @media (max-width: 1230px) {
    height: 30rem;
  }
  @media (max-width: 1180px) {
    height: 28rem;
  }
  @media (max-width: 1120px) {
    height: 26rem;
  }
  @media (max-width: 1060px) {
    height: 23rem;
  }
  @media (max-width: 1010px) {
    height: 21.2567rem;
  }
  @media (max-width: 959px) {
    height: 67rem;
  }
  @media (max-width: 900px) {
    height: 63rem;
  }
  @media (max-width: 850px) {
    height: 59rem;
  }
  @media (max-width: 800px) {
    height: 55rem;
  }
  @media (max-width: 750px) {
    height: 51rem;
  }
  @media (max-width: 700px) {
    height: 47rem;
  }
  @media (max-width: 650px) {
    height: 43rem;
  }
  @media (max-width: 600px) {
    height: 39rem;
  }
  @media (max-width: 550px) {
    height: 35rem;
  }
  @media (max-width: 500px) {
    height: 31rem;
  }
  @media (max-width: 450px) {
    height: 27rem;
  }
  @media (max-width: 400px) {
    height: 23rem;
  }
  @media (max-width: 350px) {
    height: 19rem;
  }
}
</style>
