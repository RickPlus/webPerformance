import { Controller, Method, Request } from '../../utils/server/decorator'

@Controller({ prefix: '/api/user' })
export default class UserController {
  @Request({ url: '/current', method: Method.POST })
  async detail (ctx) {
    ctx.state.data = ctx.$currentUser
  }
}
