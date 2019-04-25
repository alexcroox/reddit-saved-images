<template>
  <div>
    <heading-title>Reddit Saved Images</heading-title>
    <p>View all your Reddit saved image posts in a grid for easy reference</p>
    <v-button
      @click="startAuth"
      :loading="redirectingToReddit"
    >{{ redirectingToReddit ? 'Redirecting to reddit.com...' : 'Authorise with reddit.com' }}</v-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { START_AUTH } from '@/store/modules/auth.module.js'
import HeadingTitle from '@/components/HeadingTitle.vue'
import Button from '@/components/Button.vue'

export default {
  components: {
    HeadingTitle,
    'v-button': Button
  },

  computed: {
    ...mapState({
      redirectingToReddit: state => state.auth.redirecting
    })
  },

  methods: {
    ...mapActions({
      startAuth: START_AUTH
    })
  }
}
</script>
