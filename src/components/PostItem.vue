<template>
  <a :href="url" :title="title" target="_blank" rel="noopener noreferrer" class="post">
    <span v-if="media.embed" class="post__embed" v-html="media.embed"></span>
    <img v-if="media.image" class="post__image" :src="media.image">
  </a>
</template>

<script>
export default {
  props: {
    url: String,
    title: String,
    media: Object
  }
}
</script>

<style scoped lang="scss">
.post {
  display: block;
  overflow: hidden;
  position: relative;
  max-width: 25%;
  margin-bottom: 10px;
}

.post__image {
  display: block;
  max-width: 100%;
}

.post__embed {
  display: block;
  max-width: 100%;
  overflow: hidden;
}

.post__embed ::v-deep video {
  max-width: 100%;
  display: block;
}
</style>
