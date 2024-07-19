<template>
  <div v-ui:responsive :class="$style.magAdunit">
    <content
      v-if="$mm.sm"
      data-ui="standard-sm"
      :class="[$style.contentBody, 'magazineAdunit_sm']"
    >
      <MarketplaceAdunitImagePreview :data="data.Images" />
      <MarketplaceAdunitContentBodyMagazine :data="data" />
      <MarketplaceAdunitPricing :data="data" />
    </content>
    <content
      v-if="$mm.md"
      data-ui="standard-mm"
      :class="[$style.contentBody, 'magazineAdunit_md']"
    >
      <section class="magazineAdunit_md__main">
        <MarketplaceAdunitImagePreview :data="data.Images" />
        <MarketplaceAdunitContentBodyMagazine :data="data" />
      </section>
      <MarketplaceAdunitPricing :data="data" class="magazineAdunit_md__pricing" />
    </content>
    <content
      v-if="$mm.lg"
      data-ui="standard-lg"
      :class="[$style.contentBody, 'magazineAdunit_lg']"
    >
      <MarketplaceAdunitImagePreview
        :data="data.Images"
        class="magazineAdunit_lg__image-preview"
      />
      <MarketplaceAdunitContentBodyMagazine
        :data="data"
        class="magazineAdunit_lg__content"
      />
      <MarketplaceAdunitPricing :data="data" class="magazineAdunit_lg__pricing" />
    </content>
  </div>
</template>

<script>
import MarketplaceAdunitImagePreview from '../../Shared/ImagePreview.vue'
import MarketplaceAdunitContentBodyMagazine from '../../Marketplace/ContentBodyMagazine.vue'
import MarketplaceAdunitPricing from '../../Shared/Marketplace/PricingShell.vue'

export default {
  components: {
    MarketplaceAdunitImagePreview,
    MarketplaceAdunitContentBodyMagazine,
    MarketplaceAdunitPricing
  },
  props: {
    data: Object
  }
}
</script>

<style lang="scss" module>
.magAdunit {
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
  .magazineAdunit_md {
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
  .magazineAdunit_lg {
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
