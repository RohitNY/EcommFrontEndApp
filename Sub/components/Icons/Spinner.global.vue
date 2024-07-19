<template>
  <div :class="[$style.spinners, $style[kind]]" />
</template>

<script>
const getAdunitColor = (el) => {
  return getComputedStyle(el).backgroundColor
}
export default {
  name: 'EcomSpinner',
  props: {
    targetNode: String,
    color: String,
    fgColor: String,
    kind: String
  },
  mounted () {
    if (this.fgColor) {
      this.$el.style.setProperty('--spinner-color', this.fgColor)
    } else {
      let el = false
      if (this.targetNode === 'smlt-button') {
        el = this.$parent.$parent.$refs['smlt-button'].$el.firstChild
      }
      if (this.targetNode === 'multioffer-atc') {
        el = this.$parent.$refs['multioffer-atc']
      }

      if (!el) {
        const spinnerColor = this.$hopX.invertColor(this.color)
        this.$el.style.setProperty('--spinner-color', spinnerColor)
        this.$el.style.setProperty('--spinner-background-color', spinnerColor)
      } else {
        const bgColor = getAdunitColor(el)
        const spinnerColor = this.$hopX.invertColor(bgColor)
        this.$el.style.setProperty('--spinner-color', spinnerColor)
        this.$el.style.setProperty('--spinner-background-color', bgColor)
      }
    }
  }
}
</script>

<style module>
.spinners {
  --spinner-color: #ffffff;
  --spinner-background-color: #ffffff;
  opacity: 0.337;
}

/* bars */
.bars,
.bars:before,
.bars:after {
  background: var(--spinner-color);
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 0.875rem;
  height: 4em;
}
.bars {
  color: var(--spinner-color);
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.bars:before,
.bars:after {
  position: absolute;
  top: 0;
  content: "";
}
.bars:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.bars:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

/* inline-circle */
.inline-circle {
  display: inline-block;
  font-size: 10px;
  margin: 1px auto;
  text-indent: -9999em;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: var(--spinner-color);
  background: -moz-linear-gradient(
    left,
    var(--spinner-color) 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    var(--spinner-color) 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(
    left,
    var(--spinner-color) 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -ms-linear-gradient(
    left,
    var(--spinner-color) 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    var(--spinner-color) 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.inline-circle:before {
  width: 50%;
  height: 50%;
  background: var(--spinner-color);
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.inline-circle:after {
  background: var(--spinner-background-color);
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
