import { Controller, Method, Request } from '@/utils/server/decorator'
import UserRep from '@repository/UserRep'

@Controller({ prefix: '/api/user' })
export default class UserController {
  @Request({ url: '/current', method: Method.POST })
  async detail (ctx) {
    ctx.state.data = ctx.$currentUser
  }

  @Request({ url: '/:id', method: Method.PUT })
  async modify (ctx) {
    let { id } = ctx.params
    ctx.state.data = await UserRep.updateById(id, ctx.request.body)
  }
}
