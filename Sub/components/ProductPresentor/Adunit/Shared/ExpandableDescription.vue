<template>
  <content :key="1" ref="content" :class="['ref-expandable-content', $style.content, expanded && $style.expanded]">
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
      v-if="scrollableContent && !expanded"
      v-ui:animate.onenter="'fadeIn delay-600ms'"
      tabindex="0"
      :class="[$style.btn, {[$style.expanded]:expanded}, 'u-display-hidden']"
      :aria-label="'Read more about ' + data.Title"
      @click="toggleAdunitContent"
    >
      MORE INFO
      <EcomArrow
        :class="[$style.arrow, expanded && $style.arrowUp]"
        :direction="expanded ? 'up' : 'down'"
        size="md"
      />
    </button>
  </content>
</template>

<script>
import EcomHtml from './Html.vue'

export default {
  name: 'EcomExpandableDescription',
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
    padding-bottom: 0.25rem;
    animation: expand-content 0.33s ease-in forwards;
  }
  .bodyCopy {
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  .disclaimer {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
  @include sm {
    max-height: 8rem;
  }
  @include md {
    max-height: 8.25rem;
  }
  @include lg {
    max-height: 37.5rem;
  }
}

.btn {
  background-color: var(--adunit-color-27);
  font-family: var(--adunit-font-2);
  color: var(--adunit-color-28);
  cursor: pointer;
  text-align: center;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  padding: 0.25rem 0;
  position: absolute;
  outline: none;
  bottom: 0;
  &:not(.expanded) {
    &:before {
      content: "";
      background-image: -webkit-linear-gradient(
        top,
        rgba(255, 255, 255, 0.001) 0%,
        var(--adunit-color-13) 92%,
        var(--adunit-color-13) 100%
      );
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
      top: -2px;
    }
    > span {
      border-color: var(--adunit-color-28);
    }
  }
}
</style>
