<template>
  <h1 class="title">
    <slot></slot>
  </h1>
</template>

<script>
export default {
  name: 'Title'
}
</script>

<style scoped lang="scss">
.title {
  color: $bodyColor;
}
</style>
