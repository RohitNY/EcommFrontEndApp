<script>
export default {
  name: 'EcomHtml',
  props: {
    prop: String,
    label: String,
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    html () {
      const key = this.prop || this.label.replace(/\s/g, '')
      return this.$slots.default
        ? this.$slots.default[0].text
        : this.$parent.data[key]
    }
  },
  render (h) {
    return h(this.tag, {
      attrs: {
        // tabindex: '0',
        'aria-label': this.label
      },
      domProps: {
        innerHTML: this.html
      }
    })
  }
}
</script>
