<template>
  <div class="adunit-pricing">
    <span v-if="partPay.Ui == '1'" class="part-pay">
      <b class="part-pay__installments">{{ partPay.Data[0] }} PAYMENTS EACH ONLY:</b>
      <EcomArtisticPrice :amount="String(partPay.Data[1])" />
    </span>
    <span v-if="partPay.Ui == '2'" class="part-pay">
      <b class="part-pay__installments">{{ partPay.Data[0] }} PAYMENTS AS LOW AS:</b>
      <EcomArtisticPrice :amount="String(partPay.Data[1])" />
    </span>
  </div>
</template>

<script>
import EcomArtisticPrice from '../Shared/ArtisticPrice.vue'

export default {
  components: {
    EcomArtisticPrice
  },
  props: {
    partPay: Object
  }
}
</script>

<style lang="scss">
.adunit-pricing {
  .part-pay {
    background-color: var(--theme-background-color-part-pay-pricing);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 1.377rem;
    &__installments {
      color: var(--theme-font-color-part-pay-price);
      font-family: var(--adunit-font-1);
      padding-bottom: 1rem;
      opacity: 0.555;
    }

    @include md {
      flex-flow: column nowrap;
      align-items: center;
      padding: 1rem 0 0;
      &__installments {
        padding-bottom: 0.125rem;
      }
    }
  }
}
</style>
