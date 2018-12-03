require('babel-polyfill')
require('babel-register')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const routes = require('./routes')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const path = require('path')
const moduleAlias = require('module-alias')

moduleAlias.addAliases({
  '@server': path.join(__dirname, '.'),
  '@models': path.join(__dirname, 'models'),
  '@controllers': path.join(__dirname, 'controllers'),
  '@config': path.join(__dirname, 'config'),
  '@repository': path.join(__dirname, 'repository'),
  '@/utils': path.join(__dirname, '../utils')
})

const Response = require('./middlewares/Response')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

app.use(bodyParser())
app.use(Response)
routes(app)

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
