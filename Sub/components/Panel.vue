<template>
  <div :class="$style.panel" @click="click" @keypress="keypress">
    <slot :expanded="expanded" />
    <slot name="title" />
    <slot name="body" />
  </div>
</template>

<script>
export default {
  name: 'EcomPanel',
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    toggle () {
      this.expanded = !this.expanded
    },
    click () {
      this.toggle()
    },
    keypress () {
      this.toggle()
    }
  }
}
</script>

<style lang="scss" module>
.panel {
  cursor: pointer;

  width: 100rem;
  max-width: 90%;
  border: 1px solid #707070;
  border-radius: 1.2rem;
  padding: 1.5rem 0;
  margin: 0.5rem 0;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
