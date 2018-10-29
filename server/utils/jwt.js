const jwt = require('jsonwebtoken')
const { secretName } = require('../config')

export default {
  sign: sign => jwt.sign(sign, secretName, { expiresIn: '7d' }), // 默认单位ms
  verify: async token => {
    try {
      return await jwt.verify(token.split(' ')[1], secretName)
    } catch (e) {
      return null
    }
  }
}
