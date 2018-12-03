/*
* Url sdk 表名专用Rep 表结构和Model Url 一样
* */

import { TryCatch } from '@utils/server/decorator'
import Url from '@models/Url'

class UrlRep {
  constructor (tableName) {
    this.Model = Url
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
  async createOne (obj) {
    return await this.Model.create(obj)
  }

  @TryCatch
  async bulkCreate (arr) {
    return await this.Model.bulkCreate(arr)
  }
}

export default (tableName) => {
  return new UrlRep(tableName)
}
