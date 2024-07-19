<template>
  <span>
    <slot />
  </span>
</template>

<script>
export default {
  name: 'EcomImage',
  props: {
    src: String,
    alt: String,
    width: Number,
    height: Number
  }
}
</script>

<style lang="scss" scoped>
</style>
