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
    <div v-if="$mm.sm" :class="$style.mobileTitle">
      {{ title }}
    </div>
    <EcomPricingBox
      :data="data"
      :offer="{ Pricing: pricing.PrimaryOfferPricing }"
    />

    <div v-if="!$mm.sm" :class="$style.desktabText">
      <h2>{{ title }}</h2>
      <h3>{{ mainSavings }}</h3>

      <h4>{{ subSavings }}</h4>
      <div v-if="incentiveDescription" :class="$style.incentive">
        Plus as a special incentive for ordering now, we’ll give you
        <span v-html="incentiveDescription" /> on your first shipment!
      </div>
      <img
        src="~/assets/images/autoship.png"
        :class="$style.autoshipIcon"
        alt="autoship icon"
        width="220"
        height="58"
      >
      <div :class="$style.disclaimer">
        {{ disclaimer }}
      </div>
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
      ADD TO CART
      <span :class="$style.plus">+</span>
    </button>
  </section>
</template>

<script>
import EcomPricingBox from '../../Pricing/PricingBox.vue'
import MarketplaceShortBanner from '../../Shared/Marketplace/ShortBanner.vue'

export default {
  name: 'EcomAdunitPricing',
  components: {
    EcomPricingBox,
    MarketplaceShortBanner
  },
  props: {
    data: Object
  },
  computed: {
    pricing () {
      return this.data.PricingBox
    },
    title () {
      return this.data.Title
    },
    subheader () {
      return this.data.Subheader
    },
    mainSavings () {
      return this.data.MainSavings
    },
    subSavings () {
      return this.data.SubSavings
    },
    shippingAndHandling () {
      return this.data.ShippingAndHandling
    },
    incentiveDescription () {
      return this.data.Incentive.Description
    },
    disclaimer () {
      return this.data.Disclaimer
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
      this.$store.dispatch('cart/add', {
        _title: this.firstOffer.Title,
        OfferCodeSet: this.data.Id,
        OfferCode: this.firstOffer.OfferCode,
        Qty: this.$refs.qty?.val || 1,
        Incentive: this.data.Incentive
      })
    }
  }
}
</script>

<style lang="scss" module>
.pricingShell {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: var(--theme-background-color-tiered-pricing);
  color: var(--theme-font-color-tiered-pricing);
  border-radius: 10px;
  border: 1px solid var(--theme-background-color-tiered-pricing);
  @include md {
    width: 287px;
  }

  @include lg {
    width: 327px;
  }

  .autoshipIcon {
    margin: 10px 0;
  }
  .pricingImage {
    flex-basis: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    border-bottom: 1px solid white;
  }
  .mobileTitle {
    flex-basis: 100%;
    font-size: 1.4rem;
    line-height: 1.6rem;
    font-weight: 700;
    padding: 6px 14px;
    border-bottom: 1px solid white;
  }
  text-align: center;
  .addToCart {
    background-color: var(--theme-background-color-button);
    font-family: 'Roboto';
    color: var(--theme-font-color-button);
    font-size: 1.7rem;
    font-weight: 900;
    cursor: pointer;
    padding: 10px 50px;
    margin: 14px 7px;
    line-height: 1.9rem;
    outline: none;
    border: none;
    height: 40px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    @include md {
      height: 42px;
      padding: 31px 50px;
      margin: 0;
    }
    &.outOfStock {
      cursor: default;
    }
    .plus {
      font-size: 1.5rem;
      font-weight: 600;
      margin-left: 0.777rem;
      border-radius: 100%;
      border: 2px solid white;
      line-height: 1;
      padding: 0 2.5px;
    }
    .outOfStockMsg {
      display: block;
      font-family: var(--adunit-font-1);
      margin-top: -3.111rem;
      font-size: 1rem;
      opacity: 0.922;
      font-size: 1.366rem;
    }
  }
  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 6px;
  }
  h4 {
    margin-top: 6px;
    font-size: 1.2rem;
    font-weight: normal;
  }
  .incentive {
    border: 1px solid #fff;
    border-radius: 22px;
    padding: 5px 15px;
    margin-top: 11px;
    width: 80%;
    font-size: 1.4rem;
    margin: 10px auto;
    @include lg() {
      font-size: 1.6rem;
    }
  }

  .incentive span {
    font-weight: bold;
  }
  .disclaimer {
    padding: 0px 10px;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
}
</style>

<style lang="scss"></style>
