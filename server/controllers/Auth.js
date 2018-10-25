const JWT = require('../utils/jwt')

class Auth {
  static async login(ctx, next) {
    let userInfo = ctx.request.body
    let token = JWT.sign(userInfo)
    ctx.state.data = {
      token: token
    }
  }
}

module.exports = {
  'login-post': {
    path: '/open/login',
    method: 'POST',
    fn: Auth.login
  }
}
