<template>
  <div v-if="slotProps" :aria-label="slotProps.header">
    <div :class="$style.header">
      {{ slotProps.header }}:
    </div>
    <div
      v-if="withAsterisk"
      :class="[$style.price, slotAttrs('price')]"
    >
      {{ slotProps.price | currency }}*
    </div>
    <div v-else :class="[$style.price, slotAttrs('price')]">
      {{ slotProps.price | currency }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcomPrice',
  filters: {
    currency (amt) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amt / 100)
    }
  },
  data () {
    return {
      withAsterisk: false
    }
  },
  computed: {
    slotAttrs () {
      return (slot) => {
        return this.$slots[slot][0]?.data?.attrs?.treatment
      }
    },
    slotProps () {
      return this.computeSlotProps()
    }
  },
  methods: {
    computeSlotProps () {
      const data = {}
      Object.keys(this.$slots).forEach((slot) => {
        data[slot] = this.$slots[slot][0]?.children[0]?.text
        if (data[slot].includes('*')) {
          this.withAsterisk = true
          data[slot] = data[slot].replace('*', '')
        }
      })
      return data
    }
  }
}
</script>

<style lang="scss" module>
.header {
  font-family: var(--adunit-font-5);
}
.price {
  font-size: 2.5rem;
}
</style>
