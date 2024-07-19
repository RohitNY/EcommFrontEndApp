<template>
  <div v-ui:responsive :class="$style.sfAdunit">
    <EcomAdunitFeatureHeader v-if="$parent.hasFeatureHeader" :data="data" />
    <content v-if="$mm.sm" :class="[$style.contentBody, 'sfAdunit_sm']">
      <div :class="[$style.sfImgWrapSm]" @click="showMediaGallery">
        <EcomLazyImage :width="384" :height="560">
          <img
            :class="[$style.sfImgSm, data.Images.length && $style.hasImgPreview]"
            :src="$hopX.image(data.SuperFeature.Image.Sm, {width: 384, height: 560})"
          >
        </EcomLazyImage>
        <EcomImagePreviewCount
          :superfeature="true"
          class="adunit-image-preview__count"
          :count="data.Images.length"
        />
      </div>
      <EcomAdunitContentBodySuperFeature :data="data" />
      <EcomAdunitPricing :data="data" />
    </content>
    <content v-if="$mm.md" :class="[$style.contentBody, 'sfAdunit_md']">
      <section class="sfAdunit_md__main">
        <EcomAdunitImagePreview :data="data.Images" />
        <EcomAdunitContentBodySuperFeature :data="data" />
      </section>
      <EcomAdunitPricing :data="data" class="sfAdunit_md__pricing" />
    </content>
    <content v-if="$mm.lg" :class="[$style.contentBody, 'sfAdunit_lg']">
      <div :class="[$style.sfImgWrap]" @click="showMediaGallery">
        <EcomLazyImage :width="1080" :height="580">
          <img
            :class="[$style.sfImg, data.Images.length && $style.hasImgPreview]"
            :src="$hopX.image(data.SuperFeature.Image.Lg, {width: 1080, height: 580})"
          >
        </EcomLazyImage>
        <EcomImagePreviewCount
          :superfeature="true"
          class="adunit-image-preview__count"
          :count="data.Images.length"
        />
      </div>
      <div class="sfAdunit_lg__content" />
      <EcomAdunitPricing :data="data" class="sfAdunit_lg__pricing" />
    </content>
  </div>
</template>

<script>
import EcomAdunitFeatureHeader from '../Shared/FeatureHeader.vue'
import EcomAdunitImagePreview from '../Shared/ImagePreview.vue'
import EcomAdunitContentBodySuperFeature from '../ContentBodySuperFeature.vue'
import EcomAdunitPricing from '../Shared/PricingShell.vue'
import EcomImagePreviewCount from '../Shared/ImagePreviewCount.vue'

export default {
  components: {
    EcomAdunitFeatureHeader,
    EcomAdunitImagePreview,
    EcomAdunitContentBodySuperFeature,
    EcomAdunitPricing,
    EcomImagePreviewCount
  },
  props: {
    data: Object
  },
  computed: {
    offerMap () {
      return this.$hopX.adunitOfferMap(this.$parent.data.OfferType)
    }
  },
  methods: {
    showMediaGallery () {
      if (this.data.Images.length > 0) {
        this.$hopX.AnalyticEvent('onMainAdunitImageClicked', {
          adunit: this.data
        })

        this.$store.dispatch('media/setMedia', {
          media: this.data.Images,
          offerType: this.offerMap.type
        })
        this.$store.dispatch('modal/open', 'EcomModalMediaViewer')
      }
    }
  }
}
</script>

<style lang="scss" module>
/* //! sm, lg supports SF, md fallback to standard */
.sfAdunit {
  border-radius: calc(var(--adunit-css-3) + 0.4rem);
}

$sf-large-height: 58rem;

.contentBody {
  background-color: var(--adunit-color-5);
  border-radius: var(--adunit-css-3);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
}

.sfImgWrapSm {
  position: relative;
  max-width: 100%;
}
.sfImgSm {
  max-width: 100%;
  object-fit: contain;

  &.hasImgPreview {
    cursor: pointer;
  }
}

.sfImgWrap {
  border-radius: var(--adunit-css-3);
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: $sf-large-height;
  user-select: none;
  display: flex;
  justify-content: center;
}

.sfImg {
  position: absolute;
  user-select: none;
  // max-width: 100%;
  object-fit: contain;
  max-height: 100%;

  &.hasImgPreview {
    cursor: pointer;
  }
}

@include md {
  .contentBody {
    padding: 1rem;
    flex-flow: row nowrap;
    align-items: flex-start;
  }
}
@include lg {
  .contentBody {
    padding: 0;
    height: $sf-large-height;
  }
}
</style>

<style lang="scss">
@include md {
  .sfAdunit_md {
    &__main {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      width: 100%;
      padding: 0.25rem;
      flex: 1 0 30rem;
    }
    &__pricing {
      position: sticky;
      top: 23rem;
      margin-top: 0.25rem;
    }
  }
}

@include lg {
  .sfAdunit_lg {
    &__content {
      flex: 1 0 0;
    }
    &__pricing {
      position: sticky;
      flex: 25rem 0 0;
      top: 23rem;
      margin: 1rem;
      margin-bottom: 7.777rem;
    }
  }
}
</style>
