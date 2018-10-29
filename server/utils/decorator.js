import KoaRouter from 'koa-router'
import consola from 'consola'

export const Controller = (opt) => {
  let router = new KoaRouter()
  if (opt && opt.prefix) {
    router.prefix(opt.prefix)
  }

  return target => {
    let proper = Object.getOwnPropertyDescriptors(target.prototype)
    for (let i in proper) {
      i !== 'constructor' && proper[i].value(router)
    }
    return router
  }
}

export const Method = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'del'
}

export const Request = ({ url, method }) => {
  return (target, name, descriptor) => {
    let fn = descriptor.value
    descriptor.value = router => {
      router[method](url, async (ctx, next) => {
        await fn(ctx, next)
      })
    }
  }
}

export const TryCatch = (target, name, descriptor) => {
  let fn = descriptor.value
  descriptor.value = async function (...args) {
    try {
      return await fn.call(this, ...args)
    } catch (e) {
      consola.error(e)
      return new Error(e)
    }
  }
}
