/*
* add callbacks for XMLHttpRequest send
* */
import axios from './axios'

const XML_REQUEST_OPEN_CALLBACK = () => {
  let oldOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function () {
    this.requestMethod = arguments[0]
    this.requestUrl = arguments[1]
    oldOpen.apply(this, arguments)
  }
}

const XML_REQUEST_SEND_CALLBACK = (cb) => {
  let XMLHttpRequest = window.XMLHttpRequest
  if (XMLHttpRequest.callbacks) {
    XMLHttpRequest.callbacks.push(cb)
  } else {
    XMLHttpRequest.callbacks = [cb]
    let oldSend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function () {
      let params = arguments[0]
      let self = this
      self.params = params || ''
      self.ajaxStartTime = +new Date()
      oldSend.apply(self, arguments)
      let inter = setInterval(() => {
        if (self.readyState === 4) {
          self.ajaxEndTime = +new Date()
          clearInterval(inter)
          for (let i = 0; i < XMLHttpRequest.callbacks.length; i++) {
            XMLHttpRequest.callbacks[i](self)
          }
        }
      }, 1)
    }
  }
}

XML_REQUEST_OPEN_CALLBACK()

XML_REQUEST_SEND_CALLBACK(function (xhr) {
  if (!(xhr.requestUrl.includes('/open/monitor')) && !(xhr.requestUrl.includes('_nuxt'))) {
    axios({
      ap: xhr.params,
      ar: xhr.status,
      am: xhr.requestMethod,
      as: xhr.getResponseHeader('Content-Length') / 1000,
      d: xhr.ajaxEndTime - xhr.ajaxStartTime,
      au: xhr.requestUrl,
      u: location.href
    }, 'a')
  }
})
