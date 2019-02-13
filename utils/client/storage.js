import Base from './base'

const Storage = {
  get: (key) => {
    try {
      return window.localStorage.getItem(key)
    } catch (e) {
      return false
    }
  },
  /*
  *  支持批量设置key为对象即可
  * */
  set: (key, value) => {
    try {
      if (Base.isObject(key)) {
        for (let k in key) {
          window.localStorage.setItem(k, key[k])
        }
      } else {
        window.localStorage.setItem(key, value)
      }
    } catch (e) {
      return false
    }
  },
  /*
  * 支持批量删除 key为数组即可
  * */
  remove: (key) => {
    try {
      if (Base.isArray(key)) {
        key.forEach((k) => {
          window.localStorage.removeItem(k)
        })
      } else {
        window.localStorage.removeItem(key)
      }
    } catch (e) {
      return false
    }
  }
}

export default Storage
