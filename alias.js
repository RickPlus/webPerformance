// for webstorm
/*
*  settings -> Language & Frameworks -> Javascript -> webpack    choose this alias file
* */
const path = require('path')

module.exports = {
  resolve: {
    // for WebStorm
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname),
      '~assets': path.resolve(__dirname, 'assets'),
      '@server': path.join(__dirname, 'server'),
      '@models': path.join(__dirname, 'server/models'),
      '@controllers': path.join(__dirname, 'server/controllers'),
      '@config': path.join(__dirname, 'server/config'),
      '@repository': path.join(__dirname, 'server/repository'),
      '@utils': path.join(__dirname, 'utils')
    }
  }
}
