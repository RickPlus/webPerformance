const apiDir = 'controllers'
const prefix = '/api'
const fs = require('fs')
const router = require('koa-router')({ prefix: prefix })

// add url-route in /controllers:

const addMapping = mapping => {
  for (let url in mapping) {
    // url.replace(reg, ($0, $1, $2) => {
    //   router[$1.toLowerCase()]($2, mapping[$0])
    //   console.log(`register URL mapping: ${$1} ${prefix}${$2}`)
    // })
    let { fn, method, path } = mapping[url]
    router[method.toLowerCase()](path, fn)
    console.log(`register URL mapping: ${method} ${prefix}${path}`)
  }
}

const readDir = dir => {
  fs.readdirSync(`${__dirname}/${dir}`)
    .filter(f => {
      return f.endsWith('.js')
    })
    .forEach(f => {
      console.log(`process controller: ${f}...`)
      let mapping = require(`${__dirname}/${dir}/${f}`)
      addMapping(mapping)
    })
}

readDir(apiDir)

module.exports = () => router.routes()
