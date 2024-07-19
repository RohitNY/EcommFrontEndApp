<template>
  <div :class="[$style.labelOverlay, $style[data.Position], $style[data.Type]]">
    {{ data.Text }}
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style lang="scss" module>
.labelOverlay {
  position: absolute;
  letter-spacing: .01rem;
  padding: .3rem 1rem;
  font-weight: 600;
  font-family: Arial;
  /* Add Label Types here */
  &.DealCategory {
    background-color: var(--theme-background-color-deal-label);
    color: var(--theme-font-color-deal-label);
    font-size: 1.9rem;
  }
  &.SecondaryProduct {
    background-color: var(--theme-background-color-secondary-label);
    color: var(--theme-font-color-secondary-label);
    font-size: 1.7rem;
    max-width: 21.5rem;
    overflow-wrap: break-word;
  }
}
.TopRight {
  top: 0;
  right: 0;
  border-top-right-radius: .33rem;
}
.TopLeft{
  top: 0;
  left: 0;
  border-top-left-radius: .33rem;
}
.BottomRight {
  bottom: 0;
  right: 0;
  border-bottom-right-radius: .33rem;
}
.BottomLeft {
  top: 0;
  left: 0;
  border-bottom-left-radius: .33rem;
}
</style>
