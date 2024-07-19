<template>
  <span class="adunit-artistic g-fw-900">
    <span class="adunit-artistic-smallcap">$</span>
    <span class="adunit-artistic-dollars">{{ price.dollars }}</span>
    <span
      class="adunit-artistic-smallcap adunit-artistic-smallcap--cents"
    >{{ price.cents }}{{ showAsterisk ? '*' : '' }}</span>
  </span>
</template>

<script>
export default {
  props: {
    amount: String
  },
  data () {
    return {
      showAsterisk: false
    }
  },
  computed: {
    price () {
      const amt = this.amount.replace('*', '')
      const priceStr = parseFloat(
        new Intl.NumberFormat('en-US').format(amt / 100)
      ).toFixed(2)
      const [dollars, cents] = priceStr.split('.')
      return {
        dollars,
        cents
      }
    }
  },
  beforeMount () {
    this.showAsterisk = this.amount.includes('*')
  }
}
</script>

<style lang="scss">
.adunit-artistic {
  color: var(--adunit-color-18);
  display: flex;
  font-size: 4.8rem;
  .adunit-artistic-smallcap {
    font-size: 3.15rem;
    &--cents {
      margin-left: -0.005rem;
      letter-spacing: 0.005rem;
      margin-top: 0.6rem;
      font-size: 2.6rem;
    }
  }
}
</style>
