<template>
  <section :class="$style.info">
    <EcomExpandableDescription :data="data" />
  </section>
</template>

<script>
import EcomExpandableDescription from './Shared/ExpandableDescription.vue'

export default {
  name: 'EcomAdunitContentBodyMerchandise',
  components: {
    EcomExpandableDescription
  },
  props: {
    data: Object
  }
}
</script>

<style lang="scss" module>
.info {
  font-family: var(--adunit-font-1);
  color: var(--adunit-color-11);
  width: calc(100% - 1rem);
  padding: 1.1117rem 1.1117rem 0.1117rem;

  @include lg {
    padding: 0 0.5rem 0 0.5rem;
  }
}
</style>
