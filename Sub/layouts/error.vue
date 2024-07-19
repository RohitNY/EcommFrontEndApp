<template>
  <div :class="$style.container">
    <span v-if="isDev">
      <h1>An Error Occured [DEV ONLY]</h1>
      <pre>{{ error }}</pre>

      <p>This page is just a temporary placeholder. Redirecting in {{ wait }} seconds.</p>
      <p>You will be automatically redirected to the last known active page in your PathExperience.</p>
    </span>
    <span v-else />
  </div>
</template>

<script>
export default {
  name: 'NuxtError',
  layout: 'default', // optional
  props: {
    error: Object
  },
  data () {
    return {
      wait: 5
    }
  },
  computed: {
    isDev () {
      return process.env.dev
    }
  },
  mounted () {
    this.interval = setInterval(
      () => {
        const config = this.$store.getters['app/getBootstrapConfig']
        const [urlQuery, pageName] = this.$hopX.extractActivePage(config)

        if (this.wait === 1) {
          this.$router.push({ name: pageName, query: urlQuery })
        }

        this.wait = this.wait - 1
      },
      this.isDev ? 1000 : 1
    )
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" module>
.container {
  font-size: 2rem;
  p {
    margin: 2rem auto;
  }
}
</style>
