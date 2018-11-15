import { TryCatch } from '../../utils/server/decorator'
import User from '../models/User'

// User.tableName = 'user_copy'
// User.sync()

export default class UserRep {
  @TryCatch
  static async findById (id) {
    return await User.findOne({
      where: { id: id }
    })
  }

  @TryCatch
  static async findByName (name, field = ['id', 'name']) {
    return await User.findOne({
      attributes: field,
      where: { name: name }
    })
  }

  @TryCatch
  static async findAll () {
    return await User.findAll()
  }
}
