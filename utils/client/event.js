const Event = {
  add: function (node = window, name, fn, stage = false) {
    if (node.addEventListener) {
      node.addEventListener(name, fn, stage)
    } else if (node.attachEvent) {
      node.attachEvent(`on${name}`, fn)
    } else {
      node[`on${name}`] = fn
    }
  },
  remove: function (node, name, fn, stage = false) {
    if (node.removeEventListener) {
      node.removeEventListener(name, fn, stage)
    } else if (node.detachEvent) {
      node.detachEvent(`on${name}`, fn)
    } else {
      delete node[`on${name}`]
    }
  }
}

export default Event
