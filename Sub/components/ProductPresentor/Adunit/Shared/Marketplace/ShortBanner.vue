<template>
  <div :class="$style.shortBanner">
    <img :src="$mm.lg ? largeImage : smallImage" :alt="data.Alt">
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  computed: {
    largeImage () {
      if (this.data.Image?.Lg) {
        return this.data.Image?.Lg
      } else {
        return null
      }
    },
    smallImage () {
      if (this.data.Image?.Sm) {
        return this.data.Image?.Sm
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss" module>
.shortBanner {
  width: 100%;
  display: flex;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
