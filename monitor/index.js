import axios from 'axios'
import AgentInfo from '../utils/client/agent'
import Number from '../utils/client/number'
import Event from '../utils/client/event'

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

window.PERFORMANCE_MONITOR = window.PERFORMANCE_MONITOR ? Object.assign({}, window.PERFORMANCE_MONITOR, PERFORMANCE_MONITOR) : PERFORMANCE_MONITOR
Event.add('load', function () {
  window.PERFORMANCE_MONITOR.init()
  let { agentInfo, pageTime, resourceList } = window.PERFORMANCE_MONITOR
  window.PERFORMANCE_MONITOR_APPID && axios.post('/open/monitor', {
    a: window.PERFORMANCE_MONITOR_APPID,
    ai: agentInfo,
    pt: pageTime,
    rl: resourceList
  })
})
