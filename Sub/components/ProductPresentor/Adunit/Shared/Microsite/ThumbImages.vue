<template>
  <div class="micrositeAdunit__thumbs">
    <EcomLazyImage
      v-for="(image, idx) in images"
      :key="idx"
      :width="width"
      :height="height"
    >
      <img
        key="product-image"
        :src="$hopX.image(image.Url, { width: width, height: height })"
        :alt="image.Alt"
        class="micrositeAdunit__thumbs-image"
      >
    </EcomLazyImage>
  </div>
</template>

<script>
export default {
  props: {
    images: Array,
    width: String,
    height: String
  }
}
</script>

<style lang="scss">
.micrositeAdunit__thumbs {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5px 0;
  &-image {
    height: 150px;
    width: 150px;
    margin: 2.5px;

    @include lg() {
      width: 300px;
      height: 300px;
    }
  }
}
</style>
