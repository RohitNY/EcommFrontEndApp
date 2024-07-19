<template>
  <span class="ecom-g-arrow">
    <span
      :class="[$style.arrow, $style[direction], $style[size], $style[position]]"
    />
  </span>
</template>

<script>
export default {
  name: 'EcomArrow',
  props: {
    direction: {
      type: String,
      default: 'left'
    },
    size: {
      type: String,
      default: 'sm'
    },
    position: {
      type: String,
      default: 'inline'
    }
  }
}
</script>

<style lang="scss" module>
.arrow {
  border: solid #ffffff;

  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  /* sizes */
  &.sm {
    border-width: 0 3px 3px 0;
    padding: 3px;
  }
  &.md {
    border-width: 0 3px 3px 0;
    padding: 6px;
  }
  &.lg {
    border-width: 0 3px 3px 0;
    padding: 9px;
  }

  /* directions */
  &.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  &.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }
  &.up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }
  &.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  &.inline {
    display: inline-block;
  }
  &.borderRight {
    float: right;
    margin-top: 0.7rem;
  }
}
</style>
