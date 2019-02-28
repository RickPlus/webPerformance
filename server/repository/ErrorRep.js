/*
* Error sdk 表名专用Rep 表结构和Model Error 一样
* */

import { TryCatch } from '@/utils/server/decorator'
import Error from '@models/Error'

class AjaxRep {
  constructor (tableName) {
    this.Model = Error
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
  async findByPagination (condition) {
    return await this.Model.findAndCountAll(condition)
  }

  @TryCatch
  async createOne (obj) {
    return await this.Model.create(obj)
  }

  @TryCatch
  async bulkCreate (arr) {
    return await this.Model.bulkCreate(arr)
  }
}

export default (tableName) => {
  return new AjaxRep(tableName)
}
