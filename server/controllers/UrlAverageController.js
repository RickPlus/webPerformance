import { Controller, Method, Request } from '@/utils/server/decorator'
import UrlAverageRep from '@repository/UrlAverageRep'

@Controller({ prefix: '/api/url_average' })
export default class UrlAverageController {
  @Request({ url: '/', method: Method.GET })
  async getUrlAverage (ctx) {
    let { appId, page = 1, perPage = 20, type = 11 } = ctx.query
    let condition = {
      limit: +perPage,
      offset: +perPage * (+page - 1),
      where: {
        status: 1,
        date_type: +type
      }
    }
    ctx.state.data = await UrlAverageRep(`url_average_${appId.slice(0, 8)}`).findByPagination(condition)
  }

  @Request({ url: '/:id', method: Method.GET })
  async getUrlAverageDetail (ctx) {
    let { id } = ctx.params
    let { appId } = ctx.query
    ctx.state.data = await UrlAverageRep(`url_average_${appId.slice(0, 8)}`).findById(id)
  }
}
