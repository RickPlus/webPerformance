const path = require('path')

module.exports = {
  entry: './monitor/index',
  output: {
    path: path.resolve('./static'),
    filename: 'p.js'
  }
}
