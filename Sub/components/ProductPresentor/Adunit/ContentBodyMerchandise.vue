<template>
  <section :class="$style.info">
    <EcomHtml :class="$style.mainSavings" label="Main Savings" />
    <EcomHtml :class="$style.title" label="Title" tag="header" />
    <EcomHtml :class="$style.subHead" label="Subtitle" prop="SubHead" />
    <EcomExpandableDescription :data="data" />
  </section>
</template>

<script>
import EcomExpandableDescription from './Shared/ExpandableDescription.vue'
import EcomHtml from './Shared/Html.vue'

export default {
  name: 'EcomAdunitContentBodyMerchandise',
  components: {
    EcomExpandableDescription,
    EcomHtml
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

  .title {
    font-family: var(--adunit-font-2);
    font-weight: bold;
    font-size: 2.4rem;
  }
  .mainSavings {
    font-family: var(--adunit-font-3);
    color: var(--adunit-color-12, #1c4a78);
    font-size: 3.2rem;
  }
  .subHead {
    font-size: 25px;
  }

  @include lg {
    padding: 0 0.5rem 0 0.5rem;
  }
}
</style>
