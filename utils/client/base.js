const Base = {
  isType: (type) => {
    return (obj) => {
      return Object.prototype.toString.call(obj) === '[object ' + type + ']'
    }
  },
  isString: (t) => {
    return Base.isType('string')(t)
  },
  isArray: (t) => {
    return Base.isType('array')(t)
  },
  isObject: (t) => {
    return Base.isType('object')(t)
  }
}

export default Base
