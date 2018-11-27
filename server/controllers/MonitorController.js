import { Controller, Method, Request } from '../../utils/server/decorator'

@Controller({ prefix: '/open' })
export default class MonitorController {
  @Request({ url: '/monitor', method: Method.POST })
  async hello (ctx) {
    if (ctx.request.header.origin) {
      ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
    }
    ctx.state.data = 'success'
  }
}
