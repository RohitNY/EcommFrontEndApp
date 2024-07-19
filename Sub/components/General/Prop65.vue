<template>
  <div :class="$style.prop65warning">
    <img
      :class="$style.icon"
      alt="⚠"
      :src="require('~/assets/images/icon-warning.svg')"
    >
    <span :class="$style.prop65copy">
      <span :class="$style.type">WARNING:</span>
      <span :class="$style.disclosure" v-text="msg" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.prop65warning {
  position: relative;
  padding: 1rem 1rem;
  border: 1px solid rgba(191, 191, 191, 0.2);
  background-color: rgb(17, 17, 17);
  .icon {
    position: absolute;
    width: 21px;
    padding-right: 4px;
  }
  .prop65copy {
    font-family: "Roboto", sans-serif;
    .type {
      font-weight: 900;
      font-size: 13px;
      margin-left: 17px;
    }
    .disclosure {
      font-size: 12px;
      opacity: 0.9;
      letter-spacing: -0.125px;
    }
  }
}
</style>
