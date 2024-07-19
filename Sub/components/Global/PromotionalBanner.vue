<template>
  <div
    v-ui:responsive="{ cb: init }"
    class="banner"
    :style="{
      backgroundColor: comp.backgroundColor,
      height: bannerHeight,
    }"
  >
    <img class="max-w-100 max-h-100" :src="comp.url" :alt="comp.desc">
  </div>
</template>

<script>
export default {
  name: 'EcomPromotionalBanner',
  data () {
    return {
      resize: 0
    }
  },
  computed: {
    device () {
      // eslint-disable-next-line no-unused-expressions
      this.resize
      return this.$mm.minWidth(660) ? 'desktop' : 'mobile'
    },
    comp () {
      return window.Spectrum.Bootstrap.PathLevel?.PromotionalBanner?.attributes[
        this.device
      ]
    },
    bannerHeight () {
      return this.comp.height + 'px'
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init () {
      this.resize++
      document.documentElement.style.setProperty(
        '--promotional-banner-height',
        this.bannerHeight
      )
    }
  }
}
</script>

<style scope>
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}
.max-w-100 {
  max-width: 100%;
  object-fit: contain;
}
.max-h-100 {
  max-height: -webkit-fill-available;
}
</style>
