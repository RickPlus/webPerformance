import { Controller, Method, Request } from '../utils/decorator'
import JWT from '../utils/jwt'

@Controller({ prefix: '/open' })
class AuthController {
  @Request({ url: '/login', method: Method.POST })
  async hello (ctx) {
    let userInfo = ctx.request.body
    let token = JWT.sign(userInfo)
    ctx.state.data = {
      token: token
    }
  }
}

export default AuthController
