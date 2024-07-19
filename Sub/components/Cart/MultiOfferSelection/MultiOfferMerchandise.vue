<template>
  <div :class="$style.contentWrap">
    <div :class="$style.content">
      <!-- eslint-disable vue/no-v-html  -->
      <div :class="$style.offerTitle" v-html="offer.Title" />
      <!-- <div v-if="offer.InventoryLevel === 1" :class="$style.lowStock">
        Low Stock, Order Soon!
      </div>-->
      <div
        v-for="prices in offer.DisplayPrices"
        :key="prices"
        :class="$style.pricing"
        v-html="prices"
      />
    </div>
    <div :class="$style.cta">
      <span v-if="!offer.IsQtyEditable" :class="$style.limitOne">
        <b v-if="offer.InventoryLevel !== 0">Limit 1 per customer</b>
      </span>
      <span v-if="offer.InventoryLevel === 0" :class="[$style.text, $style.outOfStock]">
        <img src="~/assets/images/icon-alert.svg" :class="$style.alertIcon">
        Sorry, this item is out of stock. Please consider another item
      </span>
      <transition name="transitions-fade" mode="out-in">
        <span :key="String(offerAlreadyInCart)" :class="$style.ctaInnerWrap">
          <EcomQuantityToggle
            v-if="offer.InventoryLevel > 0 && offer.IsQtyEditable && !offerAlreadyInCart"
            ref="qty"
            :class="$style.quantityToggle"
            :max-qty="3"
          />
          <span v-else ref="qty" />
          <button
            v-if="cartAddable && !offerAlreadyInCart"
            ref="multioffer-atc"
            v-ripple
            :class="[$style.addToCart, addToCartInProgress && $style.loading]"
            aria-label="Add to Cart"
            :disabled="addToCartInProgress"
            @click="addToCart"
          >
            <EcomSpinner
              v-if="addToCartInProgress"
              kind="inline-circle"
              target-node="multioffer-atc"
              :class="$style.spinner"
            />
            <span v-else>ADD TO CART</span>
          </button>
          <button
            v-if="offer.InventoryLevel !== 0 && offerAlreadyInCart"
            v-ripple
            :class="[$style.addToCart, $style.viewCart]"
            aria-label="View in cart"
            @click="$parent.handleViewInCart"
          >VIEW IN CART</button>
        </span>
      </transition>
    </div>
  </div>
</template>

<script>
import EcomQuantityToggle from '~/components/ProductPresentor/Adunit/Pricing/QuantityToggle.vue'
import { getItemFromCart } from '~/store/cart.js'

export default {
  name: 'EcomMultiOfferMerchandise',
  parentData: {
    header: 'Choose Option'
  },
  components: {
    EcomQuantityToggle
  },
  props: {
    offer: Object,
    idx: Number
  },
  data () {
    return {
      addToCartInProgress: false
    }
  },
  computed: {
    cartAddable () {
      return this.offer.InventoryLevel > 0
    },
    offerAlreadyInCart () {
      const cartItem = getItemFromCart(
        { OfferCode: this.offer.OfferCode },
        this.$store.state.cart.items
      )
      return cartItem
    }
  },
  methods: {
    async addToCart () {
      this.addToCartInProgress = true
      await this.$hopX.sleep(300)
      const quantity = this.$refs.qty?.val || 1
      this.$emit('addToCart', [this.offer.OfferCode, quantity])
      await this.$hopX.sleep(5000)
      this.addToCartInProgress = false
    }
  }
}
</script>

<style lang="scss" module>
.contentWrap {
  // width: 100%;
  position: relative;
}

.content {
  padding: 0 2rem 2rem;
}

.offerTitle {
  font-family: var(--app-font-bold);
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
}
.pricing {
  font-family: var(--app-font-normal);
  font-size: 1.6rem;
}

.cta {
  display: flex;
  align-items: center;
  padding: 0 1.85rem 1rem;
  max-width: 40rem;
  @include ms-edge {
    overflow: hidden;
  }

  .ctaInnerWrap {
    display: flex;
    @include xs {
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      width: 100%;
      .quantityToggle {
        margin-right: 0;
        margin-bottom: 1.5rem;
      }
    }
    flex-flow: row nowrap;
  }

  .limitOne {
    font-size: 1.0375rem;
    margin-right: 1.5rem;
    opacity: 0.9;
    padding: 4px 8px;
    display: inline-block;
  }
  .quantityToggle {
    font-family: var(--app-font-bold);
    background-color: #333333;
    margin-right: 1.5rem;
    height: 4.5rem;
    width: 14rem;
    justify-content: center;
    button,
    span {
      color: var(--app-color-white);
      font-size: 2.4rem;
    }
  }
  .addToCart {
    background-color: var(--app-color-orange);
    font-family: var(--app-font-bold);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
    letter-spacing: -0.05rem;
    border-radius: 1.222rem;
    color: #ffffff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 1.2rem 1.72rem;
    outline: none;
    border: none;
    width: 13.4rem;
    height: 4.4rem;
    position: relative;
    @include ms-edge {
      width: auto;
      min-width: 13.4rem;
    }

    &.viewCart {
      background-color: rgb(150, 11, 150);
    }
    &.loading {
      position: relative;
    }
  }
  .text {
    font-family: var(--app-font-normal);
    font-size: 1.4rem;
    max-width: 22rem;
    opacity: 0.9;

    &.outOfStock {
      float: right;
      max-width: 25rem;
      flex: 1 0 auto;
      .alertIcon {
        float: left;
        padding-right: 1rem;
      }
    }
  }
}

.lowStock {
  font-family: var(--app-font-normal);
  position: relative;
  font-size: 1.1rem;
  background-color: rgb(211, 211, 211);
  color: rgba(0, 0, 0, 0.9);
  padding: 0.25rem 0.5rem;
  display: inline-block;
  margin-bottom: 0.777rem;
}

.spinner {
  position: absolute !important;
  width: 40px !important;
  height: 40px !important;
  left: 47px;
  top: 0;
}
</style>
