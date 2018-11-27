import AgentInfo from '../utils/client/agent'

const PERFORMANCE_MONITOR = {
  agentInfo: AgentInfo.init(),
  init: function () {
    this.getPerformanceTime()
  },
  getPerformanceTime: function () {
    this.performanceTime = window.performance.getEntriesByType('navigation')[0]
    this.resourceTime = window.performance.getEntriesByType('resource')
    console.log(this)
  },
  getPageTime: function () {
    let { startTime, responseStart, loadEventEnd, domainLookupEnd, domainLookupStart, connectEnd, connectStart, domContentLoadedEventEnd, redirectEnd, redirectStart, responseEnd, domComplete } = this.performanceTime
    return {
      url: window.location.origin + window.location.pathname,
      load_time: loadEventEnd - startTime,
      white_time: responseStart - startTime,
      dns_time: domainLookupEnd - domainLookupStart,
      tcp_time: connectEnd - connectStart,
      dom_time: domContentLoadedEventEnd - startTime,
      redirect_time: redirectEnd - redirectStart,
      resource_time: responseEnd - responseStart,
      dom_ready_time: domComplete - startTime
    }
  },
  getResourceTime: function () {
    let time = this.resourceTime
    let arr = []
    time.forEach(function (item) {
      arr.push({

      })
    })
  }
}

window.PERFORMANCE_MONITOR = window.PERFORMANCE_MONITOR ? Object.assign({}, window.PERFORMANCE_MONITOR, PERFORMANCE_MONITOR) : PERFORMANCE_MONITOR
window.onload = function () {
  window.PERFORMANCE_MONITOR.init()
}
