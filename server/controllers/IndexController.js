import { Controller, Method, Request } from '../../utils/server/decorator'

@Controller({ prefix: '/api/index' })
export default class IndexController {
  @Request({ url: '/inward', method: Method.GET })
  async hello (ctx) {
    ctx.state.data = 'get success'
  }
}
