import localStorage from './localstorage.service'

export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'
export const OAUTH_NONCE_KEY = 'oauth_nonce'

// Check the local storage key is valid and prevent accidental deletion of other items
const isKeyValid = key => {
  let validKeys = [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, OAUTH_NONCE_KEY]
  return validKeys.includes(key) ? true : false
}

export const getToken = key => {
  if (!isKeyValid(key)) {
    return false
  }

  return localStorage.load(key)
}

export const saveToken = (key, value) => {
  if (!isKeyValid(key)) {
    return false
  }

  localStorage.save(key, value)
}

export const destroyToken = key => {
  if (!isKeyValid(key)) {
    return false
  }

  localStorage.delete(key)
}
export default { getToken, saveToken, destroyToken }
