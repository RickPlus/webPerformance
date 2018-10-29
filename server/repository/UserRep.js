import mysql from '../utils/mysql'
import Sequelize from 'sequelize'
import { TryCatch } from '../utils/decorator'

const User = require('../models/user')(mysql, Sequelize)

export default class UserRep {
  @TryCatch
  static async findById (id) {
    return await User.findOne({
      where: { id: id },
      attributes: [`created`]
    })
  }

  @TryCatch
  static async findAll () {
    return await User.findAll()
  }
}
