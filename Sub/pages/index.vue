<template>
  <div :class="$style.container">
    <EcomPCHLogo :class="$style.logo" />
    <span :class="$style.loading">loading...</span>
  </div>
</template>

<script>
import isEqual from 'lodash/isEqual'

export default {
  computed: {
    setup () {
      return this.$store.getters['app/getBootstrapConfig']
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.query.redirect) {
      next()
    } else if (to.name === 'index' && from.name === 'shop') {
      location.href = window.Spectrum.ReferrerUrl
    } else {
      next()
    }
  },
  mounted () {
    /* slug is determined by the config fetched from the server */
    const config = this.setup
    const [urlQuery, pageName] = this.$hopX.extractActivePage(config)

    /* if the requested route does not match the slug, we want to push the user
    to the slug determined by the server config because the slug is the tn
    we want the user to see next
    */
    const pushActivePage =
      this.$route.name !== pageName || !isEqual(this.$route.query, urlQuery)

    if (pushActivePage) {
      this.$router.push({ name: pageName, query: urlQuery })
    }
  },
  head () {
    return {
      title: 'PCH Shopping'
    }
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.logo {
  width: 100px;
}
.loading {
  margin-top: 3rem;
  opacity: 0.5;
}
</style>
