/*
* Url sdk 表名专用Rep 表结构和Model Url 一样
* */

import { TryCatch } from '../../utils/server/decorator'
import Url from '../models/Url'

class UrlSdkRep {
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
}

export default (tableName) => {
  return new UrlSdkRep(tableName)
}
