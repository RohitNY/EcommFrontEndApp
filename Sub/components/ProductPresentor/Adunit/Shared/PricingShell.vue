<template>
  <section v-if="pricing" :class="[$style.pricingShell, 'adunit-pricing-shell']">
    <div :class="$style.pricingImage">
      <!-- pricing box image goes here... -->
    </div>
    <EcomPricingBox :data="data" :offer="{Pricing: pricing.PrimaryOfferPricing}" :group="adunitGroup" />
    <EcomPartPay v-if="pricing.PartPay" :part-pay="pricing.PartPay" />
    <div>
      <div
        v-if="!data.IsMultiOffer && firstOffer.IsQtyEditable && !data.IsOutOfInventory"
        :class="$style.quantityToggleWrap"
      >
        <EcomQuantityToggle ref="qty" :class="$style.quantityToggle" :max-qty="3" />
      </div>
      <button
        v-if="data.IsOutOfInventory"
        v-ripple
        aria-label="Out of Stock"
        :class="[$style.addToCart, $style.outOfStock]"
        disabled
      >
        <span>
          OUT OF STOCK
          <span :class="$style.outOfStockMsg">please choose another item</span>
        </span>
      </button>
      <button v-else v-ripple aria-label="Add to Cart" :class="$style.addToCart" @click="addToCart">
        {{ data.IsMultiOffer ? 'SHOW OPTIONS' : 'ADD TO CART' }}
        <span
          v-if="!data.IsMultiOffer"
          :class="$style.plus"
        >+</span>
      </button>
    </div>
  </section>
</template>

<script>
import EcomQuantityToggle from '../Pricing/QuantityToggle.vue'
import EcomPricingBox from '../Pricing/PricingBox.vue'
import EcomPartPay from '../Pricing/PartPay.vue'

export default {
  name: 'EcomAdunitPricing',
  components: {
    EcomQuantityToggle,
    EcomPricingBox,
    EcomPartPay
  },
  props: {
    data: Object
  },
  computed: {
    pricing () {
      return this.data.PricingBox
    },
    firstOffer () {
      return this.data.Offers[0]
    },
    adunitGroup () {
      return this.$hopX.getParentComponent.call(this, 'offerType').type
    }
  },
  methods: {
    addToCart () {
      if (this.data.IsMultiOffer) {
        this.$store.dispatch('multiOffer/setOffer', {
          offer: this.data,
          offerType: this.adunitGroup
        })
        this.$store.dispatch('modal/open', 'EcomModalMultiOffer')
      } else {
        this.$store.dispatch('cart/add', {
          _title: this.firstOffer.Title,
          OfferCodeSet: this.data.Id,
          OfferCode: this.firstOffer.OfferCode,
          Qty: this.$refs.qty?.val || 1
        })
      }
    }
  }
}
</script>

<style lang="scss" module>
.pricingShell {
  width: 100%;
  @include md {
    max-width: 25.5rem;
  }
  text-align: center;
  .quantityToggleWrap {
    background-color: var(--adunit-color-1);
    display: flex;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    .quantityToggle {
      font-family: var(--adunit-font-2);
      background-color: var(--adunit-color-22);
      height: 4.5rem;
      width: 16rem;
      @include ms-edge {
        display: flex;
        justify-content: space-around;
      }
      button,
      span {
        color: var(--adunit-color-21);
        font-size: 2.4rem;
      }
    }
  }
  .addToCart {
    background-color: var(--adunit-color-19);
    font-family: var(--adunit-font-2);
    color: var(--adunit-color-20);
    border-bottom-left-radius: var(--adunit-css-3);
    border-bottom-right-radius: var(--adunit-css-3);
    font-size: 1.9007rem;
    cursor: pointer;
    line-height: 50px;
    outline: none;
    border: none;
    height: 8rem;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    &.outOfStock {
      cursor: default;
    }
    .plus {
      position: relative;
      font-size: 3.57rem;
      margin-left: 0.777rem;
      top: -0.2rem;
    }
    .outOfStockMsg {
      display: block;
      font-family: var(--adunit-font-1);
      margin-top: -3.111rem;
      font-size: 1rem;
      opacity: 0.922;
      font-size: 1.366rem;

      @media (min-width: 600px) and (max-width: 680px) {
        font-size: 1.226rem;
      }
    }
  }
}
</style>

<style lang="scss">
@include md {
  .adunit-pricing-shell {
    border-radius: calc(var(--adunit-css-3) + 0.4rem);
    border: var(--adunit-css-5);
    overflow: hidden;
    width: 22rem;
  }
}
</style>
