<template>
  <v-container>
    <div
      v-if="posts.length > 0"
      v-masonry
      transition-duration="0.3s"
      fit-width="true"
      gutter="10"
      item-selector=".post"
    >
      <post-item
        v-masonry-tile
        v-for="post in posts"
        :key="post.id"
        class="post"
        :url="post.url"
        :title="post.title"
        :media="post.media"
      />
    </div>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { VueMasonryPlugin } from 'vue-masonry'
import { mapState, mapActions } from 'vuex'
import { LOGOUT } from '@/store/modules/auth.module.js'
import { FETCH_POSTS } from '@/store/modules/posts.module.js'
import PostItem from '@/components/PostItem.vue'

Vue.use(VueMasonryPlugin)

export default {
  components: {
    PostItem
  },

  mounted() {
    this.loadPosts()
  },

  computed: {
    ...mapState({
      username: state => state.auth.username,
      posts: state => state.posts.list
    })
  },

  methods: {
    async loadPosts() {
      // Do we already have posts from local storage? Let's re-arrange them
      if (this.posts.length > 0) {
        setTimeout(this.$redrawVueMasonry, 200)
      }

      let postLoader = await this.fetchPosts(this.username)

      if (!postLoader) {
        this.$store.dispatch(LOGOUT)
        this.$router.push('/setup')
      } else {
        this.$redrawVueMasonry()
      }
    },

    ...mapActions({
      fetchPosts: FETCH_POSTS
    })
  }
}
</script>
