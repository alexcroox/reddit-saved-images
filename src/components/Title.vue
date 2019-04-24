<template>
  <h1 class="title">{{ msg }}</h1>
</template>

<script>
export default {
  name: "Title",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
.title {
  color: $bodyColor;
}
</style>
