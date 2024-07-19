<template>
  <div v-ui:responsive :class="$style.merchAdunit">
    <content
      v-if="$mm.sm"
      data-ui="standard-sm"
      :class="[$style.contentBody, 'merchandiseAdunit_sm']"
    >
      <MarketplaceAdunitImagePreview :data="data.Images" />
      <MarketplaceAdunitContentBodyMerchandise :data="data" />
      <MarketplaceAdunitPricing :data="data" />
    </content>
    <content
      v-if="$mm.md"
      data-ui="standard-mm"
      :class="[$style.contentBody, 'merchandiseAdunit_md']"
    >
      <section class="merchandiseAdunit_md__main">
        <MarketplaceAdunitImagePreview :data="data.Images" />
        <MarketplaceAdunitContentBodyMerchandise :data="data" />
      </section>
      <MarketplaceAdunitPricing :data="data" class="merchandiseAdunit_md__pricing" />
    </content>
    <content
      v-if="$mm.lg"
      data-ui="standard-lg"
      :class="[$style.contentBody, 'merchandiseAdunit_lg']"
    >
      <MarketplaceAdunitImagePreview
        :data="data.Images"
        class="merchandiseAdunit_lg__image-preview"
      />
      <MarketplaceAdunitContentBodyMerchandise
        :data="data"
        class="merchandiseAdunit_lg__content"
      />
      <MarketplaceAdunitPricing :data="data" class="merchandiseAdunit_lg__pricing" />
    </content>
  </div>
</template>

<script>
import MarketplaceAdunitImagePreview from '../../Shared/ImagePreview.vue'
import MarketplaceAdunitContentBodyMerchandise from '../../Marketplace/ContentBodyMerchandise.vue'
import MarketplaceAdunitPricing from '../../Shared/Marketplace/PricingShell.vue'

export default {
  components: {
    MarketplaceAdunitImagePreview,
    MarketplaceAdunitContentBodyMerchandise,
    MarketplaceAdunitPricing
  },
  props: {
    data: Object
  }
}
</script>

<style lang="scss" module>
.merchAdunit {
  border-radius: .7rem;
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
  border-radius: calc(var(--marketplace-border-radius) + 0.4rem);
  @include md {
    padding: 1rem;
    flex-flow: row nowrap;
    align-items: flex-start;
  }
  @include lg {
    border-radius: calc(var(--adunit-css-3) + 0.4rem);
    padding: 1.4rem;
  }
}
</style>

<style lang="scss">
@include md {
  .merchandiseAdunit_md {
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
  .merchandiseAdunit_lg {
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
}
</style>
