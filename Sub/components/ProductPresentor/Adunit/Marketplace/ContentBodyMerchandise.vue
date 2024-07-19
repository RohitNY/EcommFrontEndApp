<template>
  <section :class="$style.info">
    <EcomHtml :class="$style.title" label="Title" tag="div" />
    <div :class="$style.savings">
      <EcomHtml :class="$style.mainSavings" label="Main Savings" tag="span" />
      <EcomHtml :class="$style.subSavings" label="Sub Savings" tag="span" />
    </div>
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
  padding: 1.1117rem 1.1117rem 0.1117rem;
  .title {
    font-family: var(--marketplace-font-bold);
    font-weight: bold;
    font-size: 3rem;
    text-align: center;
  }
  .savings {
    color: var(--theme-font-color-content-main-savings);
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 300;
    text-align: center;
  }

  @include lg {
    padding: 1rem 2rem;
  }
}
</style>
