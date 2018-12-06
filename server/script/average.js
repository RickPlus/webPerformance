/**
  ~定时设置脚本
  ~计算url各平均值及访问数
  ~计算url对应url_resource平均值
 */

/**
 步骤：sql 计算平均值，写入新表，分时间段类型date_type（参考Time esum）
 */
import Sequelize from 'sequelize'
import Moment from 'moment'
import consola from 'consola'
import mysql from '@/utils/server/mysql'
import AppIdRep from '@repository/AppIdRep'
import UrlAverageRep from '@repository/UrlAverageRep'
import Time from '@/utils/server/esum/Time'
import String from '@/utils/client/string'

const queryObj = { type: Sequelize.QueryTypes.SELECT }
const format = 'YYYY-MM-DD HH:mm:ss'
let timeSql = `
  SELECT url,
  count(url) as count,
  round(avg(white_time), 2) as white_time,
  round(avg(load_time), 2) as load_time,
  round(avg(dns_time), 2) as dns_time,
  round(avg(tcp_time), 2) as tcp_time,
  round(avg(dom_time), 2) as dom_time,
  round(avg(redirect_time), 2) as redirect_time,
  round(avg(resource_time), 2) as resource_time,
  round(avg(dom_ready_time), 2) as dom_ready_time
  from {tableName} where visit_time 
  between '{before}' and '{now}' GROUP BY url
`

const Average = {
  start: async function () {
    consola.info('~~~~~~ average schedule start ~~~~~~')
    this.now = Moment().format(format)
    await this.eachAppIds('start')
  },
  delete: async function () {
    consola.info('~~~~~~ average schedule delete start ~~~~~~')
    await this.eachAppIds('delete')
  },
  findAppId: async function () {
    return await AppIdRep.findAll()
  },
  eachAppIds: async function (type = 'start') {
    let ids = await this.findAppId()
    ids.length && ids.forEach(async (o) => {
      if (type === 'start') {
        await this.getTimeAverage(o.id.slice(0, 8))
        await this.setStatus(o.id.slice(0, 8))
      } else {
        await this.deleteIds(o.id.slice(0, 8))
      }
    })
  },
  getBeforeTime: function (num, type) {
    return Moment().subtract(num, type).format(format)
  },
  getTimeAverage: async function (id) {
    for (let key in Time) {
      const current = Moment().format(format)
      let sql = String.sub(timeSql, { tableName: `url_${id}`, before: this.getBeforeTime(Time[key].num, Time[key].type), now: current })
      let timeAvgList = await mysql.query(sql, queryObj)
      timeAvgList.length && timeAvgList.map((o) => {
        o.date_type = key
        o.created_at = this.now
      })
      timeAvgList.length && await UrlAverageRep(`url_average_${id}`).bulkCreate(timeAvgList)
    }
  },
  setStatus: async function (id) {
    let tableName = `url_average_${id}`
    let list = await UrlAverageRep(tableName).findBeforeTime(this.now)
    let arr = this.getIds(list)
    arr.length && await UrlAverageRep(tableName).updateStatusInIds(0, arr)
    consola.info('~~~~~~ average schedule end ~~~~~~')
  },
  deleteIds: async function (id) {
    let tableName = `url_average_${id}`
    let list = await UrlAverageRep(tableName).findByStatus(0)
    let arr = this.getIds(list)
    list.length && await UrlAverageRep(tableName).deleteAll(arr)
    consola.info('~~~~~~ average schedule delete end ~~~~~~')
  },
  getIds: function (list) {
    let arr = []
    list.length && list.forEach((o) => {
      arr.push(o.id)
    })
    return arr
  }
}
module.exports = Average
