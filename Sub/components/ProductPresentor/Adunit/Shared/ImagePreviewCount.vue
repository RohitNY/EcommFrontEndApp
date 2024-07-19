<template>
  <!-- animated pulse times-5 -->
  <div
    v-if="isSuperFeature && count > 0 || count > 1"
    :class="['image-preview-count', 'animated', 'pulse', 'infinite']"
    tabindex="0"
    role="button"
    aria-label="Show more images and videos"
  >
    +{{ count - 1 + isSuperFeature }} {{ 'Images' }}
  </div>
</template>

<script>
export default {
  name: 'EcomImagePreviewCount',
  props: {
    count: Number,
    ui: String,
    superfeature: Boolean
  },
  computed: {
    isSuperFeature () {
      return this.superfeature ? 1 : 0
    }
  }
}
</script>

<style lang="scss">
.image-preview-count {
  font-family: var(--adunit-font-2);
  color: var(--adunit-color-29);
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.6));
  user-select: none;
  outline: none;
  cursor: pointer;
  // font-size: 3.8rem;
  /* new "more images" text */
  font-size: 1.627rem;
  animation: none !important;
  background: rgba(0, 0, 0, 0.61);
  padding: 0.3rem 0.576rem;
  border-radius: 0.5rem;
}
</style>
