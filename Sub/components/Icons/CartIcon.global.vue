<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="26.667"
    viewBox="0 0 30 26.667"
  >
    <g transform="translate(-667.1 -37)">
      <path
        :class="$style.cartIcon"
        d="M27.506,15.694,29.968,4.86a1.25,1.25,0,0,0-1.219-1.527H8.292L7.815,1A1.25,1.25,0,0,0,6.59,0H1.25A1.25,1.25,0,0,0,0,1.25v.833a1.25,1.25,0,0,0,1.25,1.25H4.89L8.548,21.221a2.917,2.917,0,1,0,3.492.446H22.96a2.916,2.916,0,1,0,3.312-.542l.287-1.264a1.25,1.25,0,0,0-1.219-1.527H11.36l-.341-1.667H26.287A1.25,1.25,0,0,0,27.506,15.694Z"
        transform="translate(667.1 37)"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'EcomCartIcon'
}
</script>

<style lang="scss" module>
.cartIcon {
  fill: #fff;
}
</style>
