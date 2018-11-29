const Event = {
  add: function (name, fn) {
    if (window.addEventListener) {
      window.addEventListener(name, fn, false)
    } else if (window.attachEvent) {
      window.attachEvent(`on${name}`, fn)
    } else {
      window[`on${name}`] = fn
    }
  },
  remove: function (name, fn) {
    if (window.removeEventListener) {
      window.removeEventListener(name, fn, false)
    } else if (window.detachEvent) {
      window.detachEvent(`on${name}`, fn)
    } else {
      delete window[`on${name}`]
    }
  }
}

export default Event
