import { Controller, Method, Request } from '@/utils/server/decorator'
import UrlResourceRep from '@repository/UrlResourceRep'
// import DateTime from '@/utils/server/time'

@Controller({ prefix: '/api/url_resource' })
class UrlResourceController {
  @Request({ url: '/:id', method: Method.GET })
  async getUrlResource (ctx) {
    let { id } = ctx.params
    ctx.state.data = await UrlResourceRep(`url_resource_${ctx.$appId.slice(0, 8)}`).findListByUrlId(id)
  }
}

export default UrlResourceController
