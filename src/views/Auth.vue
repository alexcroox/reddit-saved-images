<template>
  <v-layout column justify-center align-center fill-height>
    <span v-if="loading">Loading...</span>
    <div v-else>
      <h1 class="display-1">Failed to connect to your Reddit account</h1>
      <v-alert type="error" class="mt-4">{{ error }}</v-alert>
      <p>
        Would you like to
        <router-link to="/setup">Try again?</router-link>
      </p>
    </div>
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import TokenService, { OAUTH_NONCE_KEY } from '@/lib/token.service'
import apiService from '@/lib/api.service'
import {
  SET_ERROR,
  GET_USER,
  SET_TOKENS,
  SET_LOADING
} from '@/store/modules/auth.module.js'

export default {
  mounted() {
    this.handleAuthoriseReturn()
  },

  computed: {
    ...mapState({
      loading: state => state.auth.loading,
      error: state => state.auth.error,
      username: state => state.auth.username
    })
  },

  watch: {
    username: function(name) {
      if (typeof name === 'string') {
        this.$router.push('/')
      }
    }
  },

  methods: {
    async handleAuthoriseReturn() {
      this.setLoading(true)

      try {
        const nonce = TokenService.getToken(OAUTH_NONCE_KEY)
        const urlParams = this.$route.query

        // Did Reddit send us back with an error, or is there no oauth code in the URL?
        if ('error' in urlParams || !('code' in urlParams)) {
          throw new Error(
            'There was a problem authorising your Reddit account.'
          )
        }

        // Does this response match our request nonce?
        if (nonce !== urlParams.state) {
          throw new Error(
            'There was a problem validating your return from Reddit.'
          )
        }

        let data = {
          code: urlParams.code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.VUE_APP_REDDIT_AUTH_RETURN_URL
        }
        let response = await apiService.authRequest(
          'POST',
          '/access_token',
          data
        )

        if (!response || 'error' in response) {
          if (response && 'error' in response) {
            console.error(response.error)
          }

          throw new Error(
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
      } catch (error) {
        //console.error(error)

        this.setLoading(false)
        return this.setError(
          'There was an error finalising the handshake with Reddit.'
        )
      }
    },

    ...mapActions({
      getUser: GET_USER
    }),

    ...mapMutations({
      setTokens: SET_TOKENS,
      setError: SET_ERROR,
      setLoading: SET_LOADING
    })
  }
}
</script>
