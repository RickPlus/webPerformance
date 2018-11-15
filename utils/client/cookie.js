const Cookie = {
  get: (name, cookie = document.cookie) => {
    let cookieValue = ''
    let search = name + '='
    if (cookie && cookie.length > 0) {
      let offset = cookie.indexOf(search)
      if (offset !== -1) {
        offset += search.length
        let end = cookie.indexOf(';', offset)
        if (end === -1) end = cookie.length
        cookieValue = decodeURIComponent(cookie.substring(offset, end))
      }
    }
    return cookieValue
  },
  /**
   *  set cookie in client
   */
  set: (name, value, options) => {
    /**
     * expire 单位为小时
     */
    let expire = `; expires=${24 * 3600000}`
    if (options && options.expire) {
      expire = new Date((new Date()).getTime() + options.expire * 3600000)
      expire = '; expires=' + expire.toGMTString()
    }
    let path = options && options.path ? '; path=' + options.path : '; path=/'
    // if (document && document.cookie) {
    // console.log(`${name}=${escape(value)}${expire}${path}`)
    document.cookie = `${name}=${escape(value)}${expire}${path}`
    // }
  },
  remove: (name) => {
    Cookie.set(name, '', {
      expire: -1,
      path: '/'
    })
  }
}

export default Cookie
