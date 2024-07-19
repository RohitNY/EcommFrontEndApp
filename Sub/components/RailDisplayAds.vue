<template>
  <transition name="transitions-fade">
    <div
      v-show="$parent.withinVisibleViewport && $parent.withinScrollZone"
      :class="$parent.$style.sideRails"
    >
      <EcomDisplayAd placement="rail-fixed" position="page-left" />
      <EcomDisplayAd placement="rail-fixed" position="page-right" />
    </div>
  </transition>
</template>

<script>
import EcomDisplayAd from './Advertisement.vue'

export default {
  components: {
    EcomDisplayAd
  }
}
</script>

<style>
</style>
