import { Controller, Method, Request } from '@/utils/server/decorator'
import AppIdRep from '@repository/AppIdRep'
import UserRep from '@repository/UserRep'
import UUID from 'uuid/v1'

@Controller({ prefix: '/api/settings' })
class SettingsController {
  @Request({ url: '/appId', method: Method.GET })
  async appId (ctx) {
    let currentUser = ctx.$currentUser
    let list = await AppIdRep.findAllByUserId(currentUser.id)
    list.map((o) => {
      o.setDataValue('is_default', o.id === currentUser.default_app_id)
    })
    ctx.state.data = list
  }

  @Request({ url: '/appId', method: Method.POST })
  async postAppId (ctx) {
    let currentUser = ctx.$currentUser
    let uuid = UUID()
    let result = await AppIdRep.createOne({
      id: uuid,
      desc: ctx.request.body.desc,
      user_id: currentUser.id
    })
    if (!currentUser.default_app_id) {
      await UserRep.updateById(currentUser.id, {
        default_app_id: uuid
      })
    }
    ctx.state.data = result
  }

  @Request({ url: '/appId/:id', method: Method.PUT })
  async modifyAppId (ctx) {
    let { id } = ctx.params
    ctx.state.data = await AppIdRep.updateById(id, ctx.request.body)
  }
}

export default SettingsController
