import Event from '../utils/client/event'
import axios from './axios'
/*
* addEventListener
* */
Event.add(window, 'error', function (event) {
  /*
  *  catch js css img font... file load error
  * */
  console.log('============addEventListener error=============')
  // let { filename, message, lineno, colno, error } = event
  OrganizeError(event.error)
}, true)

/*
*  vue error handle
* */
Event.add(window, 'load', function () {
  if (window.Vue || window.$nuxt) {
    ConsoleError()
  }
}, true)

const ConsoleError = () => {
  /*
  *  window console error
  * */
  let consoleError = window.console.error
  window.console.error = function () {
    /*
    * 1.TypeError: {
    *   message
    *   stack
    *  }
    * 2.String
    * */
    console.log('============console.log.error=============')
    OrganizeError(arguments[0])
    consoleError && consoleError.apply(this, arguments)
  }
}

const OrganizeError = (error) => {
  console.log(error)
  if (error && error.stack && error.message) {
    let info = error.stack.match(/\(([^)]*)\)/)[1]
    let nums = info.match(/\d+/g)
    let [lineNo, colNo] = [nums[nums.length - 2], nums[nums.length - 1]]
    let index = info.indexOf(`:${lineNo}`)
    let url = info.slice(0, index)
    axios({
      el: lineNo,
      ec: colNo,
      em: error.message,
      es: error.stack,
      eu: url,
      u: location.href
    }, 'e')
  }
}
