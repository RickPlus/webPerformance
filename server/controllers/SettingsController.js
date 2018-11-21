import { Controller, Method, Request } from '../../utils/server/decorator'
import AppIdRep from '../repository/AppIdRep'
import UUID from 'uuid/v1'

@Controller({ prefix: '/api/settings' })
export default class SettingsController {
  @Request({ url: '/appId', method: Method.GET })
  async appId (ctx) {
    ctx.state.data = await AppIdRep.findAllByUserId(ctx.$currentUser.id)
  }

  @Request({ url: '/appId', method: Method.POST })
  async postAppId (ctx) {
    let result = await AppIdRep.createOne({
      id: UUID(),
      desc: ctx.request.body.desc,
      user_id: ctx.$currentUser.id
    })
    ctx.state.data = result
  }

  @Request({ url: '/appId/:id', method: Method.PUT })
  async modifyAppId (ctx) {
    let { id } = ctx.params
    ctx.state.data = await AppIdRep.updateById(id, ctx.request.body)
  }
}
