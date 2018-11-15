import qs from 'qs'

const methods = ['delete', 'get', 'head', 'options', 'post', 'postQs', 'put', 'patch']

export default ({ $axios, redirect, req, store, route }) => {
  // request拦截
  $axios.interceptors.request.use(
    config => {
      if (store.state.auth.token) {
        config.headers.authorization = `Bearer ${store.state.auth.token}`
      }
      config.timeout = 10000
      return config
    }
  )
  // response 拦截
  $axios.interceptors.response.use(
    res => {
      let data = res.data
      process.server && console.info(`【${new Date().toLocaleString()}】【result】-> ${JSON.stringify(data)}`)
      if (data && data.code === -1) {
        store.commit('auth/SET_TOKEN', '')
        process.server && redirect(`/login?r=${route.fullPath}`)
        process.browser && store.$router.push({
          name: 'login',
          query: {
            r: route.fullPath
          }
        })
        return false
      }
      return data
    },
    error => {
      if (error) {
        console.log(`【axios error】->${error}`)
      }
    }
  )
  // 添加log
  $axios.onRequest(config => {
    if (process.server) {
      console.log(`【${new Date().toLocaleString()}】【${config.method}】->${config.url}, data: ${JSON.stringify(config.params || config.data || {})}`)
    }
  })

  $axios.onError(error => {
    console.info(`【error】-> axios error ${error.response && error.response.status}`)
  })
  // 覆写并增加postQs方法
  for (let method of methods) {
    $axios[method] = (url, data) => {
      let isPostQs = method === 'postQs'
      let opt = {
        method: isPostQs ? 'post' : method,
        url
      }
      opt[method === 'get' ? 'params' : 'data'] = isPostQs ? qs.stringify(data) : data

      if (isPostQs) {
        opt.header = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      return $axios(opt)
    }
  }
}
