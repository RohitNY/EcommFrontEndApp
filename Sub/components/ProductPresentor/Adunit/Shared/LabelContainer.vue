<template>
  <div :class="$style.labelContainer">
    <MarketplaceLabelOverlay
      v-for="(label, index) in data"
      :key="index"
      :data="label"
    />
  </div>
</template>

<script>
import MarketplaceLabelOverlay from './LabelOverlay.vue'

export default {
  components: {
    MarketplaceLabelOverlay
  },
  props: {
    data: Array
  }
}
</script>

<style lang="scss" module>
 .labelContainer {
   position: absolute;
   height: calc(100% - .3rem);
   width: 100%;
   top: 0;
 }
</style>
