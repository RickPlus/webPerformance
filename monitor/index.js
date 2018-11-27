import AgentInfo from '../utils/client/agent'

const PERFORMANCE_MONITOR = {
  agentInfo: AgentInfo.init(),
  init: function () {
    this.getPerformanceTime()
    this.getResourceTime()
    console.log(this)
  },
  getPerformanceTime: function () {
    this.performanceTime = window.performance.getEntriesByType('navigation')[0]
    this.resourceTime = window.performance.getEntriesByType('resource')
    this.getPageTime()
  },
  getPageTime: function () {
    let { startTime, responseStart, loadEventEnd, domainLookupEnd, domainLookupStart, connectEnd, connectStart, domContentLoadedEventEnd, redirectEnd, redirectStart, responseEnd, domComplete } = this.performanceTime
    this.pageTime = {
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
        duration: item.duration,
        tcp_time: item.connectEnd - item.connectStart,
        dns_time: item.domainLookupEnd - item.domainLookupStart,
        wait_ttfb_time: item.responseStart - item.requestStart,
        download_time: item.responseEnd - item.responseStart,
        block_time: item.requestStart - item.connectStart,
        size: item.transferSize,
        url: item.name,
        type: item.initiatorType
      })
    })
    this.resourceList = arr
  }
}

window.PERFORMANCE_MONITOR = window.PERFORMANCE_MONITOR ? Object.assign({}, window.PERFORMANCE_MONITOR, PERFORMANCE_MONITOR) : PERFORMANCE_MONITOR
window.onload = function () {
  window.PERFORMANCE_MONITOR.init()
}
