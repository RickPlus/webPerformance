import { Controller, Method, Request } from '@/utils/server/decorator'
import UrlRep from '@repository/UrlRep'
import UrlResourceRep from '@repository/UrlResourceRep'
import Param from '@/utils/server/esum/Param'

@Controller({ prefix: '/open' })
class MonitorController {
  @Request({ url: '/monitor', method: Method.POST })
  async hello (ctx) {
    if (ctx.request.header.origin) {
      ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
    }
    let objectKeyMap = (obj) => {
      let o = {}
      for (let key in obj) {
        o[Param[key]] = obj[key]
      }
      return o
    }
    let { a, ai, pt, rl } = ctx.request.body
    let urlItem = await UrlRep(`url_${a.slice(0, 8)}`).createOne(objectKeyMap({ ...ai, ...pt }))
    let resourceArr = []
    rl.forEach((o) => {
      resourceArr.push(Object.assign(objectKeyMap(o), { url_id: urlItem.id }))
    })
    await UrlResourceRep(`url_resource_${a.slice(0, 8)}`).bulkCreate(resourceArr)
    ctx.state.data = 'success'
  }
}

export default MonitorController
