import { Controller, Method, Request } from '../../utils/server/decorator'

@Controller({ prefix: '/open' })
export default class IndexController {
  @Request({ url: '/jsonp', method: Method.GET })
  async hello (ctx) {
    let cb = ctx.request.query.callback
    let testData = {
      a: 1,
      b: 2
    }
    ctx.type = 'text'
    ctx.body = `${cb}(${JSON.stringify(testData)})`
  }
}
