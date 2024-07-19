<template>
  <component
    :is="renderComponentName"
    :data="offer.Pricing.Data"
    :labels="labels"
    :marketplace="true"
  />
</template>

<script>
import MerchandiseUi1 from '../Merchandise/MerchandiseUi1.vue'
import MagazineUi1 from '../Magazine/MagazineUi1.vue'

export default {
  components: {
    MerchandiseUi1,
    MagazineUi1
  },
  props: {
    data: Object,
    offer: Object,
    group: String
  },
  computed: {
    ui () {
      const page = this.$store.getters['app/getActivePathExperience']
      const defaultComponentData = window.Spectrum.UiComponentData
      if (page.Ui?.Pricing) {
        return (
          page.Ui?.Pricing['Ui' + this.offer.Pricing.Ui] ||
          defaultComponentData.Pricing['Ui' + this.offer.Pricing.Ui]
        )
      }
      return defaultComponentData.Pricing['Ui' + this.offer.Pricing.Ui]
    },
    labels () {
      return this.ui && this.ui.Labels
    },
    renderComponentName () {
      if (!this.ui) {
        this.$hopX.debug(
          'warn',
          `[Critical] <Offer:${this.data.Id}> PricingBox.PrimaryOfferPricing Invalid API Response: `,
          JSON.stringify(this.data.PricingBox, null, 2)
        )
      }
      return this.ui && this.ui.Component
    }
  }
}
</script>

<style lang="scss">
.adunit-pricing {
  &.marketplace-pricing {
    &.merchandise-pricing {
      background-color: var(--theme-background-color-tiered-pricing);
      color: var(--theme-font-color-tiered-pricing);
      font-family: var(--marketplace-font-normal);
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      padding: 1rem 0;
      > div {
        > div:first-child {
          font-family: var(--marketplace-font-condensed);
        }
        flex: 1 0 0;
      }
      @include xs {
        div {
          font-size: 2.73rem !important;
        }
        > div {
          > div:first-child {
            font-size: 1.3rem !important;
            padding: 0 1.25rem;
            height: 4rem;
          }
        }
      }
      @include sm-only {
        div {
          font-size: 2.73rem !important;
        }
        > div {
          > div:first-child {
            font-size: 1.4rem !important;
            padding: 0 1.25rem;
            height: 4.2rem;
          }
        }
      }
      @include md {
        flex-flow: column nowrap;
        > div {
          padding: 0.5rem 0;
          > div:first-child {
            font-size: 1.6rem;
          }
        }
      }
    }

    /*
    !! Magazine Pricing
  */
    &.magazine-pricing {
      background-color: var(--theme-background-color-tiered-pricing);
      color: var(--theme-font-color-tiered-pricing);
      font-size: 1.55rem;
      padding: 1rem 0;
      .sm-only {
        display: flex;
        justify-content: space-evenly;
      }
      .magazine-pricing__row {
        padding: 0.25rem 0;
        div {
          display: flex;
          flex-flow: column;
          align-items: center;
          font-size: 1.3rem;
          font-family: var(--marketplace-font-condensed);
          /* selects the price */
          div:not(:first-of-type) {
            font-size: 2.8rem;
            padding-left: 0.5rem;
            font-family: var(--marketplace-font-normal);
          }
        }
        /* magazine-pricing__row modifier */
        &.now-price {
          font-size: 1.3rem;
          div:not(:first-of-type) {
            font-size: 2.8rem;
            font-weight: 900;
            padding-left: 0.5rem;
          }
        }
      }
      @include md {
        display: flex;
        flex-flow: column nowrap;
        .magazine-pricing__row:first-of-type {
          align-items: center;
          flex-flow: column nowrap;
          > div {
            padding: 0.125rem 0;
          }
        }

        .md-plus {
          .issues-year {
            font-family: var(--marketplace-font-bold);
            padding: 0.5rem 0 0.875rem;
          }
          flex-flow: column nowrap;
          > div {
            padding: 0.5rem 0;
            > div:first-child {
              font-size: 1.6rem;
            }
          }
        }
      }
    }
  }
}
</style>
