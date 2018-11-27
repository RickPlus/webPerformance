const AgentInfo = {
  deviceType: '',
  osName: '',
  browserName: '',
  browserVersion: '',
  userAgent: window.navigator.userAgent,
  init: function () {
    this.setDeviceAndOS()
    this.setBrowser()
    return this
  },
  setDeviceAndOS: function () {
    let name = 'unknown'
    if (this.userAgent.includes('Android')) {
      name = 'Android'
    } else if (this.userAgent.includes('iPhone')) {
      name = 'iPhone'
    } else if (this.userAgent.includes('SymbianOS')) {
      name = 'SymbianOS'
    } else if (this.userAgent.includes('Windows Phone')) {
      name = 'Windows Phone'
    } else if (this.userAgent.includes('iPad')) {
      name = 'iPad'
    } else if (this.userAgent.includes('iPod')) {
      name = 'iPod'
    }
    if (name !== 'unknown') {
      this.osName = name
      this.deviceType = 'mobile'
      return false
    }

    if (this.userAgent.includes('Windows NT 10.0')) {
      name = 'Windows 10'
    } else if (this.userAgent.includes('Windows NT 6.2')) {
      name = 'Windows 8'
    } else if (this.userAgent.includes('Windows NT 6.1')) {
      name = 'Windows 7'
    } else if (this.userAgent.includes('Windows NT 6.0')) {
      name = 'Windows Vista'
    } else if (this.userAgent.includes('Windows NT 5.1')) {
      name = 'Windows XP'
    } else if (this.userAgent.includes('Windows NT 5.0')) {
      name = 'Windows 2000'
    } else if (this.userAgent.includes('Mac')) {
      name = 'Mac/IOS'
    } else if (this.userAgent.includes('X11')) {
      name = 'UNIX'
    } else if (this.userAgent.includes('Linux')) {
      name = 'Linux'
    }

    this.osName = name
    this.deviceType = 'pc'
  },
  setBrowser: function () {
    let re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
    let m = this.userAgent.toLowerCase().match(re)
    this.browserName = m[1].replace(/version/, "'safari")
    this.browserVersion = m[2]
  }
}

export default AgentInfo
