<template>
  <span>
    <EcomButton
      animate="flipInX faster delay-300ms"
      :class="[$style.btn, 'u-display-hidden']"
      :disabled="clicked"
      @click="advancePathExperience('clicked')"
    >
      <span v-if="processing && clicked" :class="$style.processing">
        <EcomSpinner fg-color="#fafafa" kind="bars" />
      </span>
      <span v-else>
        <span v-text="buttonText" />
        <EcomArrow
          :class="$style.arrow"
          direction="right"
          size="lg"
          :position="arrowPosition"
        />
      </span>
    </EcomButton>
  </span>
</template>

<script>
export default {
  name: 'ContinueUi',
  props: {
    data: Object
  },
  data () {
    return {
      clicked: false,
      processing: false
    }
  },
  computed: {
    buttonText () {
      return this.data.Labels[0]
    },
    arrowPosition () {
      if (this.theme !== 'standard') {
        return 'borderRight'
      }
      return 'inline'
    }
  },
  methods: {
    buttonClicked (buttonClicked) {
      this.processing = true
      this[buttonClicked] = true
    },
    async advancePathExperience (buttonClicked) {
      this.buttonClicked(buttonClicked)

      /* this sleep is to allow time for the btn ripple animation to play */
      await this.$hopX.sleep(350)
      this.$store.dispatch('app/continuePathExperience')
    }
  }
}
</script>

<style lang="scss" module>
.btn {
  margin: 4rem auto 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .ecomButtonStyle {
    background-color: var(--page-end-button-bg);
    font-family: var(--app-font-bold);
    max-width: calc(100% - 2rem);
    letter-spacing: -0.125rem;
    border-radius: var(--page-end-border-radius);
    color: #ffffff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
    z-index: 1;
    @include sm {
      font-size: 2rem;
      line-height: 2.5rem;
      min-width: 30rem;
      padding: 0 4rem;
      min-height: var(--page-end-min-height-sm);
    }
    @include md {
      font-size: 3.5rem;
      line-height: 4rem;
      padding: 0 2rem;
      min-width: 40rem;
      min-height: var(--page-end-min-height-md);
    }
    @include lg {
      font-size: 4rem;
      line-height: 4.5rem;
    }
  }
  .arrow > span {
    border-width: 0 0.6rem 0.6rem 0;
    padding: 1.2rem;
    @include sm {
      display: none;
    }
  }

  :disabled {
    transition: all 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: rgb(255, 220, 167);
    cursor: default;
  }
}

.processing {
  height: 5rem;
  display: block;
  margin-top: -8rem;
}
</style>
