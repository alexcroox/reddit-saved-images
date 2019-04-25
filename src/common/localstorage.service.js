class LocalStorage {
  constructor() {
    this.store = window.localStorage
  }

  save(key, value) {
    this.store.setItem(key, value)
  }

  load(key) {
    return this.store.getItem(key)
  }

  delete(key) {
    return this.store.removeItem(key)
  }

  deleteAll() {
    this.store.clear()
  }
}

export default new LocalStorage()
