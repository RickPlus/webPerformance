import axios from 'axios'
import AgentInfo from '../utils/client/agent'
import Number from '../utils/client/number'
import Event from '../utils/client/event'

/*
* record agentInfo、pageTimeInfo、resourceTimeInfo
* */
const PERFORMANCE_MONITOR = {
  agentInfo: AgentInfo.init(),
  init: function () {
    this.getPerformanceTime()
    this.getResourceTime()
  },
  getPerformanceTime: function () {
    this.performanceTime = window.performance.timing
    this.resourceTime = window.performance.getEntriesByType('resource')
    this.getPageTime()
  },
  getPageTime: function () {
    let { navigationStart, responseStart, fetchStart, domainLookupEnd, domainLookupStart, connectEnd, connectStart, domLoading, redirectEnd, redirectStart, responseEnd, domComplete } = this.performanceTime
    this.pageTime = {
      u: window.location.origin + window.location.pathname,
      lt: Number.toDecimal2(domComplete - fetchStart),
      wt: Number.toDecimal2(responseStart - navigationStart),
      dt: Number.toDecimal2(domainLookupEnd - domainLookupStart),
      tt: Number.toDecimal2(connectEnd - connectStart),
      dmt: Number.toDecimal2(domComplete - domLoading),
      rdt: Number.toDecimal2(redirectEnd - redirectStart),
      rst: Number.toDecimal2(responseEnd - responseStart),
      drt: Number.toDecimal2(domComplete - navigationStart)
    }
  },
  getResourceTime: function () {
    let time = this.resourceTime
    let arr = []
    time.forEach(function (item) {
      arr.push({
        d: Number.toDecimal2(item.duration),
        tt: Number.toDecimal2(item.connectEnd - item.connectStart),
        dt: Number.toDecimal2(item.domainLookupEnd - item.domainLookupStart),
        ttfb: Number.toDecimal2(item.responseStart - item.requestStart),
        dlt: Number.toDecimal2(item.responseEnd - item.responseStart),
        bt: Number.toDecimal2(item.requestStart - item.connectStart),
        s: Number.toDecimal2(item.transferSize / 1000),
        u: item.name,
        t: item.initiatorType
      })
    })
    this.resourceList = arr
  }
}

/*
* add callbacks for XMLHttpRequest send
* */
const XML_REQUEST_CALLBACK = (cb) => {
  let XMLHttpRequest = window.XMLHttpRequest
  if (XMLHttpRequest.callbacks) {
    XMLHttpRequest.callbacks.push(cb)
  } else {
    XMLHttpRequest.callbacks = [cb]
    let oldSend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function () {
      let self = this
      self.ajaxStartTime = +new Date()
      oldSend.apply(self, arguments)
      let inter = setInterval(() => {
        if (self.readyState === 4 && self.status === 200) {
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

window.PERFORMANCE_MONITOR = window.PERFORMANCE_MONITOR ? Object.assign({}, window.PERFORMANCE_MONITOR, PERFORMANCE_MONITOR) : PERFORMANCE_MONITOR

XML_REQUEST_CALLBACK(function (xhr) {
  if (!xhr.responseURL.includes('/open/monitor')) {
    request({
      as: xhr.getResponseHeader('Content-Length') / 1000,
      at: xhr.ajaxEndTime - xhr.ajaxStartTime,
      au: xhr.responseURL
    }, 'a')
  }
})

Event.add('load', function () {
  window.PERFORMANCE_MONITOR.init()
  let { agentInfo, pageTime, resourceList } = window.PERFORMANCE_MONITOR
  window.PERFORMANCE_MONITOR_APPID && request({
    ai: agentInfo,
    pt: pageTime,
    rl: resourceList
  }, 'p')
})

/*
* 目前为实时发送请求
* TODO 后续改为储存到客户端，积攒到一定数量或时间及unload的时候一次发送
* */
let request = (data, type) => {
  axios.post('/open/monitor', { ...data, t: type, a: window.PERFORMANCE_MONITOR_APPID })
}
