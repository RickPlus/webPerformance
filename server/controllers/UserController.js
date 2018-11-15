import { Controller, Method, Request } from '../../utils/server/decorator'
import JWT from '../../utils/server/jwt'
import UserRep from '../repository/UserRep'

@Controller({ prefix: '/api/user' })
export default class UserController {
  @Request({ url: '/current', method: Method.GET })
  async detail (ctx) {
    const token = ctx.header.authorization
    let payload = await JWT.verify(token)
    let user = await UserRep.findByName(payload.name)
    ctx.state.data = user
  }
}
