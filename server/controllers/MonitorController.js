import { Controller, Method, Request } from '@/utils/server/decorator'
import UrlRep from '@repository/UrlRep'
import AjaxRep from '@repository/AjaxRep'
import ErrorRep from '@repository/ErrorRep'
import UrlResourceRep from '@repository/UrlResourceRep'
import Param from '@/utils/server/esum/Param'

/*
*  t: p 页面
*     a ajax
*     e error
* */
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
    let { t } = ctx.request.body
    if (t === 'p') {
      let { a, ai, pt, rl } = ctx.request.body
      let urlItem = await UrlRep(`url_${a.slice(0, 8)}`).createOne(objectKeyMap({ ...ai, ...pt }))
      let resourceArr = []
      rl.forEach((o) => {
        resourceArr.push(Object.assign(objectKeyMap(o), { url_id: urlItem.id }))
      })
      resourceArr.length && await UrlResourceRep(`url_resource_${a.slice(0, 8)}`).bulkCreate(resourceArr)
    } else if (t === 'a') {
      let { a, ar, am, as, d, au, ap, u } = ctx.request.body
      await AjaxRep(`ajax_${a.slice(0, 8)}`).createOne(objectKeyMap({ ar, am, as, d, au, ap, u }))
    } else if (t === 'e') {
      let { a, el, ec, em, es, eu, u } = ctx.request.body
      await ErrorRep(`error_${a.slice(0, 8)}`).createOne(objectKeyMap({ el, ec, em, es, eu, u }))
    }
    ctx.state.data = 'success'
  }
}

export default MonitorController
