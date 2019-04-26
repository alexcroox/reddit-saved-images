import TokenService, { ACCESS_TOKEN_KEY } from '@/lib/token.service'

class Api {
  constructor() {
    this.authCode = btoa(`${process.env.VUE_APP_REDDIT_CLIENT_ID}:`)
  }

  // Oauth requests go to www.reddit.com with Basic Authorization and x-www-form-urlencoded
  async authRequest(method, path, data = {}) {
    let fetchHeaders = {
      Accept: 'application/json',
      Authorization: `Basic ${this.authCode}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    let fetchOptions = {
      method,
      headers: fetchHeaders
    }

    // Form data must be x-www-form-urlencoded
    let formData = this.prepFormData(data)

    if (formData) {
      fetchOptions.body = formData
    }

    try {
      let response = await fetch(
        process.env.VUE_APP_REDDIT_AUTH_API_BASE_URL + path,
        fetchOptions
      )

      if (!response.ok) {
        return false
      }

      let responseData = await response.json()

      return responseData
    } catch (error) {
      console.error('Error calling Auth API', error)
      return false
    }
  }

  // Normal requests for data go to oauth.reddit.com with a bearer token
  async request(method, path) {
    const accessToken = TokenService.getToken(ACCESS_TOKEN_KEY)

    if (!accessToken) {
      return false
    }

    let fetchHeaders = {
      Authorization: `bearer ${accessToken}`,
      Accept: 'application/json'
    }

    let response = await fetch(
      process.env.VUE_APP_REDDIT_REQUEST_API_BASE_URL + path,
      {
        method,
        headers: fetchHeaders
      }
    )

    // Unauthorized, we need to login again
    if (response.status === 401) {
      return false
    }

    if (!response.ok) return false

    let responseData = await response.json()

    return responseData
  }

  prepFormData(dataObject) {
    if (!Object.keys(dataObject).length) {
      return false
    }

    let formData = ''

    Object.keys(dataObject).forEach(key => {
      formData += `${encodeURIComponent(key)}=${encodeURIComponent(
        dataObject[key]
      )}&`
    })

    return formData
  }
}

export default new Api()
