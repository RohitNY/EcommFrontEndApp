<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="52.375"
    height="52.375"
    viewBox="0 0 52.375 52.375"
  >
    <defs>
      <filter
        id="Icon_awesome-play-circle"
        x="0"
        y="0"
        width="52.375"
        height="52.375"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx="10" dy="10" input="SourceAlpha" />
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feFlood flood-opacity="0.502" />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g
      transform="matrix(1, 0, 0, 1, 0, 0)"
      filter="url(#Icon_awesome-play-circle)"
    >
      <path
        id="Icon_awesome-play-circle-2"
        data-name="Icon awesome-play-circle"
        d="M18,.563A17.438,17.438,0,1,0,35.438,18,17.434,17.434,0,0,0,18,.563Zm8.135,19.125-12.375,7.1a1.691,1.691,0,0,1-2.51-1.477V10.688a1.692,1.692,0,0,1,2.51-1.477l12.375,7.523A1.693,1.693,0,0,1,26.135,19.688Z"
        transform="translate(-0.56 -0.56)"
        fill="#fff"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'EcomVideoPlayIcon'
}
</script>

<style lang="scss" module>
.cartIcon {
  fill: #ffffff;
}
</style>
