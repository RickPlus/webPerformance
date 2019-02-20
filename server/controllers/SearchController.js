import { Controller, Method, Request } from '@/utils/server/decorator'
import UrlRep from '@/server/repository/UrlRep'

@Controller({ prefix: '/api/search' })
class IndexController {
  @Request({ url: '/:type', method: Method.GET })
  async searchPage (ctx) {
    let { type } = ctx.params
    let { url, perPage, page } = ctx.query
    let condition = {
      limit: +perPage,
      offset: +perPage * (+page - 1),
      where: {
        url: url
      }
    }
    if (type === 'url') {
      condition.order = [ ['visit_time', 'DESC'] ]
    }
    ctx.state.data = await UrlRep(`url_${ctx.$appId.slice(0, 8)}`).findByPagination(condition)
  }
}

export default IndexController
