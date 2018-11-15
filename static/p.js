var PERFORMANCE_MONITOR = {
  init: function () {
    this.getPerformanceTime();
  },
  getPerformanceTime: function () {
    this.performanceTime = window.performance.getEntriesByType('navigation')[0];
    this.resourceTime = window.performance.getEntriesByType('resource');
    console.log(this);
  },
  getPageTime: function () {
    var time = this.performanceTime;
    return {
      url: window.location.origin + window.location.pathname,
      load_time: time.loadEventEnd - time.startTime,
      white_time: time.responseStart - time.startTime,
      dns_time: time.domainLookupEnd - time.domainLookupStart,
      tcp_time: time.connectEnd - time.connectStart,
      dom_time: time.domContentLoadedEventEnd - time.startTime,
      redirect_time: time.redirectEnd - time.redirectStart,
      resource_time: time.responseEnd - time.responseStart,
      dom_ready_time: time.domComplete - time.startTime
    }
  },
  getResourceTime: function () {
    var time = this.resourceTime,
      arr = [];
    time.forEach(function (item) {
      arr.push({

      })
    })
  }
}

window.PERFORMANCE_MONITOR = window.PERFORMANCE_MONITOR ? Object.assign({}, window.PERFORMANCE_MONITOR, PERFORMANCE_MONITOR) : PERFORMANCE_MONITOR;
window.onload = function () {
  window.PERFORMANCE_MONITOR.init();
}
