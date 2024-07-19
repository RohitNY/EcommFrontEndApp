<template functional>
  <div :class="['adunit-pricing', 'merchandise-pricing', props.marketplace ? 'marketplace-pricing' : '']">
    <EcomPrice v-if="props.labels[0]">
      <b slot="header">{{ props.labels[0] }}</b>
      <b slot="price" treatment="g-strike-through">{{ props.data[0] }}</b>
    </EcomPrice>
    <EcomPrice v-if="props.labels[1]">
      <b slot="header">{{ props.labels[1] }}</b>
      <b slot="price" treatment="g-strike-through">{{ props.data[1] }}</b>
    </EcomPrice>
    <EcomPrice v-if="props.labels[2]">
      <b slot="header">{{ props.labels[2] }}</b>
      <b slot="price" treatment="g-fw-900">{{ props.data[2] }}</b>
    </EcomPrice>
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
