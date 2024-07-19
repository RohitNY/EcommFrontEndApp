<template>
  <nav v-if="links.length > 0" v-ui:responsive :class="theme">
    <ul>
      <template v-for="(link, index) in links">
        <li :key="link.LinkUrl">
          <a :href="link.LinkUrl" :target="link.Target">{{ link.LinkText }} </a>
        </li>
        <li
          v-if="parseInt(index) != Object.keys(links).length - 1"
          :key="index"
          class="divider"
          role="presentation"
        >
          |
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HeaderLinks',
  computed: {
    links () {
      return window.Spectrum.HeaderLinks
        ? window.Spectrum.HeaderLinks.Links
        : {}
    },
    theme () {
      return window.Spectrum.HeaderLinks
        ? window.Spectrum.HeaderLinks.Theme
        : {}
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background: #000;
  z-index: 1;
  position: relative;
  ul {
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: 0 auto;
    padding: 0;
    list-style-type: none;
    padding: 5px 0;
    li {
      color: #fff;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;

      a {
        color: #fff;
        text-transform: uppercase;
        font-size: 8px;
        display: block;
        text-decoration: none;
      }
    }
  }
}

@include md {
  nav ul {
    width: 50%;
  }
}

@include lg {
  nav ul {
    width: 40%;
  }
}
</style>
