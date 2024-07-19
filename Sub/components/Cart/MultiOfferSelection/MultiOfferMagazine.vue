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
      <span v-if="offer.InventoryLevel === 0" :class="[$style.text, $style.outOfStock]">
        <img src="~/assets/images/icon-alert.svg" :class="$style.alertIcon">
        Sorry, this item is out of stock. Please consider another item
      </span>
      <transition name="transitions-fade" mode="out-in">
        <span :key="String(offerAlreadyInCart)" :class="$style.ctaInnerWrap">
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
            v-if="offerAlreadyInCart"
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
import { getItemFromCart } from '~/store/cart.js'

export default {
  name: 'EcomMultiOfferMagazine',
  parentData: {
    header: 'Choose Subscription Length'
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
