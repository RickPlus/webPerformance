import { Controller, Method, Request } from '../utils/decorator'
import JWT from '../utils/jwt'
import UserRep from '../repository/UserRep'

@Controller({ prefix: '/open' })
export default class AuthController {
  @Request({ url: '/login', method: Method.POST })
  async hello (ctx) {
    let userInfo = ctx.request.body
    let token = JWT.sign(userInfo)
    ctx.state.data = token
  }

  @Request({ url: '/list', method: Method.GET })
  async list (ctx) {
    ctx.state.data = await UserRep.findAll()
  }

  @Request({ url: '/:id', method: Method.GET })
  async detail (ctx) {
    ctx.state.data = await UserRep.findById(ctx.params.id)
  }
}
