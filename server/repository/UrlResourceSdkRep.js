/*
* UrlResource sdk 表名专用Rep 表结构和Model UrlResource 一样
* */

import { TryCatch } from '../../utils/server/decorator'
import UrlResource from '../models/UrlResource'

class UrlResourceSdkRep {
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
  async findAll () {
    return await this.Model.findAll()
  }
}

export default (tableName) => {
  return new UrlResourceSdkRep(tableName)
}
