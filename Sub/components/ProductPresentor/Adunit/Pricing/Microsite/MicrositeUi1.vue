<template>
  <div class="adunit-pricing microsite-pricing">
    <span :class="$style.pricingSubheader">First Shipment</span>
    <EcomPrice v-for="(label, idx) in labels" :key="idx">
      <b slot="header">{{ label }}</b>
      <b slot="price">{{ data[idx] }}</b>
    </EcomPrice>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    labels: Array
  },
  mounted () {
    console.log('here')
  }
}
</script>

<style lang="scss" module>
.pricingSubheader {
  margin: 3px;
  font-weight: 400;
  @include md() {
    font-size: 1.4rem;
  }
}
.header {
  font-size: 12px;
  font-weight: 700;
  @include md() {
    font-size: 2rem;
  }
}
.price {
  font-size: 26px;
  font-weight: 900;
}
</style>
<style lang="scss">
.microsite-pricing {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  > div {
    > div:first-child {
      font-size: 1.8rem;
    }
    > div {
      font-size: 5rem;
    }
  }
}
</style>
