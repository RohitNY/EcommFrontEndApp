<template>
  <content :key="1" ref="content" :class="['ref-expandable-content', $style.content, expanded && $style.expanded]">
    <EcomHtml :class="$style.subHead" label="Subtitle" prop="SubHead" />
    <EcomHtml :class="$style.bodyCopy" label="Description" prop="BodyCopy" />
    <EcomHtml :class="$style.disclaimer" label="Disclaimer" prop="FlyType" />
    <img
      v-for="img in UiProductNotices"
      :key="data.Id + img"
      class="g-mb-2 g-mw-100 g-bg-white g-pad-p5 g-br-1"
      :aria-label="img.Label"
      :alt="img.Alt"
      :src="img.AssetUrl"
    >
    <button
      v-if="scrollableContent"
      v-ui:animate.onenter="'fadeIn delay-600ms'"
      tabindex="0"
      :class="[$style.btn, {[$style.expanded]:expanded}, 'u-display-hidden']"
      :aria-label="'Read more about ' + data.Title"
      @click="toggleAdunitContent"
    >
      READ MORE
      <EcomArrow
        :class="[$style.arrow, expanded && $style.arrowUp]"
        :direction="expanded ? 'up' : 'down'"
        size="md"
      />
    </button>
  </content>
</template>

<script>
import EcomHtml from '../../Shared/Html.vue'

export default {
  name: 'MarketplaceExpandableDescription',
  components: {
    EcomHtml
  },
  props: {
    data: Object
  },
  data () {
    return {
      expanded: false,
      scrollableContent: false
    }
  },
  computed: {
    UiProductNotices () {
      if (!this.data.UiNotice) {
        return []
      }
      const notice = window.Spectrum.UiImages
      return [...this.data.UiNotice].map(i => notice[i])
    }
  },
  mounted () {
    const e = this.$refs.content
    this.scrollableContent = e.scrollHeight > e.clientHeight
  },
  methods: {
    toggleAdunitContent () {
      this.$hopX.AnalyticEvent('onMoreInfoClicked', {
        adunit: this.data
      })

      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss" module>
@keyframes expand-content {
  from {
    max-height: 37.5rem;
  }
  to {
    max-height: 300rem;
  }
}
.content {
  position: relative;
  display: block;
  overflow: hidden;
  &.expanded {
    padding-bottom: 1.25rem;
    animation: expand-content 1.2s ease-in forwards;
  }
  .bodyCopy {
    margin: 1rem 0;
    font-size: 2rem;
    ul {
      padding-inline-start: 2rem;
    }
  }
  .subHead {
    font-size: 1.8rem;
    font-weight: 600;
  }
  .disclaimer {
    margin-bottom: 2rem;
    padding: 1.3rem;
    font-size: 1.5rem;
  }
  @include sm {
    max-height: 3rem;
  }
  @include md {
    max-height: 8rem;
  }
  @include lg {
    max-height: 37.5rem;
  }
}

.btn {
  background-color: var(--adunit-color-27);
  font-family: var(--marketplace-font-bold);
  color: var(--theme-font-color-readmore-button);
  cursor: pointer;
  text-align: center;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  padding: 0.75rem 0;
  position: absolute;
  outline: none;
  bottom: 0;
  &:not(.expanded) {
    &:before {
      content: "";
      background: linear-gradient(to bottom, rgba(243, 243, 243, 0), var(--theme-color-body));
      pointer-events: none;
      width: 100%;
      position: absolute;
      height: 10rem;
      top: 0;
      transform: translateY(-100%);
      z-index: 1;
    }
  }
  .arrow {
    position: relative;
    margin-left: 0.75rem;
    top: -0.475rem;
    transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
    transition-delay: 1s;
    transition-property: transform;
    &.arrowUp {
      top: 3px;
    }
    > span {
      border-color: var(--adunit-color-28);
    }
  }
}
</style>
