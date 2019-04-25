import localStorage from './localstorage.service'

const ID_TOKEN_KEY = 'id_token'

export const getToken = () => {
  return localStorage.load(ID_TOKEN_KEY)
}

export const saveToken = token => {
  localStorage.save(ID_TOKEN_KEY, token)
}

export const destroyToken = () => {
  localStorage.delete(ID_TOKEN_KEY)
}

export default { getToken, saveToken, destroyToken }
