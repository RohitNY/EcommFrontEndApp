<template>
  <transition
    :leave-class="$style.hide"
    :leave-active-class="$style.hide"
    :leave-to-class="$style.hide"
    name="transitions-fade-fast"
    mode="out-in"
  >
    <div
      v-if="getComponent"
      :key="getComponent"
      :class="$style.modal"
      @click.self="closeModal"
      @dblclick.self="closeModal"
    >
      <component :is="getComponent" />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('modal', ['getComponent'])
  },
  watch: {
    getComponent (open) {
      const shoppingBody = document.querySelector('.ref-shopping-body')
      if (!shoppingBody) {
        return
      }

      const method = open ? 'add' : 'remove'
      shoppingBody.classList[method]('g-filter-blur')
      document.body.classList[method]('g-no-scroll') // TODO: fix iOS scroll issue

      /* modal open/close analytics */
      const activeModal =
        open || this.$store.getters['modal/getLastActiveComponent']
      switch (activeModal) {
        case 'EcomModalMiniCart':
          if (method === 'add') {
            // /* open */ AnalyticEvent('onCartModalOpen')
          }
          if (method === 'remove') {
            // /* close */ AnalyticEvent('onMiniCartModalClose')
            this.$store.dispatch('cart/uiNoticesClear')
          }
          break
        default:
          break
      }
    }
  },
  mounted () {
    const _this = this
    window.onpopstate = function (e) {
      if (_this.getComponent) {
        // TODO: log every saved instance of a user attempting
        //    || to close a modal with BACK btn
        _this.$store.dispatch('modal/close')
        e.stopImmediatePropagation()
        e.preventDefault()
        history.go(1)
      }
    }
  },
  methods: {
    closeModal (event) {
      switch (this.getComponent) {
        case 'EcomModalMediaViewer':
          /* do not close if single click */
          if (event.type !== 'dblclick') {
            break
          }
        // eslint-disable-next-line no-fallthrough
        default:
          this.$store.dispatch('modal/close')
          break
      }
    }
  }
}
</script>

<style lang="scss" module>
.hide {
  opacity: 0;
  visibility: hidden;
}
.modal {
  position: fixed;
  width: 100vw;
  max-width: 100%; /* required for MS Windows Browsers */
  height: 100vh;
  background-color: rgba(33, 33, 33, 0.627);
  z-index: 6;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 0 #333333;
  > div {
    border: 2px solid rgba(255, 255, 255, 0.1911);
  }
}
</style>

<style lang="scss">
.s-modal-close-x {
  width: 1.477rem;
  height: 1.477rem;
  cursor: pointer;
  &.fixed-right {
    position: absolute;
    right: 1.375rem;
    bottom: 1.65rem;
  }
}
</style>
