import { Controller, Method, Request } from '@/utils/server/decorator'

@Controller({ prefix: '/api/index' })
class IndexController {
  @Request({ url: '/inward', method: Method.GET })
  async hello (ctx) {
    ctx.state.data = 'get success'
  }
}

export default IndexController
