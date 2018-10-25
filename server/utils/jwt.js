const jwt = require('jsonwebtoken')
const { secretName } = require('../config')

module.exports = {
  sign: sign => {
    return jwt.sign(sign, secretName, { expiresIn: '7d' })
    // return jwt.sign(sign, secretName, { expiresIn: '60' }) // 默认单位ms
  },
  verify: async token => {
    return await jwt.verify(token.split(' ')[1], secretName)
  }
}
