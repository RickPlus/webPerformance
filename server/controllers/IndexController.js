import { Controller, Method, Request } from '../utils/decorator'

@Controller({ prefix: '/api' })
class IndexController {
  @Request({ url: '/', method: Method.GET })
  async hello (ctx) {
    ctx.state.data = 'get success'
  }
}

export default IndexController
