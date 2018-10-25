const base = require('./base')
const env = process.env.NODE_ENV || 'production'

const config = require(`./${env}.env.js`)

console.log(`当前环境：${env}`)

module.exports = { ...base, ...config }
