<template>
  <div ref="quantity" :class="$style.quantityToggle">
    <button
      v-ripple
      aria-label="Decrease Quantity"
      :class="[$style.button, $style.minus]"
      :disabled="val == 1"
      @click.prevent="decrement"
    />
    <span :class="$style.val">{{ val }}</span>
    <button
      v-ripple
      :class="[$style.button, $style.plus]"
      :disabled="val == maxQty"
      aria-label="Increase Quantity"
      @click.prevent="increment"
    />
  </div>
</template>

<script>
export default {
  name: 'EcomQuantityButtonGroup',
  props: {
    initialValue: {
      type: Number,
      default: 1
    },
    maxQty: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      val: 1
    }
  },
  beforeMount () {
    this.minVal = 1
    this.val = this.initialValue
  },
  methods: {
    increment () {
      if (this.val < this.maxQty) {
        this.val++
      }
    },
    decrement () {
      if (this.val > this.minVal) {
        this.val--
      }
    }
  }
}
</script>

<style lang="scss" module>
.quantityToggle {
  display: flex;
  justify-content: space-evenly;
  border-radius: 3rem;
  overflow: hidden;

  .button {
    font-family: var(--app-font-bold);
    text-align: center;
    cursor: pointer;
    border: none;
    background: none;
    flex: 0 0 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
      outline: none;
    }
    &:disabled {
      cursor: default;
      opacity: 0.33;
    }
    &:hover:not(:disabled) {
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      transform: rotate(360deg);
    }
    &.minus {
      &:before {
        content: "\2212";
        font-size: 2.4rem;
        font-weight: 900;
        margin-top: -3.5px;
      }
    }
    &.plus {
      &:before {
        content: "\002B";
        font-size: 2.9rem;
        font-weight: 300;
      }
    }
  }
  .val {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 3.5rem;
    text-align: center;
    background: none;
    border: none;
    user-select: none;
  }
}
</style>
