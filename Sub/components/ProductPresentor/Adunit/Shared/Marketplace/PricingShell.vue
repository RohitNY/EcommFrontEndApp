<template>
  <section
    v-if="pricing"
    :class="[$style.pricingShell, 'adunit-pricing-shell']"
  >
    <MarketplaceShortBanner
      v-if="bannerProps"
      :data="bannerProps"
      :class="$style.pricingImage"
    />
    <MarketplacePricingBox
      :data="data"
      :offer="{ Pricing: pricing.PrimaryOfferPricing }"
      :group="adunitGroup"
      :class="$style.pricingBox"
    />
    <MarketplacePartPay
      v-if="pricing.PartPay"
      :part-pay="pricing.PartPay"
      :class="$style.partpayBox"
    />
    <div :class="$style.actionWrapper">
      <div
        v-if="
          !data.IsMultiOffer &&
            firstOffer.IsQtyEditable &&
            !data.IsOutOfInventory
        "
        :class="$style.quantityToggleWrap"
      >
        <EcomQuantityToggle
          ref="qty"
          :class="$style.quantityToggle"
          :max-qty="3"
        />
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
      <button
        v-else
        v-ripple
        aria-label="Add to Cart"
        :class="$style.addToCart"
        @click="addToCart"
      >
        {{ data.IsMultiOffer ? 'SHOW OPTIONS' : 'ADD TO CART' }}
        <span v-if="!data.IsMultiOffer" :class="$style.plus">
          <img src="~/assets/images/icon-plus-circle.svg">
        </span>
      </button>
    </div>
  </section>
</template>

<script>
import EcomQuantityToggle from '../../Pricing/QuantityToggle.vue'
import MarketplacePricingBox from '../../Pricing/Marketplace/PricingBox.vue'
import MarketplacePartPay from '../../Pricing/Marketplace/PartPay.vue'
import MarketplaceShortBanner from './ShortBanner.vue'

export default {
  name: 'EcomAdunitPricing',
  components: {
    EcomQuantityToggle,
    MarketplacePricingBox,
    MarketplacePartPay,
    MarketplaceShortBanner
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
    },
    bannerProps () {
      return this.data.Decorate?.ShortBanner
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
  .actionWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .quantityToggleWrap {
    background-color: var(--theme-background-color-quantity-toggle-wrap);
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0.75rem 1.5rem;
    @include sm {
      background-color: var(--theme-color-body);
      padding: 1.25rem 1.5rem 0.25rem;
    }
    .quantityToggle {
      font-family: var(--marketplace-font-bold);
      background-color: var(--theme-background-color-quantity-toggle);
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
    position: relative;
    background-color: var(--theme-background-color-button);
    font-family: var(--marketplace-font-bold);
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
    white-space: nowrap;
    @include sm {
      background-color: var(--theme-background-color-button);
      width: 95%;
      border-radius: 8px;
      margin: 1rem 0 1rem 0;
    }
    &.outOfStock {
      cursor: default;
    }
    .plus {
      position: relative;
      font-size: 3.57rem;
      margin-left: 0.97rem;
      display: flex;
      align-items: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .outOfStockMsg {
      display: block;
      font-family: var(--marketplace-font-normal);
      margin-top: -3.111rem;
      font-size: 1rem;
      opacity: 0.922;
      font-size: 1.366rem;

      @media (min-width: 600px) and (max-width: 680px) {
        font-size: 1.226rem;
      }
    }
  }
  .pricingImage {
    @include sm {
      border-bottom: 2.5px solid white;
    }
  }
  .pricingBox {
    @include sm {
      border-bottom: 2.5px solid white;
    }
  }
  .partpayBox {
    @include sm {
      border-bottom: 2.5px solid white;
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
