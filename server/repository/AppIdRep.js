import { TryCatch } from '@/utils/server/decorator'
import AppId from '@models/AppId'

// User.tableName = 'user_copy'
// User.sync()

export default class AppIdRep {
  @TryCatch
  static async findById (id) {
    return await AppId.findOne({
      where: { id: id }
    })
  }

  @TryCatch
  static async findAllByUserId (id) {
    return await AppId.findAll({
      where: { user_id: id }
    })
  }

  @TryCatch
  static async createOne (obj) {
    return await AppId.create(obj)
  }

  @TryCatch
  static async updateById (id, obj) {
    return await AppId.update(obj, {
      where: { id: id }
    })
  }
}
