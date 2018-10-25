const dir = 'controllers'
const fs = require('fs')

// add url-route in /controllers:

const readDir = app => {
  fs.readdirSync(`${__dirname}/${dir}`)
    .filter(f => {
      return f.endsWith('.js')
    })
    .forEach(f => {
      console.log(`process controller: ${f}...`)
      let routerController = require(`${__dirname}/${dir}/${f}`).default || require(`${__dirname}/${dir}/${f}`)
      // console.log(routerController)
      app.use(routerController.routes())
    })
}

module.exports = app => {
  readDir(app)
}
