<template>
  <div v-ui:animate.onenter="'fadeInDown faster delay-300ms'" :class="$style.modal">
    <span :class="$style.modalTitle">
      <img
        src="~/assets/images/icon-close.svg"
        class="s-modal-close-x fixed-right"
        @click.self="$store.dispatch('modal/close')"
      >
      {{ header }}
    </span>
    <header :class="$style.header">
      <div v-if="mainProductImage" :class="$style.thumbnail">
        <img
          :src="$hopX.image(mainProductImage, {width: 150, height: 150})"
          :class="$style.thumbnailImg"
        >
      </div>
      <div :class="$style.col">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span :class="$style.mainTitle" v-html="getMultiOfferState.offer.Title" />
      </div>
    </header>
    <!-- <div v-if="!true" :class="$style.cartIsFull">
      Sorry, your cart is full. You cannot add additional items to your cart.
      Please View your cart to manage or Checkout now.
    </div> -->
    <ul :class="$style.list">
      <li v-for="(offer, idx) in sortedOffers" :key="offer.OfferCode">
        <component
          :is="getComponent"
          :class="$style.item"
          :offer="offer"
          :idx="idx"
          @addToCart="args => handleAddToCart(...args)"
        />
      </li>
    </ul>
    <div :class="$style.cta">
      <EcomButton
        :class="[$style.btn, $style.dark]"
        @click="$store.dispatch('modal/close')"
      >
        Continue Shopping
      </EcomButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import capitalize from 'lodash/capitalize'
/* MultiOfferSelection Components By OfferType */
import EcomMultiOfferMagazine from '~/components/Cart/MultiOfferSelection/MultiOfferMagazine.vue'
import EcomMultiOfferMerchandise from '~/components/Cart/MultiOfferSelection/MultiOfferMerchandise.vue'

export default {
  name: 'EcomModalMultiOffer',
  components: {
    EcomMultiOfferMerchandise,
    EcomMultiOfferMagazine
  },
  data () {
    return {
      header: 'Choose Offer:'
    }
  },
  computed: {
    ...mapGetters('multiOffer', ['getMultiOfferState']),
    getComponent () {
      const type = capitalize(this.getMultiOfferState.offerType)
      return 'EcomMultiOffer' + type
    },
    sortedOffers () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return [...this.getMultiOfferState.offer.Offers].sort(
        (a, b) => b.InventoryLevel - a.InventoryLevel
      )
    },
    mainProductImage () {
      return this.getMultiOfferState?.offer?.Images[0]?.Url
    }
  },
  mounted () {
    const vm = this.$children.find(c => c.name === this.getComponent.name)
    const _header = vm?.$options?.parentData?.header
    this.header = _header || this.header
  },
  methods: {
    handleViewInCart () {
      this.$store.dispatch('modal/open', 'EcomModalMiniCart')
      this.$hopX.AnalyticEvent('onCartOpenOnOptionModalClick', {
        type: this.getMultiOfferState.offerType
      })
    },
    handleAddToCart (offerCode, quantity) {
      this.$store.dispatch('cart/add', {
        _isMultiOffer: true,
        _title: this.getMultiOfferState.offer.Title,
        OfferCodeSet: this.getMultiOfferState.offer.Id,
        OfferCode: offerCode,
        Qty: quantity || 1
      })
    }
  }
}
</script>

<style lang="scss" module>
.modal {
  background-color: rgb(26, 26, 26);
  border-radius: 1.7rem;
  color: #ffffff;
  width: calc(100% - 1.5rem);
  max-width: 55.5rem;
  max-height: 85vh;
  min-height: 32rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: relative;

  @include md {
    max-width: 72rem;
  }
}

.modalTitle {
  color: var(--app-color-orange);
  position: relative;
  // padding: 2rem 1.5rem 1rem 0;
  // text-align: right;
  // font-size: 2.4rem;
  padding: 1.875rem 0 1rem;
  // font-size: 1.337rem;
  font-size: 1.7007rem;
  text-align: center;
  &:after {
    content: "";
    background-color: rgba(255, 255, 255, 0.0911);
    position: absolute;
    width: 100%;
    left: 0;
    height: 2px;
    bottom: 0;
  }
}

.header {
  display: flex;
  margin: 1rem 1.111rem 0;
  position: relative;
  .thumbnail {
    width: 4.88rem;
    margin-bottom: 0.5rem;
    .thumbnailImg {
      border-radius: 0.75rem;
      width: 5rem;
    }
  }
  .col {
    display: flex;
    flex-flow: column nowrap;
  }
  .mainTitle {
    color: var(--app-color-white);
    padding: 0 0.75rem 0 1.2rem;
    font-size: 1.7rem;
    @include md {
      font-size: 2.8rem;
    }
  }
  &:after {
    content: "";
    background-color: rgba(255, 255, 255, 0.0911);
    width: calc(100% + 2rem);
    left: -1rem;
    position: absolute;
    height: 2px;
    bottom: -4px;
  }
}

// .cartIsFull {
//   text-align: center;
//   padding: 3rem 0 1.5rem;
//   font-size: 1.7rem;
//   max-width: 80%;
//   margin: 0 auto;
// }

.list {
  position: relative;
  list-style: none;
  max-height: 80vh;
  min-height: 17.117rem;
  overflow-y: auto;
  padding: 0 0 1.117rem;
  li:first-child {
    .item {
      margin-top: 2.111rem;
    }
  }
  li:last-child {
    .item {
      padding-bottom: 2rem;
      &:after {
        display: none;
      }
    }
  }
  .item {
    display: flex;
    flex-flow: column nowrap;
    margin-top: 2rem;
    position: relative;
    padding: 0;
    margin: 4.111rem 1.111rem -0.411rem;
    &:after {
      content: "";
      background-color: rgba(255, 255, 255, 0.0911);
      width: calc(100% + 2rem);
      left: -1rem;
      position: absolute;
      height: 2px;
      bottom: -1.366rem;
    }
    @include md {
      flex-flow: row nowrap;
      &:first-child > div:first-of-type {
        flex: 1 0 0;
      }
    }
  }
}

.cta {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1.222rem;
  flex-flow: column nowrap;
  .btn {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding: 1rem 1rem 0;
    .ecomButtonStyle {
      background-color: var(--app-color-orange);
      font-family: var(--app-font-bold);
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
      text-transform: uppercase;
      border-radius: 0.766rem;
      color: #ffffff;
      font-size: 1.7rem;
      padding: 1rem;
      width: 100%;
    }
    &.dark {
      .ecomButtonStyle {
        background-color: #1b1b1b;
        box-shadow: none;
        &:before {
          content: url("~assets/images/icon-arrow-back.svg");
          width: 3rem;
          position: relative;
          left: -1rem;
          top: 5px;
          @include ms-edge {
            display: none;
          }
        }
      }
    }
  }
}
</style>
