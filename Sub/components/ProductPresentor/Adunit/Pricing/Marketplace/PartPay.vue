<template>
  <div class="adunit-pricing">
    <span v-if="partPay.Ui == '1'" :class="$style.partPay">
      <span :class="$style.installments">{{ partPay.Data[0] }} PAYMENTS EACH ONLY:</span>
      <EcomArtisticPrice :amount="String(partPay.Data[1])" />
    </span>
    <span v-if="partPay.Ui == '2'" :class="$style.partPay">
      <span :class="$style.installments">{{ partPay.Data[0] }} PAYMENTS AS LOW AS:</span>
      <EcomArtisticPrice :amount="String(partPay.Data[1])" />
    </span>
  </div>
</template>

<script>
import EcomArtisticPrice from '../../Shared/ArtisticPrice.vue'

export default {
  components: {
    EcomArtisticPrice
  },
  props: {
    partPay: Object
  }
}
</script>

<style lang="scss" module>
.partPay {
  background-color: var(--theme-background-color-part-pay-pricing);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.377rem;
  font-family: var(--marketplace-font-bold);
  .installments {
    color: var(--theme-font-color-part-pay-price);
    font-family: var(--marketplace-font-condensed);
    margin-right: 1.2rem;
}

  @include md {
    flex-flow: column nowrap;
    align-items: center;
    padding: 1rem 0 0;
    .installments {
      padding-bottom: 0.125rem;
    }
  }
}
</style>
