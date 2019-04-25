<template>
  <span>Loading...</span>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { START_AUTH } from '@/store/modules/auth.module.js'

export default {
  mounted() {
    console.log(this.$route.query)
  },
  methods: {
    ...mapActions({
      startAuth: START_AUTH
    })
  }
}
</script>
