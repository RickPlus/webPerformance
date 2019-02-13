import Vue from 'vue'
// demo
const filters = {
  /**
   * 电话号码分割  138000138000 -> 138 0001 3800
   */
  mobileSplit: (m) => {
    return (m).replace(/(\d{3})(\d{4})/g, `$1 $2 `)
  },
  /*
  * formatDate
  * */
  formatDate: (date, format = 'YYYY-MM-DD', num = 0) => {
    if (!date) {
      return
    }
    switch (typeof date) {
      case 'string':
        if (date.includes('T') && date.endsWith('Z')) {
          date = new Date(date)
        } else if (isNaN(date - 0)) {
          date = new Date(date.replace(/-/g, '/'))
        } else {
          date = new Date(date - 0)
        }
        break
      case 'number':
        date = new Date(date)
        break
    }
    let newDate = date.getTime() + (num * 60 * 60 * 24 * 1000)
    newDate = new Date(newDate)
    if (!(date instanceof Date)) {
      return
    }
    if (!(newDate instanceof Date)) {
      return
    }
    let dict = {
      'YYYY': newDate.getFullYear(),
      'M': newDate.getMonth() + 1,
      'D': newDate.getDate(),
      'h': newDate.getHours(),
      'm': newDate.getMinutes(),
      's': newDate.getSeconds(),
      'MM': ('' + (newDate.getMonth() + 101)).substr(1),
      'DD': ('' + (newDate.getDate() + 100)).substr(1),
      'hh': ('' + (newDate.getHours() + 100)).substr(1),
      'mm': ('' + (newDate.getMinutes() + 100)).substr(1),
      'ss': ('' + (newDate.getSeconds() + 100)).substr(1)
    }
    return format.replace(/(YYYY|MM?|DD?|hh?|ss?|mm?)/g, function () {
      return dict[arguments[0]]
    })
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
