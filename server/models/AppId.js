import mysql from '@utils/server/mysql'
import Sequelize from 'sequelize'

const AppId = mysql.define('app_id', {
  id: {
    type: Sequelize.STRING(40),
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  desc: {
    type: Sequelize.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'app_id'
})
AppId.sync()

export default AppId
