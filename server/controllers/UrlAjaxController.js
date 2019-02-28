import { Controller, Method, Request } from '@/utils/server/decorator'
import AjaxRep from '@/server/repository/AjaxRep'

@Controller({ prefix: '/api/url_ajax' })
class UrlAjaxController {
  @Request({ url: '/', method: Method.GET })
  async getUrlAverage (ctx) {
    let { page = 1, perPage = 20 } = ctx.query
    let condition = {
      limit: +perPage,
      offset: +perPage * (+page - 1),
      order: [
        ['visit_time', 'DESC']
      ]
    }
    ctx.state.data = await AjaxRep(`ajax_${ctx.$appId.slice(0, 8)}`).findByPagination(condition)
  }
}

export default UrlAjaxController
