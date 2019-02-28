import { Controller, Method, Request } from '@/utils/server/decorator'
import UrlRep from '@/server/repository/UrlRep'
import ErrorRep from '@/server/repository/ErrorRep'
import AjaxRep from '@/server/repository/AjaxRep'

@Controller({ prefix: '/api/search' })
class IndexController {
  @Request({ url: '/:type', method: Method.GET })
  async searchPage (ctx) {
    let res
    let { type } = ctx.params
    let { url, perPage, page } = ctx.query
    let condition = {
      limit: +perPage,
      offset: +perPage * (+page - 1),
      where: {
        url: url
      },
      order: [ ['visit_time', 'DESC'] ]
    }
    if (type === 'url') {
      res = await UrlRep(`url_${ctx.$appId.slice(0, 8)}`).findByPagination(condition)
    } else if (type === 'error') {
      res = await ErrorRep(`error_${ctx.$appId.slice(0, 8)}`).findByPagination(condition)
    } else if (type === 'ajax') {
      res = await AjaxRep(`ajax_${ctx.$appId.slice(0, 8)}`).findByPagination(condition)
    }
    ctx.state.data = res
  }
}

export default IndexController
