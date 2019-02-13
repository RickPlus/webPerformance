import { Controller, Method, Request } from '@/utils/server/decorator'
import UrlAverageRep from '@repository/UrlAverageRep'
import DateTime from '@/utils/server/time'
import UrlRep from '@repository/UrlRep'

@Controller({ prefix: '/api/url_average' })
class UrlAverageController {
  @Request({ url: '/', method: Method.GET })
  async getUrlAverage (ctx) {
    let { page = 1, perPage = 20, type = 11 } = ctx.query
    let condition = {
      limit: +perPage,
      offset: +perPage * (+page - 1),
      where: {
        status: 1,
        date_type: +type
      }
    }
    console.log(ctx.$appId)
    ctx.state.data = await UrlAverageRep(`url_average_${ctx.$appId.slice(0, 8)}`).findByPagination(condition)
  }

  @Request({ url: '/:id', method: Method.GET })
  async getUrlAverageDetail (ctx) {
    let { id } = ctx.params
    ctx.state.data = await UrlAverageRep(`url_average_${ctx.$appId.slice(0, 8)}`).findById(id)
  }

  @Request({ url: '/:id/list', method: Method.GET })
  async getUrlAverageDetailList (ctx) {
    let { id } = ctx.params
    let { type } = ctx.query
    let averageItem = await UrlAverageRep(`url_average_${ctx.$appId.slice(0, 8)}`).findById(id)
    ctx.state.data = await UrlRep(`url_${ctx.$appId.slice(0, 8)}`).findAfterTimeByUrl(DateTime.transferTypeToTime(type), averageItem.url)
  }
}

export default UrlAverageController
