<template>
  <div v-ui:responsive :class="$style.merchAdunit">
    <EcomAdunitFeatureHeader v-if="$parent.hasFeatureHeader" :data="data" />
    <content v-if="$mm.sm" data-ui="standard-sm" :class="[$style.contentBody, 'merchandiseAdunit_sm']">
      <EcomAdunitImagePreview :data="data.Images" />
      <EcomAdunitContentBodyMerchandise :data="data" />
      <EcomAdunitPricing :data="data" />
    </content>
    <content v-if="$mm.md" data-ui="standard-mm" :class="[$style.contentBody, 'merchandiseAdunit_md']">
      <section class="merchandiseAdunit_md__main">
        <EcomAdunitImagePreview :data="data.Images" />
        <EcomAdunitContentBodyMerchandise :data="data" />
      </section>
      <EcomAdunitPricing :data="data" class="merchandiseAdunit_md__pricing" />
    </content>
    <content v-if="$mm.lg" data-ui="standard-lg" :class="[$style.contentBody, 'merchandiseAdunit_lg']">
      <EcomAdunitImagePreview :data="data.Images" class="merchandiseAdunit_lg__image-preview" />
      <EcomAdunitContentBodyMerchandise :data="data" class="merchandiseAdunit_lg__content" />
      <EcomAdunitPricing :data="data" class="merchandiseAdunit_lg__pricing" />
    </content>
  </div>
</template>

<script>
import EcomAdunitFeatureHeader from '../Shared/FeatureHeader.vue'
import EcomAdunitImagePreview from '../Shared/ImagePreview.vue'
import EcomAdunitContentBodyMerchandise from '../ContentBodyMerchandise.vue'
import EcomAdunitPricing from '../Shared/PricingShell.vue'

export default {
  components: {
    EcomAdunitFeatureHeader,
    EcomAdunitImagePreview,
    EcomAdunitContentBodyMerchandise,
    EcomAdunitPricing
  },
  props: {
    data: Object
  }
}
</script>

<style lang="scss" module>
/* sm first */
.merchAdunit {
  border-radius: calc(var(--adunit-css-3) + 0.4rem);
}

.contentBody {
  background-color: var(--adunit-color-5);
  border-radius: var(--adunit-css-3);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
}

@include md {
  .contentBody {
    padding: 1rem;
    flex-flow: row nowrap;
    align-items: flex-start;
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
