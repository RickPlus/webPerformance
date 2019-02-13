const fse = require('fs-extra')

if (fse.pathExistsSync('./settings.js')) {
  module.exports = { ...require('./settings.demo.js'), ...require('./settings.js') }
} else {
  fse.outputFileSync('./settings.js', `
/*
* 参考 settings.demo.js 本地化配置
* 本文件会覆盖掉 settings.demo.js, 如果为空则会默认读取settings.demo.js的配置
* 再三强调 请勿修改 settings.demo.js !!!
* 再三强调 请勿修改 settings.demo.js !!!
* 再三强调 请勿修改 settings.demo.js !!!
*/
module.exports = {}
`)
  module.exports = { ...require('./settings.demo.js') }
}
