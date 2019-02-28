export default {
  u: 'url',
  lt: 'load_time', // 加载时间
  wt: 'white_time', // 白屏时间
  dt: 'dns_time', // dns 解析时间
  tt: 'tcp_time', // tcp 握手时间
  dmt: 'dom_time', // dom 加载时间
  rdt: 'redirect_time', // 重定向时间
  rst: 'resource_time', // 资源加载时间
  drt: 'dom_ready_time', // dom ready 时间
  d: 'duration', // 总耗时
  ttfb: 'wait_ttfb_time', // 等待时间
  dlt: 'download_time', // 下载时间
  bt: 'block_time', // 堵塞时间
  s: 'size', // 大小
  t: 'type', // 类型
  dvt: 'device_type', // 设备类型
  on: 'os_name', // 系统名称
  bn: 'browser_name', // 浏览器名称
  bv: 'browser_version', // 浏览器版本
  // ajax
  ar: 'status', // ajax status
  as: 'size', // ajax size
  am: 'method', // ajax method
  ap: 'params', // ajax params
  au: 'request_url', // ajax url
  // error
  el: 'line_no', // line no
  ec: 'col_no', // col no
  em: 'message', // error message
  es: 'stack', // error stack
  eu: 'error_url' // error url
}
