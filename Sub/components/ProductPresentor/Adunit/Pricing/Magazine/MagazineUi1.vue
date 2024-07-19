<template functional>
  <div :class="['adunit-pricing', 'magazine-pricing', props.marketplace ? 'marketplace-pricing' : '']">
    <section class="sm-only">
      <div
        v-if="props.labels[2] || props.labels[3]"
        class="magazine-pricing__row g-flex-row g-flex-justify-space-around g-flex-align-center fs-1"
      >
        <EcomPrice v-if="props.labels[2]">
          <b slot="header">{{ props.labels[2] }}</b>
          <b slot="price" treatment="g-strike-through">{{ props.data[2] }}</b>
        </EcomPrice>
        <EcomPrice v-if="props.labels[3]">
          <b slot="header">{{ props.labels[3] }}</b>
          <b slot="price" treatment="g-strike-through">{{ props.data[3] }}</b>
        </EcomPrice>
      </div>
      <div
        v-if="props.labels[4]"
        class="magazine-pricing__row now-price g-flex-row g-flex-justify-center g-flex-align-center fs-2"
      >
        <EcomPrice v-if="props.labels[4]">
          <b slot="header">{{ props.labels[4] }}</b>
          <b slot="price" treatment="g-fw-900">{{ props.data[4] }}</b>
        </EcomPrice>
      </div>
    </section>
    <section class="md-plus">
      <div
        class="issues-year"
      >
        {{ props.data[0] }} {{ props.labels[0] }} | {{ props.data[1] }} {{ props.labels[1] }}
      </div>

      <EcomPrice v-if="props.labels[2]">
        <b slot="header">{{ props.labels[2] }}</b>
        <b slot="price" treatment="g-strike-through">{{ props.data[2] }}</b>
      </EcomPrice>
      <EcomPrice v-if="props.labels[3]">
        <b slot="header">{{ props.labels[3] }}</b>
        <b slot="price" treatment="g-strike-through">{{ props.data[3] }}</b>
      </EcomPrice>
      <EcomPrice v-if="props.labels[4]">
        <b slot="header">{{ props.labels[4] }}</b>
        <b slot="price" treatment="g-fw-900">{{ props.data[4] }}</b>
      </EcomPrice>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    labels: Array,
    marketplace: Boolean
  }
}
</script>

<style lang="scss" scoped>
@include xs {
  .fs-1 {
    font-size: 0.875rem;
  }
}
@include sm-only {
  .fs-1 {
    font-size: 1.1rem;
  }
  .fs-2 {
    font-size: 1.5rem !important;
  }
}
@include md-only {
  .fs-1 {
    font-size: 1.1rem;
  }
  .fs-2 {
    font-size: 1.5rem !important;
  }
}

/* render pricing by viewport */
@include xs {
  .adunit-pricing.magazine-pricing section.md-plus {
    display: none;
  }
}
@include sm {
  .adunit-pricing.magazine-pricing section.md-plus {
    display: none;
  }
}
@include md {
  .adunit-pricing.magazine-pricing section.sm-only {
    display: none;
  }
}
</style>
