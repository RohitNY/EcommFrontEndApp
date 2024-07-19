<template>
  <form method="POST" class="g-w-100" novalidate @submit="$emit('on-submit')">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'EcomHttpPost'
}
</script>
