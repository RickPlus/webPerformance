import { Controller, Method, Request } from '@/utils/server/decorator'
import ErrorRep from '@/server/repository/ErrorRep'

@Controller({ prefix: '/api/url_error' })
class UrlErrorController {
  @Request({ url: '/', method: Method.GET })
  async getUrlError (ctx) {
    let { page = 1, perPage = 20 } = ctx.query
    let condition = {
      limit: +perPage,
      offset: +perPage * (+page - 1),
      order: [
        ['visit_time', 'DESC']
      ]
    }
    ctx.state.data = await ErrorRep(`error_${ctx.$appId.slice(0, 8)}`).findByPagination(condition)
  }
}

export default UrlErrorController
