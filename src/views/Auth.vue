<template>
  <span>Loading...</span>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import TokenService, { OAUTH_NONCE_KEY } from '@/common/token.service'
import apiService from '@/common/api.service'
import { SET_ERROR, GET_USER, SET_TOKENS } from '@/store/modules/auth.module.js'

export default {
  mounted() {
    this.handleAuthoriseReturn()
  },

  methods: {
    async handleAuthoriseReturn() {
      const nonce = TokenService.getToken(OAUTH_NONCE_KEY)
      const urlParams = this.$route.query

      // Did Reddit send us back with an error, or is there no oauth code in the URL?
      if ('error' in urlParams || !('code' in urlParams)) {
        return this.setError(
          'There was a problem authorising your Reddit account.'
        )
      }

      // Does this response match our request nonce?
      if (nonce !== urlParams.state) {
        return this.setError(
          'There was a problem validating your return from Reddit.'
        )
      }

      let data = {
        code: urlParams.code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.VUE_APP_REDDIT_AUTH_RETURN_URL
      }

      let response = await apiService.authRequest('POST', '/access_token', data)

      if (!response || 'error' in response) {
        if ('error' in response) {
          console.error(response.error)
        }

        return this.setError(
          'There was an error finalising the handshake with Reddit.'
        )
      }

      const tokens = {
        accessToken: response['access_token'],
        refreshToken: response['refresh_token']
      }

      this.setTokens(tokens)

      // Finally get our user from the API, our watch above should redirect us if all is good
      this.getUser()
    },

    ...mapActions({
      getUser: GET_USER
    }),

    ...mapMutations({
      setTokens: SET_TOKENS,
      setError: SET_ERROR
    })
  }
}
</script>
