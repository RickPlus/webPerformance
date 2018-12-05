/*
* Url sdk 表名专用Rep 表结构和Model Url 一样
* */

import { TryCatch } from '@/utils/server/decorator'
import UrlAverage from '@models/UrlAverage'

class UrlAverageRep {
  constructor (tableName) {
    this.Model = UrlAverage
    if (tableName) {
      this.Model.tableName = tableName
      this.create()
    }
  }
  create () {
    this.Model.sync()
  }
  @TryCatch
  async findById (id) {
    return await this.Model.findOne({
      where: { id: id }
    })
  }

  @TryCatch
  async findAll () {
    return await this.Model.findAll()
  }

  @TryCatch
  async findBeforeTime (time) {
    return await this.Model.findAll({
      where: {
        created_at: {
          $lt: time
        },
        status: 1
      }
    })
  }

  @TryCatch
  async createOne (obj) {
    return await this.Model.create(obj)
  }

  @TryCatch
  async bulkCreate (arr) {
    return await this.Model.bulkCreate(arr)
  }

  @TryCatch
  async updateStatusInIds (status, ids) {
    return await this.Model.update({ status: status }, {
      where: {
        id: {
          $in: ids
        }
      }
    })
  }
}

export default (tableName) => {
  return new UrlAverageRep(tableName)
}
