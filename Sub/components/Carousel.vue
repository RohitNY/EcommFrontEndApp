<template>
  <swiper ref="gallery" class="swiper gallery" :options="swiperOption">
    <swiper-slide v-for="m in media" :key="m.Id" :data-swiper-autoplay="m.duration">
      <video
        v-if="$parent.isVideo(m)"
        ref="video"
        aria-label="Product Video"
        controls
        type="mp4"
        :src="m.Video.Url"
      />
      <div v-else class="swiper-zoom-container">
        <img
          class="swiper-lazy"
          :data-src="$hopX.image(m.Url, offerTypeAwareImgSizing)"
          :alt="m.Alt"
          aria-label="Product Image"
        >
        <div class="swiper-lazy-preloader" />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  name: 'EcomCarousel',
  props: {
    media: Array
  },
  data () {
    return {
      swiperOption: {
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        updateOnWindowResize: true,
        threshold: 2,
        loop: false,
        zoom: {
          maxRatio: 2.25
        },
        lazy: true
      }
    }
  },
  computed: {
    offerTypeAwareImgSizing () /* determine img size based on offerType set for active media */ {
      switch (this.$store.getters['media/getOfferType']) {
        case 'merchandise':
          return { width: 1125, height: 1125 }
        case 'magazine':
          return { width: 1125, height: 1542 }
        default:
          return { width: 1125, height: 1125 }
      }
    }
  },
  beforeMount () {
    this.viewport = document.querySelector('meta[name=viewport]')
    this.viewportContent = this.viewport.content
    this.viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    )
  },
  beforeDestroy () {
    this.viewport.setAttribute('content', this.viewportContent)
  },
  mounted () {
    this.swiper = this.$refs.gallery.$swiper
    this.swiper.on('transitionStart', () => {
      this.$emit('transitionStart')
      this.pausePlayingVideo()
    })
    this.swiper.on('transitionEnd', () => {
      this.$emit('transitionEnd', this.swiper.activeIndex)
    })
  },
  methods: {
    pausePlayingVideo () {
      if (this.$refs.video) {
        this.$refs.video.forEach((vid) => {
          vid.pause()
        })
      }
    }
  }
}
</script>

<style lang="scss">
.swiper {
  height: 47.777vh;
  width: 100%;
  margin: 2rem 0 1rem;
  user-select: none;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: manipulation;
    .swiper-zoom-container {
      .swiper-lazy {
        &:not(.swiper-lazy-loaded) {
          display: none;
        }
      }
    }
  }
  img,
  video {
    max-width: 80vw;
    min-width: 66.777%;
    max-height: 100%;
  }
}
</style>
