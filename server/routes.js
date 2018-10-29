const dir = 'controllers'
const fs = require('fs')
const consola = require('consola')

// add url-route in /controllers:

const readDir = app => {
  fs.readdirSync(`${__dirname}/${dir}`)
    .filter(f => {
      return f.endsWith('.js')
    })
    .forEach(f => {
      consola.ready({
        message: `Init controller: ${f}...`
      })
      let controller = require(`${__dirname}/${dir}/${f}`)
      app.use((controller.default || controller).routes())
    })
}

module.exports = app => {
  readDir(app)
}
