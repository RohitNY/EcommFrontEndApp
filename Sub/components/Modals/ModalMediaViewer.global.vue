<template>
  <div v-ui:animate.onenter="'fadeInDown faster delay-300ms'" class="modal">
    <!-- Swiper Media Gallery -->
    <span class="modalTitle">
      <img
        src="~/assets/images/icon-close.svg"
        class="s-modal-close-x fixed-right"
        @click.self="closeMediaViewer"
      >
      &nbsp;
    </span>
    <EcomCarousel
      :media="getMedia"
      @transitionStart="handleTransitionStart"
      @transitionEnd="handleTransitionEnd"
    />
    <transition name="transitions-fade">
      <div v-if="helpfulHint" class="helpful-hint-wrap">
        <div class="pill">
          {{ $hopX.isTouchscreen() ? 'Pinch' : 'Double-tap' }} to Zoom In and Out
        </div>
      </div>
    </transition>
    <section class="actions">
      <section class="thumbs">
        <div
          v-for="(media, idx) in getMedia"
          :key="media.Id"
          :class="['thumb', idx === activeThumbIdx && 'active']"
          @click="gotoMedia(idx)"
        >
          <img
            :alt="media.Alt"
            :src="$hopX.image(media.Url, {width: 75, height: 75})"
            role="button"
            class="image"
          >
          <div v-if="isVideo(media)" class="video-overlay">
            <EcomVideoPlayIcon class="play-icon" />
          </div>
        </div>
      </section>
      <section class="meta">
        <span v-text="activeThumbIdx + 1" />
        of {{ getMedia.length }}
        <div v-if="getMedia.length > 1" class="g-dim-70">
          Swipe Through Images
          <span v-if="!$hopX.isTouchscreen()">
            <strong>or</strong> Use your keyboard
            <kbd>LEFT</kbd> and
            <kbd>RIGHT</kbd> arrow keys to navigate images.
          </span>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EcomCarousel from '~/components/Carousel.vue'
import EcomVideoPlayIcon from '~/components/Icons/VideoPlayIcon.vue'

export default {
  name: 'EcomModalMediaViewer',
  components: {
    EcomCarousel,
    EcomVideoPlayIcon
  },
  data () {
    return {
      helpfulHint: true,
      activeThumbIdx: 0
    }
  },
  computed: {
    ...mapGetters('media', ['getMedia'])
  },
  mounted () {
    this.child = this.$children.find(comp => comp.swiper)
    this.child.swiper.on('zoomChange', () => {
      this.helpfulHint = false
    })
  },
  methods: {
    closeMediaViewer () {
      this.$store.dispatch('modal/close')
    },
    isVideo (media) {
      return Boolean(media.Video)
    },
    handleTransitionStart () {
      this.helpfulHint = false
    },
    handleTransitionEnd (activeMediaIdx) {
      this.activeThumbIdx = activeMediaIdx
      this.$nextTick(async () => {
        await this.$hopX.sleep(100)
        this.$el.querySelector('.thumb.active').scrollIntoView({
          behavior: 'smooth',
          inline: 'end',
          block: 'end'
        })
      })
    },
    gotoMedia (i) {
      this.child.swiper.slideTo(i, 555, false)
      this.handleTransitionEnd(i)
    }
  }
}
</script>

<style lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 1.7rem;
  color: #ffffff;
  width: calc(100% - 1.775rem);
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  @include sm {
    max-width: calc(100% - 1rem);
    min-height: 32rem;
    max-height: 90.88887vh;
  }
  @include md {
    max-width: 150rem;
    min-height: 32rem;
    max-height: 83.88887vh;
  }
}

.modalTitle {
  color: var(--app-color-orange);
  position: relative;
  padding: 1.875rem 0 1rem;
  font-size: 1.7007rem;
  text-align: center;
  user-select: none;
  &:after {
    content: "";
    background-color: rgba(255, 255, 255, 0.0911);
    position: absolute;
    width: 100%;
    left: 0;
    height: 2px;
    bottom: 0;
  }
}
</style>

<style lang="scss" scoped>
.helpful-hint-wrap {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 1;
  /* this height determines pill position on image */
  @include xs {
    height: 70%;
  }
  @include sm-only {
    height: 80%;
  }
  @include md {
    height: 90%;
    transform: scale(1.3);
  }
  .pill {
    font-family: var(--app-font-bold);
    background-color: var(--app-color-orange);
    padding: 0.55rem 0.87rem;
    border-radius: 1rem;
    box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.1777);
  }
}

.actions {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-bottom: 1.337rem;
}

$thumb-margin: 1rem;
.thumbs {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  max-width: 120.117rem;
  overflow-y: auto;
  @include xs {
    transform: scale(0.9);
    transform-origin: center center;
    max-height: 12rem;
  }
  @include sm {
    transform: scale(0.9);
    transform-origin: center center;
    max-height: 17rem;
  }
  .thumb {
    user-select: none;
    cursor: pointer;
    margin: $thumb-margin $thumb-margin/2 0;
    position: relative;
    overflow: hidden;
    opacity: 1;
    width: 6.27rem;
    &.active {
      transition: all 444ms ease-in-out;
      pointer-events: none;
      opacity: 0.337;
    }
    .image {
      max-width: 100%;
      object-fit: contain;
    }
    .video-overlay {
      width: calc(100% + #{$thumb-margin * 1.5});
      height: calc(100% + #{$thumb-margin * 1.5});
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.meta {
  font-size: 1.125rem;
  max-width: 27.777rem;
  user-select: none;
  text-align: center;
  margin-top: $thumb-margin;
  kbd {
    color: var(--app-color-orange);
    background-color: rgba(0, 0, 0, 1);
    font-weight: bold;
    font-size: 1.375rem;
  }
}
</style>
