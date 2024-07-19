<template>
  <div
    :class="[cssTheme, $style.pEn]"
    :data-ui-api="ui"
    :data-ui-rendered="renderUi"
  >
    <!-- New implementation: Ui delivers a button collection Array -->
    <EcomButtonUiModule v-if="buttonCollection" :buttons="buttonCollection" />
    <!--  -->
    <span v-if="buttonText1 && shouldBtn1Post &&!buttonCollection" ref="button1">
      <EcomHttpPost @on-submit="buttonClicked('buttonClicked1')">
        <EcomButton
          :disabled="buttonClicked1"
          animate="flipInX faster delay-300ms"
          :class="[$style.btn, 'u-display-hidden']"
        >
          <span v-if="processing && buttonClicked1" :class="$style.processing">
            <EcomSpinner fg-color="#fafafa" kind="bars" />
          </span>
          <span v-else>
            <span ref="buttonText1" v-text="buttonText1" />
            <EcomArrow
              :class="$style.arrow"
              direction="right"
              size="lg"
              :position="arrowPosition"
            />
          </span>
        </EcomButton>
      </EcomHttpPost>
    </span>
    <span v-else-if="!buttonCollection" ref="button1">
      <EcomButton
        animate="flipInX faster delay-300ms"
        :class="[$style.btn, 'u-display-hidden']"
        :disabled="buttonClicked1"
        @click="advancePathExperience('buttonClicked1')"
      >
        <span v-if="processing && buttonClicked1" :class="$style.processing">
          <EcomSpinner fg-color="#fafafa" kind="bars" />
        </span>
        <span v-else>
          <span ref="buttonText1" v-text="buttonText1" />
          <EcomArrow
            :class="$style.arrow"
            direction="right"
            size="lg"
            :position="arrowPosition"
          />
        </span>
      </EcomButton>
    </span>
    <!--  -->
    <span v-if="buttonText2 && shouldBtn2Post &&!buttonCollection" ref="button2">
      <EcomHttpPost @on-submit="buttonClicked('buttonClicked2')">
        <EcomButton
          :disabled="buttonClicked2"
          animate="flipInX faster delay-300ms"
          :class="[$style.btn, 'u-display-hidden']"
        >
          <span v-if="processing && buttonClicked2" :class="$style.processing">
            <EcomSpinner fg-color="#fafafa" kind="bars" />
          </span>
          <span v-else>
            <span ref="buttonText2" v-text="buttonText2" />
            <EcomArrow
              :class="$style.arrow"
              direction="right"
              size="lg"
              :position="arrowPosition"
            />
          </span>
        </EcomButton>
      </EcomHttpPost>
    </span>
    <span v-else-if="buttonText2 &&!buttonCollection" ref="button2">
      <EcomButton
        animate="flipInX faster delay-300ms"
        :class="[$style.btn, 'u-display-hidden']"
        :disabled="buttonClicked2"
        @click="advancePathExperience('buttonClicked2')"
      >
        <span v-if="processing && buttonClicked2" :class="$style.processing">
          <EcomSpinner fg-color="#fafafa" kind="bars" />
        </span>
        <span v-else>
          <span ref="buttonText2" v-text="buttonText2" />
          <EcomArrow
            :class="$style.arrow"
            direction="right"
            size="lg"
            :position="arrowPosition"
          />
        </span>
      </EcomButton>
    </span>
    <!--  -->
    <p :class="$style.legal" :style="ensureLegibleTextColor">
      NO PURCHASE OR FEE NECESSARY TO ENTER.
      <br>A PURCHASE WON’T IMPROVE AN INDIVIDUAL’S CHANCE OF WINNING.
    </p>
  </div>
</template>

<script>
import get from 'lodash/get'
import EcomButtonUiModule from '../components/UiComponents/PageEndNavigation/ButtonUiModule.vue'

export default {
  name: 'EcomPageEndNavigation',
  components: {
    EcomButtonUiModule
  },
  props: {
    ui: { type: [String, Array], default: 'Ui1' },
    theme: { type: String, default: 'standard' }
  },
  data () {
    return {
      renderUi: null,
      buttonCollection: null,
      buttonText1: null,
      buttonText2: null,
      buttonClicked1: false,
      buttonClicked2: false,
      processing: false
    }
  },
  computed: {
    cssTheme () {
      const base = 'ecom-page-navigation'

      const cssClass = this.theme
        ? base + '--' + this.theme
        : base + '--standard'

      return cssClass
    },
    arrowPosition () {
      if (this.theme !== 'standard') {
        return 'borderRight'
      }
      return 'inline'
    },

    ensureLegibleTextColor () {
      const getter = this.$store.getters['app/getPagePathExperienceBySlug']
      const xp = getter(this.$route.query.tn)
      const color = this.$hopX.invertColor(xp?.Ui?.Colors?.PageBackground)
      return { color }
    },
    isCustomerOnFinalTab () {
      const path = this.$store.getters['app/getNextPathExperience']
      return typeof path.Slug === 'undefined'
    },
    /* ui rules */
    shouldBtn1Post () {
      return this.isCustomerOnFinalTab
    },
    shouldBtn2Post () {
      return this.renderUi === 'Ui3'
    },
    getSpectrumConfig () {
      return (
        get(window, 'Spectrum.UiComponentData.PageNavigation.' + this.ui) || {}
      )
    }
  },
  beforeMount () {
    if (Array.isArray(this.ui)) {
      // updated implementation with array of button components - Sept 2021
      // assume array has length < 2 and work with first two elements
      const buttonUiStrings = this.ui
      this.buttonCollection = buttonUiStrings.map((string) => {
        return window.Spectrum.UiComponentData.PageNavigation[string]
      })
    } else {
      this.renderUi = this.ui

      const { Labels } = this.getSpectrumConfig

      if (Labels) {
        this.buttonText1 = Labels[0]
        this.buttonText2 = Labels[1]
      }
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
.pEn {
  form {
    text-align: center;
    margin-bottom: 3rem;
    button {
      max-width: 27rem;
    }
  }
}

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

.legal {
  color: #000000; /* default */
  font-family: var(--app-font-bold);
  text-align: center;
  font-size: 1.222rem;
  line-height: 1.555rem;
  padding: 1rem 0;
}
</style>
