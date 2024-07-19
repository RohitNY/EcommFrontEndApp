<template>
  <div v-ui:responsive :class="$style.tabAdunit">
    <content
      v-if="$mm.sm"
      data-ui="standard-sm"
      :class="[$style.contentBody, 'merchandiseAdunit']"
    >
      <section class="micrositeAdunit__content">
        <EcomLazyImage :width="350" :height="350">
          <img
            key="product-image"
            :src="
              $hopX.image(getMainImage('small').Url, {
                width: 350,
                height: 350
              })
            "
            :alt="getMainImage.Alt"
            class="micrositeAdunit__content-image"
          >
        </EcomLazyImage>

        <div v-if="contentHeader" class="micrositeAdunit__content-header">
          {{ contentHeader }}
        </div>
        <div
          v-if="incentiveDescription"
          class="micrositeAdunit__content-incentive"
        >
          Plus as a special incentive for ordering now, we’ll give you
          <br><span>{{ incentiveDescription }}</span><br>
          on your first shipment!
        </div>
        <div v-if="disclaimerCopy" class="micrositeAdunit__content-disclaimer">
          {{ disclaimerCopy }}
        </div>

        <MicrositeAdunitPricing :data="data" class="micrositeAdunit__pricing" />
        <div v-if="contentSub" class="micrositeAdunit__content-sub-header">
          {{ contentSub }}
        </div>
        <div
          v-if="contentBody"
          class="micrositeAdunit__content-body"
          v-html="contentBody"
        />
        <!-- eslint-disable-line -->
        <MicrositeAdunitThumbs
          :images="data.Images.Thumbs"
          class="micrositeAdunit__content-thumbs"
        />
        <EcomLazyImage :width="346" :height="139">
          <img
            key="product-image"
            :src="
              $hopX.image(getFooterImage('small').Url, {
                width: 346,
                height: 139
              })
            "
            :alt="getFooterImage.Alt"
            class="micrositeAdunit__content-footer"
          >
        </EcomLazyImage>
        <div class="micrositeAdunit__content-flytype">
          {{ flytype }}
        </div>
        <MicrositeAdunitPricing :data="data" class="micrositeAdunit__pricing" />
      </section>
    </content>
    <content
      v-if="$mm.md"
      data-ui="standard-mm"
      :class="[$style.contentBody, 'merchandiseAdunit_md']"
    >
      <section class="micrositeAdunit_md__content">
        <EcomLazyImage :width="330" :height="330">
          <img
            key="product-image"
            :src="
              $hopX.image(getMainImage('small').Url, {
                width: 330,
                height: 330
              })
            "
            :alt="getMainImage.Alt"
            class="micrositeAdunit_md__content-image"
          >
        </EcomLazyImage>

        <div class="micrositeAdunit_md__content-text">
          <div v-if="contentHeader" class="micrositeAdunit__content-header">
            {{ contentHeader }}
          </div>
          <div v-if="contentSub" class="micrositeAdunit__content-sub-header">
            {{ contentSub }}
          </div>
          <div
            v-if="contentBody"
            class="micrositeAdunit__content-body"
            v-html="contentBody"
          />
          <!-- eslint-disable-line -->
        </div>

        <MicrositeAdunitThumbs
          :images="data.Images.Thumbs"
          class="micrositeAdunit__content-thumbs"
        />
        <EcomLazyImage :width="346" :height="139">
          <img
            key="product-image"
            :src="
              $hopX.image(getFooterImage('small').Url, {
                width: 346,
                height: 139
              })
            "
            :alt="getFooterImage.Alt"
            class="micrositeAdunit_md__content-footer"
          >
        </EcomLazyImage>
      </section>
      <MicrositeAdunitPricing
        :data="data"
        class="merchandiseAdunit_md__content"
      />
    </content>
    <content
      v-if="$mm.lg"
      data-ui="standard-lg"
      :class="[$style.contentBody, 'merchandiseAdunit']"
    >
      <section class="micrositeAdunit__content">
        <EcomLazyImage :width="678" :height="351">
          <img
            key="product-image"
            :src="
              $hopX.image(getMainImage('large').Url, {
                width: 678,
                height: 351
              })
            "
            :alt="getMainImage.Alt"
            class="micrositeAdunit__content-image"
          >
        </EcomLazyImage>
        <div class="micrositeAdunit_md__content-text">
          <div v-if="contentHeader" class="micrositeAdunit__content-header">
            {{ contentHeader }}
          </div>
          <div v-if="contentSub" class="micrositeAdunit__content-sub-header">
            {{ contentSub }}
          </div>
          <div
            v-if="contentBody"
            class="micrositeAdunit__content-body"
            v-html="contentBody"
          />
          <!-- eslint-disable-line -->
        </div>

        <MicrositeAdunitThumbs
          :images="data.Images.Thumbs"
          class="micrositeAdunit__content-thumbs"
          width="300"
          height="300"
        />
        <EcomLazyImage :width="346" :height="139">
          <img
            key="product-image"
            :src="
              $hopX.image(getFooterImage('small').Url, {
                width: 346,
                height: 139
              })
            "
            :alt="getFooterImage.Alt"
            class="micrositeAdunit_md__content-footer"
          >
        </EcomLazyImage>
      </section>
      <MicrositeAdunitPricing :data="data" class="merchandiseAdunit__content" />
    </content>
  </div>
</template>

<script>
import MicrositeAdunitThumbs from '../../Shared/Microsite/ThumbImages.vue'
import MicrositeAdunitPricing from '../../Shared/Microsite/PricingShell.vue'

export default {
  components: {
    MicrositeAdunitThumbs,
    MicrositeAdunitPricing
  },
  props: {
    data: Object
  },
  computed: {
    thumbImages () {
      return this.data.Images.Thumbs
    },
    contentHeader () {
      return this.data.Header
    },
    contentSub () {
      return this.data.SubHeader
    },
    contentBody () {
      return this.data.BodyCopy
    },
    incentiveDescription () {
      return this.data.IncentiveDescription
    },
    disclaimerCopy () {
      return this.data.Disclaimer
    },
    flytype () {
      return this.data.FlyType
    }
  },
  methods: {
    getMainImage (size) {
      return size === 'large'
        ? this.data.Images.Main.Desktop
        : this.data.Images.Main.Mobile
    },
    getFooterImage (size) {
      return size === 'large'
        ? this.data.Images.Footer.Desktop
        : this.data.Images.Footer.Mobile
    }
  }
}
</script>

<style lang="scss" module>
.tabAdunit {
  border-radius: 0.7rem;
  @include sm {
    border: 2.5px solid #ffffff;
  }
  @include lg {
    border-radius: calc(var(--adunit-css-3) + 0.4rem);
  }
}

.contentBody {
  background-color: var(--adunit-color-5);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'Roboto';
  @include md {
    padding: 1rem;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: space-between;
  }
  @include lg {
    border-radius: calc(var(--adunit-css-3) + 0.4rem);
    padding: 1.4rem;
    justify-content: space-between;
  }
}
</style>

<style lang="scss">
.micrositeAdunit {
  &__content {
    max-width: 68rem;
    text-align: center;
    &-header {
      padding: 12px 14px 0 14px;
      font-size: 1.6rem;
      line-height: 2;
      font-weight: 700;
    }
    &-incentive {
      margin: 7px 40px;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 1.6rem;
      padding: 2px;
      border: 2px solid black;
      border-radius: 5px;
      text-align: center;
      span {
        color: orange;
        font-weight: 900;
      }
    }
    &-disclaimer {
      margin: 13px 35px 4px;
      font-size: 11px;
      line-height: 1.5rem;
    }
    &-sub-header {
      margin: 9px 12px 6px;
      color: #05539b;
      font-size: 1.7rem;
      font-weight: 700;
    }
    &-body {
      margin: 0 15px;
      font-size: 1.2rem;
      line-height: 1.4;
      font-weight: 400;
    }
    &-flytype {
      margin: 13px;
    }
  }
}
@include md {
  .micrositeAdunit_md__content {
    max-width: 350px;
    text-align: center;
    margin-right: 10px;
  }
  .micrositeAdunit__content-header {
    padding: 12px 0;
    margin: 0 auto;
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
  .micrositeAdunit__content-sub-header {
    margin: 9px 0 6px;
  }
  .micrositeAdunit__content-body {
    margin: 0;

    ul {
      padding-left: 25px;
      text-align: left;
    }
  }
  .micrositeAdunit_md {
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
  .micrositeAdunit_lg {
    &__image-preview {
      /* image-preivew */
      flex: 34.5rem 0 0;
    }
    &__content {
      flex: 1 0 0;
    }
    &__pricing {
      position: sticky;
      flex: 25rem 0 0;
      top: 23rem;
    }
  }

  .micrositeAdunit__content-body {
    ul {
      padding-left: 20%;
      text-align: left;
    }
  }
}
</style>
