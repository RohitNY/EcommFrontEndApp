<script>
import ContinueUi from './ContinueUi.vue'
import SubmitUi from './SubmitUi.vue'

export default {
  name: 'EcomButtonUiModule',
  functional: true,
  props: {
    buttons: Array
  },
  render (h, ctx) {
    return (ctx.props.buttons.map((button) => {
      const { Component, ...data } = button
      const VueComponent = Component === 'SubmitUi' ? SubmitUi : ContinueUi
      return h(VueComponent, {
        props: {
          data
        }
      })
    }))
  }
}
</script>
