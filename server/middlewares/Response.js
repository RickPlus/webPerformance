import JWT from '../../utils/server/jwt'
import Message from '../../utils/server/esum/Message'

const result = (ctx) => {
  success(ctx)
  if (ctx.state.data && ctx.state.data.constructor === Error) {
    fail(ctx, ctx.state.data)
  } else {
    success(ctx)
  }
}

const success = ctx => {
  // 处理响应结果
  // 如果直接写入在 body 中，则不作处理
  // 如果写在 ctx.body 为空，则使用 state 作为响应
  ctx.body = ctx.body || Object.assign(
    Message.Success,
    { data: ctx.state.data !== undefined ? ctx.state.data : {} }
  )
}

const fail = (ctx, e) => {
  // 设置状态码为 200 - 服务端错误
  ctx.status = 200

  // 输出详细的错误信息
  ctx.body = Object.assign(
    Message.Error,
    {
      code: e.code || 0,
      data: null,
      message: e && e.message ? e.message : e.toString()
    }
  )
}

const unLogin = (ctx, obj = Message.NotLogin) => {
  fail(ctx, obj)
}

/**
 * 响应处理模块
 */
module.exports = async (ctx, next) => {
  let { url } = ctx.request
  // 调用下一个 middleware
  // ************************** /open 的接口不通过token验证  /api接口全部需要通过token验证
  if (url.includes('/api')) {
    // 用户验证
    const token = ctx.header.authorization // 格式：Bearer token
    if (!token) {
      unLogin(ctx)
    } else {
      try {
        let payload = await JWT.verify(token)
        if (payload) {
          await next()
          result(ctx)
        } else {
          unLogin(ctx)
        }
      } catch (e) {
        fail(
          ctx,
          e.message === 'jwt expired'
            ? Message.Expired
            : e
        )
      }
    }
  } else {
    await next()
    result(ctx)
  }
}
