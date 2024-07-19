<template functional>
  <div
    :class="['adunit-feature-header', (!props.data.SubSavings && !props.data.FeatureText) ? 'adunit-feature-header--empty' : '']"
  >
    <div
      v-if="!props.data.SubSavings && !props.data.FeatureText"
      class="adunit-feature-header__cap"
    />
    <!-- eslint-disable vue/no-v-html -->
    <h3
      v-if="props.data.FeatureText"
      class="adunit-feature-header__main"
      v-html="props.data.FeatureText"
    />
    <span v-else>&nbsp;</span>
    <h4
      v-if="props.data.SubSavings"
      class="adunit-feature-header__sub"
      v-html="props.data.SubSavings"
    />
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style lang="scss">
$wrapper: "adunit-feature-header";
@mixin component($main-fs, $sub-fs, $hide: true) {
  .#{$wrapper} {
    border-top-left-radius: var(--adunit-css-3);
    border-top-right-radius: var(--adunit-css-3);
    font-family: var(--adunit-font-4);
    color: var(--theme-font-color-feature-header);
    background-color: var(--theme-background-color-feature-header);
    text-align: center;
    position: relative;
    padding: 0 0.25rem;
    @if $hide == true {
      display: none; // !! hidden feature header
    }
    &__main {
      padding: #{$main-fs * 0.276} 0 0;
      line-height: $main-fs * 0.85;
      font-size: $main-fs * 0.85;
    }
    &__sub {
      padding: #{$sub-fs * 0.276} 0 #{$sub-fs * 0.476};
      line-height: $sub-fs * 0.85;
      font-size: $sub-fs * 0.85;
    }
    @content;
  }
}

.#{$wrapper} {
  &:not(&--empty) {
    &:before {
      background-color: var(--theme-background-color-feature-header);
      content: "";
      width: 100%;
      height: 3rem;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateY(100%);
    }
  }
}

@include sm {
  .#{$wrapper} {
    &__cap {
      // background-color: var(--adunit-color-10);
      // width: calc(100% + 0.8rem);
      // left: -0.4rem;
      background-color: var(--adunit-color-5);
      position: absolute;
      width: 100%;
      left: 0;
      top: -0.5rem;
      height: 3rem;
    }
  }
}

/* viewport && theme overrides */
@include sm {
  @include with-offer-type("merchandise") {
    @include component(3rem, 2.25rem, false /* true */);
  }
  @include with-offer-type("magazine") {
    @include component(3rem, 2.25rem, false /* true */);
  }
}

@include md {
  @include with-offer-type("merchandise") {
    @include component(5rem, 2.5rem, false);
  }
  @include with-offer-type("magazine") {
    @include component(4rem, 2rem, false);
  }
}

@include lg {
  @include with-offer-type("merchandise") {
    @include component(6rem, 3.5rem, false);
  }
  @include with-offer-type("magazine") {
    @include component(6rem, 3.5rem, false);
  }
}
</style>
