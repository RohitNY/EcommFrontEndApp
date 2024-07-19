<template>
  <transition name="transitions-fade-fast" mode="out-in">
    <div
      v-if="delayLoading"
      key="loading"
      v-ui:intersect="{ cb: loadImage }"
      class="lazy-img"
      :style="{
        width: `${width}px`,
        height: `${height}px`
      }"
    >
      <EcomSpinner fg-color="#afafaf" kind="bars" />
    </div>
    <slot v-else />
  </transition>
</template>

<script>
export default {
  name: 'EcomLazyImage',
  props: {
    width: Number,
    height: Number
  },
  data () {
    return {
      delayLoading: true
    }
  },
  methods: {
    loadImage () {
      this.delayLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.lazy-img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1337);
  background-color: rgba(255, 255, 255, 0.1337);
  max-width: 100% !important;
}
</style>
