<template>
  <article
    v-if="page"
    v-ui:responsive
    :class="[$style.shoppingLayout, 'container']"
    style="{
      background: '#ffffff'
    }"
  >
    <EcomHeader :setup="setup" />

    <nuxt :key="$route.name" :class="$style.shopping" />

    <EcomFooter />
    <EcomModal />

    <div v-if="appCodeNameShow" :class="$style.appCodeName">
      {{ appCodeName }}
    </div>
  </article>
</template>

<script>
import EcomHeader from '~/components/Header.vue'
import EcomFooter from '~/components/Footer.vue'
import EcomModal from '~/components/Modal.vue'

export default {
  components: {
    EcomHeader,
    EcomFooter,
    EcomModal
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
    appCodeName () {
      return process.env.version
    },
    appCodeNameShow () {
      return this.$route.query.dev === '1'
    }
  },
  watch: {
    '$route.query.tn' (nextSlug) {
      this.setActivePathExperience()
      this.setPageColorVar()
      this.tabChangeAnalytics(nextSlug)
    }
  },
  beforeMount () {
    this.setActivePathExperience()
    this.setPageColorVar()
  },
  mounted () {
    if (window.Spectrum) {
      if (!window.Spectrum.Version) {
        const config = this.$store.getters['app/getBootstrapConfig']
        this.$hopX.AnalyticEvent('onInitialLoad', {
          setup: config
        })
        this.tabChangeAnalytics(this.$route.query.tn)
      }

      /* set app version */
      window.Spectrum.Version = this.appCodeName
    }
  },

  methods: {
    tabChangeAnalytics (nextSlug = null) {
      this.$hopX.AnalyticEvent('onTabChange', {
        pathExp: [this.page],
        slug: nextSlug
      })
    },
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
.shoppingLayout {
  transition: background-color 300ms ease-out;
  position: relative;
}
.shopping {
  position: relative;
  margin-top: 67px;
  padding: 4.55rem 0.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.33);
}
.appCodeName {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.627);
  font-size: 1.7rem;
  padding: 0.25rem 0.75rem;
}
</style>
