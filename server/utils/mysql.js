import Sequelize from 'sequelize'
import { mysql } from '../config'

export default new Sequelize(
  mysql.database,
  mysql.user,
  mysql.password,
  mysql.option
)
