<template>
  <div :class="['smlt-view', 'ref-shopping-body']">
    <transition name="transitions-fade">
      <article v-if="showProducts">
        <section :class="$parent.$parent.$style.pageBgImgMinHeight" />
        <EcomDefaultShopping :page-data="{ Items: items }" />
        <EcomButton :class="[$style.button]" @click="$router.go(-1)">
          CONTINUE
          <EcomArrow :class="$style.arrow" direction="right" size="lg" />
        </EcomButton>
        <p :class="$style.legal">
          NO PURCHASE OR FEE NECESSARY TO ENTER.
          <br>A PURCHASE WON’T IMPROVE AN INDIVIDUAL’S CHANCE OF WINNING.
        </p>
      </article>
    </transition>
  </div>
</template>

<script>
export default {
  layout: 'lightbox',
  asyncData ({ app, route, redirect, store }) {
    const storeSmlt = store.getters['smlt/getItemById'](route.query.id)
    const smlt = storeSmlt ? storeSmlt[1] : null

    if (!smlt || !smlt.Items || smlt.Items.length === 0) {
      redirect('/?redirect=true&tn=' + route.query.tn)
    } else {
      return {
        showProducts: false, // params.id,
        items: smlt.Items,
        meta: smlt
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.showProducts = true
    }, 167)
  },
  beforeRouteLeave (to, from, next) {
    setTimeout(next, 337)
  },
  head () {
    return {
      title: `Shop › Similar Products of ${this.meta.Title} – PCH`
    }
  }
}
</script>

<style lang="scss" module>
.button {
  margin: 12rem auto 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  .ecomButtonStyle {
    background-color: var(--app-color-orange);
    font-family: var(--app-font-bold);
    max-width: calc(100% - 2rem);
    letter-spacing: -0.125rem;
    border-radius: 3rem;
    color: #ffffff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
    @include sm {
      font-size: 2rem;
      line-height: 2.5rem;
      min-width: 30rem;
      padding: 0 4rem;
      min-height: 10rem;
    }
    @include md {
      font-size: 3.5rem;
      line-height: 4rem;
      padding: 0 6rem;
      min-width: 40rem;
      min-height: 14rem;
    }
    @include lg {
      font-size: 4rem;
      line-height: 4.5rem;
    }
  }
  .arrow > span {
    border-width: 0 0.6rem 0.6rem 0;
    padding: 1.2rem;
    @include sm {
      display: none;
    }
  }
}
.legal {
  font-family: var(--app-font-bold);
  text-align: center;
  font-size: 1.222rem;
  line-height: 1.555rem;
  color: #ffffff;
  padding: 1rem 0 3.5rem;
  max-width: 94%;
  display: block;
  margin: 0 auto;
}
</style>

<style lang="scss">
.smlt-view {
  background: rgba(0, 0, 0, 0.71762);
  width: 100vw;
  max-width: 100%; /* required for MS Windows Browsers */
  min-height: 100vh;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  padding-top: 1.998rem;
  padding-bottom: 8.998rem;
  margin-bottom: -8.998rem;

  &__adunit {
    margin-bottom: 6rem;
    max-width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
