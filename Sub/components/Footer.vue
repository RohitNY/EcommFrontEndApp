<template>
  <footer :class="$style.footer">
    <EcomPanel
      v-for="disclosure in disclosures"
      :key="disclosure.Id"
      v-slot="{expanded}"
      tabindex="0"
      :class="$style.panel"
    >
      <EcomArrow
        :class="[$style.arrow, expanded && $style.arrowUp]"
        :direction="expanded ? 'up' : 'down'"
        size="md"
      />
      <!-- eslint-disable vue/no-v-html -->
      <h3 slot="title" :class="$style.title" v-html="disclosure.Title" />
      <transition slot="body" name="fade">
        <section v-show="expanded" :class="$style.body" v-html="disclosure.Body" />
      </transition>
    </EcomPanel>
    <div id="PchLegalStaticDisclosurePlaceholder" class="legal-static-copy" />
    <section :class="$style.legal">
      <a target="_blank" :href="links.DoNotSell">Do Not Sell My Info</a>
      <br>PCH’s
      <a target="_blank" :href="links.TermsOfUse">Terms of Use</a>
      <a target="_blank" :href="links.AdPrefs">Ad Preferences</a>
      <br>
      <br>
      © {{ year }} Publishers Clearing House
    </section>
  </footer>
</template>

<script>
import EcomPanel from '~/components/Panel.vue'
export default {
  components: {
    EcomPanel
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    disclosures () {
      return window.Spectrum.LegalDisclosures || []
    },
    links () {
      return window.Spectrum.FooterLinks || {}
    }
  }
}
</script>

<style lang="scss" module>
.footer {
  text-align: center;
  margin: 2rem auto 0;
  padding: 4rem 0 7rem;
  background: #c5cac9;
  color: #707070;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;

  @include md {
    padding: 4rem 0 14rem;
  }
}

/* panel */
.panel {
  position: relative;
  .arrow > span {
    border-color: #707070;
    position: absolute;
    right: 2rem;
    top: 13px;
    &.arrowUp {
      top: 16px;
    }
  }
  @include sm {
    h3 {
      font-size: 1.375rem;
      width: 22rem;
    }
  }
  @include xs {
    h3 {
      font-size: 1.3rem;
      width: 17rem;
    }
  }
}

.title {
  font: 700 1.5rem/1.5rem Helvetica;
}

.body {
  font: Normal 1.5rem/1.5rem Helvetica;
  padding: 1rem;
}

/* legal text */
.legal {
  margin-top: 3rem;
  font: Regular 1.4rem/1.7rem Helvetica;
  a {
    color: #707070;
  }
}
</style>

<style lang="scss">
/* temp solution to not require a device
  for legal copy */
#PchLegalStaticDisclosure {
  display: none !important;
}

.legal-static-copy {
  font-size: 1.2rem;
  padding: 1rem;
  width: 87%;
  max-width: 95rem;
  text-align: center;
  line-height: 1.9rem;
  color: #707070;
  margin: 0 auto;
  p {
    padding: 0.375rem 0;
  }
  p a {
    color: #707070;
  }
}
</style>
