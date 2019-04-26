<template>
  <v-layout column justify-center align-center fill-height>
    <h1 class="display-3">Reddit Saved Images</h1>

    <p class="mt-4 mb-5">View all your Reddit saved image posts in a grid for easy reference</p>

    <v-btn
      @click="startAuth"
      color="primary"
      :loading="redirectingToReddit"
      :disabled="redirectingToReddit"
    >{{ redirectingToReddit ? 'Redirecting to reddit.com...' : 'Connect with reddit.com' }}</v-btn>

    <p class="mt-5">
      This app runs entirely in your browser, there is no server to send data to.
      <br>Your Reddit access token will remain only in your browser
    </p>

    <p class="mt-5">
      This app is entirely
      <a
        href="https://github.com/alexcroox/reddit-saved-images"
        target="_blank"
        rel="noopener noreferrer"
      >open source</a>
    </p>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { START_AUTH } from '@/store/modules/auth.module.js'

export default {
  computed: {
    ...mapState({
      redirectingToReddit: state => state.auth.loading
    })
  },

  methods: {
    ...mapActions({
      startAuth: START_AUTH
    })
  }
}
</script>
