<template>
  <div
    :class="$parent.$style.cart"
    @click="$store.dispatch('modal/open', 'EcomModalMiniCart')"
  >
    <div ref="cart">
      <div :class="$style.cartIcon" />

      <span
        v-if="getCartCount > 0"
        ref="cartCount"
        :key="getCartCount"
        :class="$style.count"
      >{{ getCartCount }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addAnimationClass } from '~/plugins/ui.js'

export default {
  name: 'EcomCart',
  computed: {
    ...mapGetters('cart', ['getCartCount', 'getCart'])
  },
  beforeDestroy () {
    this.pubsub()
  },
  created () {
    this.pubsub = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'cart/ADD') {
        addAnimationClass(this.$refs.cart, 'fast wobble', { immediate: true })
        addAnimationClass(this.$refs.cartCount, 'fast bounce', {
          immediate: true
        })
      }
    })
  }
}
</script>

<style lang="scss" module>
.count {
  font-family: var(--app-font-bold);
  background-color: var(--shopping-header-cart-bubble-bg);
  box-shadow: 0 2px 1px 1px rgba(0, 0, 0, 0.75);
  color: var(--shopping-header-cart-bubble-text);
  border-radius: 50%;
  font-size: 1.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2rem;
  padding: 0 0.375rem;
  height: 2rem;
  position: absolute;
  top: -1rem;
  right: -1rem;
}

.cartIcon {
  background: var(--shopping-header-cart-image);
  width: var(--shopping-header-cart-width);
  height: var(--shopping-header-cart-height);
  margin-top: -9px;
  margin-left: -22px;
}

.cartList {
  position: fixed;
  background-color: hotpink;
  top: -42px;
  left: -402px;
  padding: 3rem;
}
</style>
