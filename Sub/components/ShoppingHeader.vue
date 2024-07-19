<template>
  <div :class="[$style.shoppingHeader, theme]">
    <button v-ripple :class="$style.backBtn" @click="backButton">
      <span class="arrow" :class="$style.arrow" />
      <!-- <EcomArrow :class="$style.arrow" size="md" /> -->

      <span
        class="shopping-header-back-button-text"
        :class="$style.backBtnText"
      >BACK</span>
    </button>
    <div :class="$style.logo" />
    <EcomCart
      :class="$style.cart"
      @click.native="$hopX.AnalyticEvent('onCartOpenOnHeaderClick')"
    />
  </div>
</template>

<script>
import EcomCart from '~/components/Cart.vue'

export default {
  name: 'EcomShoppingHeader',
  components: {
    EcomCart
  },
  computed: {
    theme () {
      const base = 'shopping-header-theme'

      return window.Spectrum.Bootstrap.ShoppingHeader &&
        window.Spectrum.Bootstrap.ShoppingHeader.Theme !== undefined &&
        window.Spectrum.Bootstrap.ShoppingHeader.Theme !== null
        ? base + '--' + window.Spectrum.Bootstrap.ShoppingHeader.Theme
        : base + '--standard'
    }
  },
  methods: {
    backButton () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" module>
.shoppingHeader {
  background-color: var(--theme-shopping-header-bg);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.231);
  height: 67px;
  width: 100%;

  .arrow {
    height: 100px;
    top: 1rem;
    left: -0.875rem;
    background: var(--shopping-header-back-arrow);
    display: block;

    width: var(--shopping-header-back-arrow-width);

    height: var(--shopping-header-back-arrow-height);

    @include md {
      padding-right: 0.5rem;
      left: 0.125rem;
      top: 0.25rem;
    }
  }
  .backBtn {
    cursor: pointer;
    font-family: var(--app-font-normal);
    font-size: 1.25rem;
    line-height: 2.2rem;
    float: left;
    transform: translate(2rem, 21px);
    background: none;
    color: #ffffff;
    border: none;
    @include md {
      transition: all 0.3s ease-in-out;
      border: 2px solid #ffffff;
      border-radius: 1rem;
      padding: 0.1rem 1.25rem;
      display: flex;
    }
    .backBtnText {
      display: none;
      @include md {
        transition: all 0.3s ease-in-out;
        padding-left: 1rem;
        display: block;
      }
    }
  }
  .logo {
    position: absolute;
    transform: translate(-50%, 22px);
    left: 50%;
    background: var(--logo-bg-image);
    width: var(--logo-width);
    height: var(--logo-height);
    margin-top: -8px;
  }
  .cart {
    float: right;
    transform: translate(-2rem, 17px);
    width: 2.66rem;
    position: relative;
    cursor: pointer;
  }
}
</style>
