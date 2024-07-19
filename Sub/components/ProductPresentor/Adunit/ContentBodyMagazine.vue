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
  name: 'EcomAdunitContentBodyMagazine',
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

  .mainSavings {
    font-family: var(--adunit-font-3);
    color: var(--adunit-color-12, #1c4a78);
    font-size: 3rem;
    padding-top: 1.5rem;
  }
  .title {
    font-family: var(--adunit-font-2);
    font-weight: bold;
    font-size: 3.2rem;
  }
  .subHead {
    font-family: var(--adunit-font-2);
    font-size: 1.8rem;
  }

  @include sm {
    text-align: center;
  }
  @include lg {
    padding: 0 2rem 0 1.5rem;
  }
}
</style>
