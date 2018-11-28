const AgentInfo = {
  dvt: '',
  on: '',
  bn: '',
  bv: '',
  init: function () {
    this.setDeviceAndOS()
    this.setBrowser()
    return this
  },
  setDeviceAndOS: function () {
    let userAgent = window.navigator.userAgent
    let name = 'unknown'
    if (userAgent.includes('Android')) {
      name = 'Android'
    } else if (userAgent.includes('iPhone')) {
      name = 'iPhone'
    } else if (userAgent.includes('SymbianOS')) {
      name = 'SymbianOS'
    } else if (userAgent.includes('Windows Phone')) {
      name = 'Windows Phone'
    } else if (userAgent.includes('iPad')) {
      name = 'iPad'
    } else if (userAgent.includes('iPod')) {
      name = 'iPod'
    }
    if (name !== 'unknown') {
      this.on = name
      this.dvt = 'mobile'
      return false
    }

    if (userAgent.includes('Windows NT 10.0')) {
      name = 'Windows 10'
    } else if (userAgent.includes('Windows NT 6.2')) {
      name = 'Windows 8'
    } else if (userAgent.includes('Windows NT 6.1')) {
      name = 'Windows 7'
    } else if (userAgent.includes('Windows NT 6.0')) {
      name = 'Windows Vista'
    } else if (userAgent.includes('Windows NT 5.1')) {
      name = 'Windows XP'
    } else if (userAgent.includes('Windows NT 5.0')) {
      name = 'Windows 2000'
    } else if (userAgent.includes('Mac')) {
      name = 'Mac/IOS'
    } else if (userAgent.includes('X11')) {
      name = 'UNIX'
    } else if (userAgent.includes('Linux')) {
      name = 'Linux'
    }

    this.on = name
    this.dvt = 'pc'
  },
  setBrowser: function () {
    let re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
    let m = window.navigator.userAgent.toLowerCase().match(re)
    this.bn = m[1].replace(/version/, "'safari")
    this.bv = m[2]
  }
}

export default AgentInfo
