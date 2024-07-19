<template>
  <section :class="$style.info">
    <EcomHtml :class="$style.title" label="Title" tag="header" />
    <EcomHtml :class="$style.subHead" label="Subtitle" prop="SubHead" />
    <EcomHtml :class="$style.mainSavings" label="Main Savings" />
    <MarketplaceExpandableDescription :data="data" />
  </section>
</template>

<script>
import EcomHtml from '../Shared/Html.vue'
import MarketplaceExpandableDescription from '../Shared/Marketplace/ExpandableDescription.vue'

export default {
  name: 'MarketplaceAdunitContentBodyMerchandise',
  components: {
    MarketplaceExpandableDescription,
    EcomHtml
  },
  props: {
    data: Object
  }
}
</script>

<style lang="scss" module>
.info {
  font-family: var(--marketplace-font-normal);
  color: var(--adunit-color-11);
  width: calc(100% - 1rem);
  line-height: 1.5;
  padding: 1.1117rem 1.1117rem 0.1117rem;

  .mainSavings {
    font-family: var(--marketplace-font-bold);
    color: var(--adunit-color-12, #1c4a78);
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    text-align: center;
  }
  .title {
    font-family: var(--marketplace-font-bold);
    font-weight: bold;
    font-size: 3.2rem;
    text-align: center;
  }
  .subHead {
    font-family: var(--marketplace-font-bold);
    font-size: 1.6rem;
    text-align: center;
  }

  @include sm {
    text-align: center;
  }
  @include lg {
    padding: 0 2rem 0 1.5rem;
  }
}
</style>
