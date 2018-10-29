import { Controller, Method, Request } from '../utils/decorator'

@Controller({ prefix: '/api' })
export default class IndexController {
  @Request({ url: '/inward', method: Method.GET })
  async hello (ctx) {
    ctx.state.data = 'get success'
  }
}
