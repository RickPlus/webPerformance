import axios from 'axios/index'

/*
* 目前为实时发送请求
* TODO 后续改为储存到客户端，积攒到一定数量或时间及unload的时候一次发送
* */

export default (data, type) => {
  axios.post('/open/monitor', { ...data, t: type, a: window.PERFORMANCE_MONITOR_APPID })
}
