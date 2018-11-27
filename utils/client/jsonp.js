import JsonP from 'jsonp'

const jsonp = (url = '', data = {}, opts = { param: 'callback' }, fn = null) => {
  let query = ''
  if (typeof opts === 'function') {
    fn = opts
    opts = data
  } else {
    query = url.indexOf('?') === -1 ? '?' : '&'
    query += Object
      .keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&')
  }
  return JsonP(`${url}${query}`, opts, fn)
}

export default jsonp
