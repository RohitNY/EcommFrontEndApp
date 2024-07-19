<template>
  <section v-if="data">
    <!-- eslint-disable-next-line -->
    <p :class="[$style.purchaseDisclaimer, theme]" v-html="data.Html" />
  </section>
</template>

<script>
export default {
  name: 'MarketplacePurchaseDisclaimer',
  props: {
    data: Object
  },
  computed: {
    theme () {
      const base = 'purchase-disclaimer-theme'

      return this.data.Theme &&
        this.data.Theme !== undefined &&
        this.data.Theme !== null
        ? base + '--' + this.data.Theme
        : base + '--standard'
    }
  }
}
</script>

<style lang="scss" module>
.purchaseDisclaimer {
  background-color: transparent;
  position: relative;
  width: 33.2rem;
  color: var(--purchase-disclaimer-font-color);
  font-family: var(--mp-font-normal);
  font-size: 1.6rem;
  border-top: 1px solid var(--purchase-disclaimer-border-color);
  line-height: 1.5;
  padding: 1.5rem 0;
  @include xs {
    width: 29.2rem;
    margin-top: -1rem;
  }
  @include md-only {
    width: 52rem;
    margin-top: -17rem;
  }
  @media (min-width: 780px) and (max-width: 959px) {
    width: 65rem;
    margin-top: -6rem;
  }
  @media (min-width: 960px) and (max-width: 1079px) {
    width: 70rem;
    margin-top: 3rem;
  }
  @include lg {
    width: 96.3rem;
    margin-top: 6rem;
  }
  span {
    font-family: var(--mp-font-bold);
  }
  a {
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--purchase-disclaimer-font-color);
  }
}
</style>
