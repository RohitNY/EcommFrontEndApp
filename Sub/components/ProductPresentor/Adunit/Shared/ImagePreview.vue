<template>
  <section v-if="getImage(0)" class="adunit-image-preview" @click="showMediaGallery">
    <EcomLazyImage :width="350" :height="350">
      <div class="adunit-image-preview__container">
        <img
          key="product-image"
          :src="$hopX.image(getImage(0).Url, offerTypeAwareImgSizing)"
          :alt="getImage(0).Alt"
          class="adunit-image-preview__container-img"
        >
        <MarketplaceLabelContainer v-if="uiType === 'marketplace'" class="adunit-image-preview__container-labels" :data="labels" />
      </div>
    </EcomLazyImage>
    <EcomImagePreviewCount
      :count="data.length"
      :ui="uiType"
      :class="['adunit-image-preview__count', uiType === 'marketplace' ? 'left' : '']"
    />
  </section>
</template>

<script>
import EcomImagePreviewCount from './ImagePreviewCount.vue'
import MarketplaceLabelContainer from './LabelContainer'

export default {
  name: 'EcomImagePreview',
  components: {
    EcomImagePreviewCount,
    MarketplaceLabelContainer
  },
  props: {
    data: Array
  },
  computed: {
    offerMap () {
      return this.$hopX.adunitOfferMap(this.$parent.data.OfferType)
    },
    uiType () {
      return this.$hopX.adunitUiMap(this.$parent.data.Ui).ui
    },
    offerTypeAwareImgSizing () /* determine img size based on adunit OfferType */ {
      switch (this.offerMap.type) {
        case 'merchandise':
          return { width: 375, height: 375 }
        case 'magazine':
          return { width: 375, height: 514 }
        default:
          return { width: 375, height: 375 }
      }
    },
    labels () /* find exisiting deal labels */{
      const labels = []
      if (this.$parent.data.Decorate?.DealCategoryLabel) {
        labels.push({ Type: 'DealCategory', ...this.$parent.data.Decorate.DealCategoryLabel })
      }
      if (this.$parent.data.SecondaryProductLabel) {
        labels.push({ Type: 'SecondaryProduct', ...this.$parent.data.SecondaryProductLabel })
      }
      return labels
    }
  },
  methods: {
    showMediaGallery () {
      this.$hopX.AnalyticEvent('onMainAdunitImageClicked', {
        adunit: this.$parent.data
      })

      this.$store.dispatch('media/setMedia', {
        media: this.data,
        offerType: this.offerMap.type
      })
      this.$store.dispatch('modal/open', 'EcomModalMediaViewer')
    },
    getImage (idx) {
      if (this.data) {
        return this.data[idx]
      }
    }
  }
}
</script>

<style lang="scss">
$wrapper: 'adunit-image-preview';
@mixin component() {
  .#{$wrapper} {
    position: relative;
    width: 100%;
    max-width: 100%;
    min-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    cursor: pointer;
    @include xs {
      min-height: 27rem;
    }
    @include md {
      width: calc(34.5rem - var(--adunit-css-4) * 2);
    }
    &__container {
      position: relative;
      width: 100%;
      &-img {
        width: 100%;
        // width: calc(34.5rem - var(--adunit-css-4) * 2);
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        height: auto;
      }
    }
    &__count {
      position: absolute;
      bottom: 1.117rem;
      right: 1.117rem;
      &.left {
        left: 1.117rem;
        max-width: 31%;
        text-align: center;
      }
    }
    @content;
  }
}

@include xs {
  @include with-offer-type('magazine') {
    @include component {
      min-height: auto;
    }
  }
}

@include sm {
  @include with-offer-type('magazine') {
    @include component {
      min-height: auto;
    }
  }
  @include with-offer-type('merchandise') {
    @include component {
      // border-top-right-radius: var(--adunit-css-3);
      // border-top-left-radius: var(--adunit-css-3);
    }
  }
}

@include md {
  @include with-offer-type('merchandise') {
    @include component {
      padding: 0.5rem;
      &__img {
        // border-radius: var(--adunit-css-3);
        max-width: 33rem;
      }
    }
  }
  @include with-offer-type('magazine') {
    @include component {
      padding: 1rem 0.5rem;
      &__img {
        border-radius: 0;
      }
    }
  }
}

@include lg {
  @include component {
  }
}
</style>
