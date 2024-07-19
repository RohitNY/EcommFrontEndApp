<template>
  <span class="ecom-button-wrap">
    <!-- v-bind="setAttrs" -->
    <button
      v-ui:animate.onenter="animate"
      v-ripple="$attrs['no-ripple']"
      :class="['ecom-button', getButtonCss]"
      v-bind="$attrs"
      @click.passive="$emit('click')"
    >
      <slot />
    </button>
  </span>
</template>

<script>
export default {
  name: 'EcomButton',
  inheritAttrs: false,
  props: {
    animate: String
  },
  computed: {
    getButtonCss () /* .ecomButtonStyle class */ {
      if (this.$hopX) {
        return this.$hopX.getParentComponent.call(
          this,
          '$style.ecomButtonStyle'
        )
      }
      return {}
    }
  }
}
</script>

<style lang="scss">
.ecom-button {
  cursor: pointer;
  border: none;
}
</style>
