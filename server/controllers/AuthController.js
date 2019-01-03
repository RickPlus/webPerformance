import { Base64 } from 'js-base64'
import { Controller, Method, Request } from '@/utils/server/decorator'
import JWT from '@/utils/server/jwt'
import Message from '@/utils/server/esum/Message'
import UserRep from '@repository/UserRep'

@Controller({ prefix: '/open' })
class AuthController {
  @Request({ url: '/login', method: Method.POST })
  async hello (ctx) {
    let userInfo = ctx.request.body
    let user = await UserRep.findByName(userInfo.name, ['password'])
    if (user && user.password === Base64.encode(Base64.encode(userInfo.password))) {
      ctx.state.data = JWT.sign(userInfo)
    } else {
      ctx.body = Message.LoginFail
    }
  }
}

export default AuthController
