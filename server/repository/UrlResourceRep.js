/*
* UrlResource sdk 表名专用Rep 表结构和Model UrlResource 一样
* */

import { TryCatch } from '@/utils/server/decorator'
import UrlResource from '@models/UrlResource'

class UrlResourceRep {
  constructor (tableName) {
    this.Model = UrlResource
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
  async findListByUrlId (id) {
    return await this.Model.findAll({
      where: { url_id: id }
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
  return new UrlResourceRep(tableName)
}
