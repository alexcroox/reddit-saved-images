<template>
  <button @click="$emit('click')" class="button" :class="{ 'button--loading': loading }">
    <slot>Submit</slot>
  </button>
</template>

<script>
export default {
  props: {
    loading: Boolean
  }
}
</script>

<style scoped lang="scss">
.button {
  display: inline-block;
  padding: 4px 10px;
  margin-bottom: 0;
  line-height: 1.4;
  font-size: 12px;
  letter-spacing: 0.03em;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 3px;
  position: relative;
  z-index: 1;
  background-color: #0052cc;
  color: #fff;
}

.button:hover {
  cursor: pointer;
  background-color: #0065ff;
}

.button--loading {
  background-color: #ebecf0;
  color: #999;

  &:hover {
    cursor: not-allowed;
    background-color: #ebecf0;
  }
}
</style>
