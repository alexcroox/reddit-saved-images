<template>
  <div>
    <v-app-bar color="teal" dark>
      <v-toolbar-title>Reddit Saved Images</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        color="teal lighten-2"
        class="mr-4"
        href="https://github.com/alexcroox/reddit-saved-images"
        target="_blank"
        rel="noopener noreferrer"
      >Github</v-btn>

      <v-btn color="teal lighten-1" @click="logout">Logout</v-btn>
    </v-app-bar>

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

    <v-layout
      class="mt-5"
      v-if="posts.length === 0 && fetching"
      align-content-center
      justify-center
      wrap
    >
      <v-flex xs12 subtitle-1 text-xs-center>Getting your saved posts</v-flex>
      <v-flex xs2>
        <v-progress-linear color="teal" indeterminate rounded height="6"></v-progress-linear>
      </v-flex>
    </v-layout>

    <v-alert
      v-if="posts.length === 0 && !fetching"
      type="error"
      class="mt-4"
    >You have no saved image posts currently</v-alert>
  </div>
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
      posts: state => state.posts.list,
      fetching: state => state.posts.fetching
    })
  },

  methods: {
    async loadPosts() {
      // Do we already have posts from local storage? Let's re-arrange them
      if (this.posts.length > 0) {
        console.log('Displaying existing local posts')
        setTimeout(this.$redrawVueMasonry, 200)
      }

      let postLoader = await this.fetchPosts(this.username)

      if (!postLoader) {
        this.logout()
      } else {
        setTimeout(this.$redrawVueMasonry, 1000)
      }
    },

    logout() {
      this.$store.dispatch(LOGOUT)
      this.$router.push('/setup')
    },

    ...mapActions({
      fetchPosts: FETCH_POSTS
    })
  }
}
</script>
