import { TryCatch } from '../utils/decorator'
import User from '../models/User'

// User.tableName = 'user_copy'

export default class UserRep {
  @TryCatch
  static async findById (id) {
    return await User.findOne({
      where: { id: id }
    })
  }

  @TryCatch
  static async findAll () {
    return await User.findAll()
  }
}
